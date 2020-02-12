import React from "react";
import {
    ImageStyle,
    Keyboard,
    KeyboardAvoidingView,
    Text,
    TextStyle,
    TouchableOpacity,
    ViewStyle
} from "react-native";
import {styleSheetCreate} from "../../common/utils";
import {Colors, CommonStyles, isIos, windowHeight, windowWidth} from "../../core/theme";
import {NoHeader} from "../../common/components/Headers";
import {localization} from "../../common/localization/localization";
import {MainButton} from "../../common/components/MainButton";
import {ButtonType} from "../../common/enums/buttonType";
import {BaseReduxComponent} from "../../core/BaseComponent";
import {connectAdv} from "../../core/store";
import {IAppState} from "../../core/store/appState";
import {Dispatch} from "redux";
import {AuthAsyncActions} from "./authAsyncActions";
import {AuthTextInput} from "../../common/components/AuthTextInput";
import {ImageResources} from "../../common/ImageResources.g";
import {appSettingsProvider} from "../../core/settings";
import {NavigationActions} from "../../navigation/navigation";
import Animated, {Easing} from "react-native-reanimated";

const {
    Value,
    block,
    cond,
    set,
    Clock,
    startClock,
    stopClock,
    debug,
    timing,
    clockRunning,
    interpolate,
    Extrapolate,
    concat,
    createAnimatedComponent,
    or,
} = Animated;

interface IStateProps {
    isAuthorizing: boolean;
    error: string ;
}

interface IDispatchProps {
    login: (login: string, password: string) => void;
    navigateToRegPage: () => void;
}

 interface IState {
     isActive: boolean;
     buttonOpacity: any;
 }
 const AnimatedTouch = createAnimatedComponent(TouchableOpacity);

@connectAdv(
    ({auth}: IAppState): IStateProps => ({
        isAuthorizing: auth.isAuthorizing,
        error: auth.error || ""
    }),
    (dispatch: Dispatch): IDispatchProps => ({
        login: (login: string, password: string): void => {
            dispatch(AuthAsyncActions.login(login, password));
        },
        navigateToRegPage: (): void => {
          dispatch(NavigationActions.navigateToRegPage());
        },
    }),
)
export class AuthPage extends BaseReduxComponent<IStateProps, IDispatchProps, IState> {
    static navigationOptions = NoHeader();
    private login: string = "";
    private password: string = "";
    private buttonY: any;
    private formOpacity: any;
    private bgY: any;
    private rotateCross: any;
    private flagName: any;

    constructor(props: IEmpty) {
        super(props);
        this.state = {isActive: false, buttonOpacity: new Value(1)};

        this.buttonY = new Value(0);
        this.formOpacity = new Value(0);
        this.bgY = new Value(0);
        this.rotateCross = new Value(180);
        this.flagName = new Value(0);
    }

    render(): JSX.Element {
        const isAuthorizing = this.stateProps.isAuthorizing;
        const isDisabled = isAuthorizing || !this.state.isActive;

        return(
            <TouchableOpacity style={CommonStyles.flex1} onPress={Keyboard.dismiss} activeOpacity={1}>
                <KeyboardAvoidingView
                    style={styles.container}
                    behavior={"padding"}
                    keyboardVerticalOffset={isIos ? 60 : 95}
                >
                    <Animated.Image style={{...styles.background, transform: [{translateY: this.bgY}]}} source={ImageResources.logo}/>
                    <Animated.View style={{...styles.form, opacity: this.formOpacity}}>
                        <AnimatedTouch onPress={this.onClosePress} style={styles.closeButton}>
                            <Animated.Text style={{fontSize: 14, transform: [{rotate: concat(this.rotateCross, "deg") }]}}>
                                X
                            </Animated.Text>
                        </AnimatedTouch>
                        <AuthTextInput
                            containerStyle={styles.input}
                            label={localization.auth.email}
                            onChangeText={this.onLoginTextChange}
                            keyboardType={"email-address"}
                            editable={this.state.isActive}
                        />
                        <AuthTextInput
                            label={localization.auth.password}
                            containerStyle={{...styles.input, bottom: 20}}
                            secureTextEntry={true}
                            onChangeText={this.onPasswordTextChange}
                            enablesReturnKeyAutomatically={true}
                            editable={this.state.isActive}
                        />
                        <MainButton
                            buttonType={isDisabled ? ButtonType.disabled : ButtonType.positive}
                            disabled={isDisabled}
                            title={localization.auth.signIn}
                            onPress={this.onLoginPress}
                        />
                    </Animated.View>
                    <AnimatedTouch
                        onPress={this.onAnimatedPress}
                        style={
                            {
                                ...styles.button,
                                backgroundColor: Colors.browny,
                                opacity: this.state.buttonOpacity,
                                transform: [{ translateY: this.buttonY }]
                            }
                        }
                        disabled={this.state.isActive}
                    >
                            <Text style={styles.signText}>{localization.auth.signIn}</Text>
                    </AnimatedTouch>
                    <Animated.View
                        style={
                            {
                                ...styles.regContainer,
                                opacity: this.state.buttonOpacity,
                                transform: [{ translateY: this.buttonY }]
                            }
                        }
                    >
                        <TouchableOpacity onPress={this.onRegPress}>
                            <Text style={styles.regText}>{localization.auth.registation}</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </KeyboardAvoidingView>
            </TouchableOpacity>
        );
    }

    private onLoginPress = (): void => {
        if (appSettingsProvider.settings.environment == "Development") {
            this.login = "string";
            this.password = "string";
        }
        this.dispatchProps.login(this.login, this.password);
    };

    private onLoginTextChange = (login: string): void => {
        this.login = login;
    };

    private onPasswordTextChange = (password: string): void => {
        this.password = password;
    };

    private onRegPress = (): void => {
       this.dispatchProps.navigateToRegPage();
    };

    private onAnimatedPress = (): void => {
        const newAnim = this.runTiming(new Clock(), 1, 0);
        this.animationConfig(newAnim);
        this.setState({isActive: true, buttonOpacity: newAnim}, () => this.flagName.setValue(0));
    };

    private onClosePress = (): void => {
            const newAnim = this.runTiming(new Clock(), 0, 1);
            this.animationConfig(newAnim);
            this.setState({isActive: false, buttonOpacity: newAnim}, () => this.flagName.setValue(0));
    };

    private runTiming = (clock: any, value: any, dest: any): any => {
        const state = {
            finished: new Value(0),
            position: new Value(0),
            time: new Value(0),
            frameTime: new Value(0)
        };

        const config = {
            duration: 1000,
            toValue: new Value(0),
            easing: Easing.inOut(Easing.ease)
        };

        return block([
            cond(or(clockRunning(clock), this.flagName), 0, [
                set(this.flagName, 1),
                set(state.finished, 0),
                set(state.time, 0),
                set(state.position, value),
                set(state.frameTime, 0),
                set(config.toValue, dest),
                startClock(clock)
            ]),
            timing(clock, state, config),
            cond(state.finished, debug("stop clock", stopClock(clock))),
            state.position
        ]);
    };
    private animationConfig = (newAnim: any): void => {
        this.buttonY = interpolate(newAnim, {
            inputRange: [0, 1],
            outputRange: [100, 0],
            extrapolate: Extrapolate.CLAMP
        });

        this.bgY = interpolate(newAnim, {
            inputRange: [0, 1],
            outputRange: [-windowHeight / 4, 0],
            extrapolate: Extrapolate.CLAMP
        });

        this.formOpacity = interpolate(newAnim, {
            inputRange: [0, 1],
            outputRange: [1, 0],
            extrapolate: Extrapolate.CLAMP
        });

        this.rotateCross = interpolate(newAnim, {
            inputRange: [0, 1],
            outputRange: [180, 360],
            extrapolate: Extrapolate.CLAMP
        });
    }
}

const styles = styleSheetCreate({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    } as ViewStyle,
    form: {
        paddingRight: 70,
        paddingLeft: 70,
        marginVertical: 240,
        opacity: 0,
    } as ViewStyle,
    background: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        marginTop: windowHeight / 2 - 100,
        marginHorizontal: 75,
    } as ImageStyle,
    input: {
         marginTop: 30,
    }as ViewStyle,
    regContainer: {
        alignSelf: "center",
        bottom: 40,
    } as ViewStyle,
    regText: {
        color: Colors.browny,
        fontSize: 16,
        textDecorationLine: "underline",
    } as TextStyle,
    signText: {
        color: Colors.black,
        fontSize: 20,
    } as TextStyle,
    button: {
        backgroundColor: "white",
        height: 70,
        borderRadius: 35,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 5,
        width: 200,
        alignSelf: "center",
        position: "absolute",
        bottom: 250,
    } as ViewStyle,
    closeButton: {
        height: 20,
        width: 20,
        backgroundColor: Colors.warmGreyTwo,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: -10,
        left: windowWidth / 2 + 120,
    }as ViewStyle
});