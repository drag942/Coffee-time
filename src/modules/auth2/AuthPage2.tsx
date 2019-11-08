import React from "react";
import {ImageBackground, Keyboard, KeyboardAvoidingView, TouchableOpacity, View, ViewStyle} from "react-native";
import {styleSheetCreate} from "../../common/utils";
import { isIos} from "../../core/theme";
import { PlainHeader} from "../../common/components/Headers";
import {localization} from "../../common/localization/localization";
import {MainButton} from "../../common/components/MainButton";
import {ButtonType} from "../../common/enums/buttonType";
import {BaseReduxComponent} from "../../core/BaseComponent";
import {connectAdv} from "../../core/store";
import {IAppState} from "../../core/store/appState";
import {Dispatch} from "redux";
import {Auth2AsyncActions} from "./auth2AsyncActions";
import {AuthTextInput} from "../../common/components/AuthTextInput";
import {ImageResources} from "../../common/ImageResources.g";

interface IStateProps {
    isAuthorizing: boolean;
    error: string ;
}

interface IDispatchProps {
    login: (login: string, password: string) => void;
}

interface IState {
    login: string;
    password: string;
}

@connectAdv(
    ({auth2}: IAppState): IStateProps => ({
        isAuthorizing: auth2.isAuthorizing,
        error: auth2.error || ""
    }),
    (dispatch: Dispatch): IDispatchProps => ({
        login: (login: string, password: string): void => {
            dispatch(Auth2AsyncActions.login(login, password));
        },
    }),
)

export class AuthPage2 extends BaseReduxComponent<IStateProps, IDispatchProps, IState> {
    static navigationOptions = PlainHeader(localization.auth.signInSplash);
    constructor(props: IEmpty) {
        super(props);
        this.state = {login: "", password: ""};
    }
    render(): JSX.Element {
        const {login, password} = this.state;
        const isAuthorizing = this.stateProps.isAuthorizing;
        const isDisabled = login == "" || password == "" || isAuthorizing;

        return (
            <ImageBackground style={styles.imgBackground} source={ImageResources.imagebackground}>
            <TouchableOpacity  style={styles.container2} onPress={Keyboard.dismiss} activeOpacity={1}>
                <KeyboardAvoidingView
                    style={styles.container}
                    behavior={"padding"}
                    keyboardVerticalOffset={isIos ? 60 : 75}
                >
                    <View style={styles.innerContainer}>
                        <AuthTextInput
                            containerStyle={styles.input}
                            label={localization.auth.email}
                            onChangeText={this.onLoginTextChange}
                        />
                        <AuthTextInput
                            label={localization.auth.password}
                            containerStyle={styles.input}
                            secureTextEntry={true}
                            onChangeText={this.onPasswordTextChange}
                        />
                    </View>
                    <MainButton
                        buttonType={isDisabled ? ButtonType.disabled : ButtonType.positive}
                        disabled={isDisabled}
                        title={localization.auth.signIn}
                        onPress={this.onLoginPress}
                    />
                </KeyboardAvoidingView>
            </TouchableOpacity>
            </ImageBackground>
        );
    }

    private onLoginPress = (): void => {
       this.dispatchProps.login(this.state.login, this.state.password);
    }
    private onLoginTextChange = (login: string): void => {
        this.setState({login});
    }
    private onPasswordTextChange = (password: string): void => {
        this.setState({password});
    }
}

const styles = styleSheetCreate({
    container2: {
        flex: 1,
    } as ViewStyle,
    container: {
        flex: 1,
        justifyContent: "flex-end"
    }as ViewStyle,
    innerContainer: {
        flex: 1,
        justifyContent: "flex-start"
    } as ViewStyle,
    input: {
        marginHorizontal: 16,
        marginTop: 30,
    }as ViewStyle,
    imgBackground: {
        width: "100%",
        height: "100%",
        flex: 1
    } as ViewStyle
});