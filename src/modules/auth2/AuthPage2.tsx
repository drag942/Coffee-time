import React from "react";
import {Image, ImageStyle, Keyboard, KeyboardAvoidingView, TouchableOpacity, View, ViewStyle} from "react-native";
import {styleSheetCreate} from "../../common/utils";
import {Colors, CommonStyles, isIos} from "../../core/theme";
import {NoHeader} from "../../common/components/Headers";
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
import {appSettingsProvider} from "../../core/settings";

interface IStateProps {
    isAuthorizing: boolean;
    error: string ;
}

interface IDispatchProps {
    login: (login: string, password: string) => void;
}

 interface IState {
     isDisabled: boolean;
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
    static navigationOptions = NoHeader();
    private login: string = "";
    private password: string = "";

    constructor(props: IEmpty) {
        super(props);
        this.state = {isDisabled: true};
    }

    render(): JSX.Element {
        const isAuthorizing = this.stateProps.isAuthorizing;
        const isDisabled = this.state.isDisabled || isAuthorizing;
        return(
            <TouchableOpacity style={CommonStyles.flex1} onPress={Keyboard.dismiss} activeOpacity={1}>
                <KeyboardAvoidingView
                    style={styles.container}
                    behavior={"padding"}
                    keyboardVerticalOffset={isIos ? 60 : 95}
                >
                    <Image style={styles.background} source={ImageResources.logo}/>
                    <View style={styles.form}>
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
                        <View style={styles.separator}/>
                        <MainButton
                            buttonType={isDisabled ? ButtonType.disabled : ButtonType.positive}
                            disabled={isDisabled}
                            title={localization.auth.signIn}
                            onPress={this.onLoginPress}
                        />
                    </View>
                    <View style={styles.footer}/>
                </KeyboardAvoidingView>
            </TouchableOpacity>
        );
    }
    private onLoginPress = (): void => {
        if (appSettingsProvider.settings.environment == "Production") {
            this.login = "string";
            this.password = "string";
        }
        this.dispatchProps.login(this.login, this.password);
    };
    private onLoginTextChange = (login: string): void => {
        this.login = login;
        if ( this.login == "" || this.password == "" ) {
            this.setState({isDisabled: true});
        } else {
            this.setState({isDisabled: false});
        }
    };
    private onPasswordTextChange = (password: string): void => {
        this.password = password;
        if (this.login == "" || this.password == "") {
            this.setState({isDisabled: true});
        } else {
            this.setState({isDisabled: false});
        }
    };
    //TODO: state need use if you need change values. In this case need use class parameters(private login = "";)
}

//TODO: not use % if can, rework this page to flex only
const styles = styleSheetCreate({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    } as ViewStyle,
    form: {
        flex: 5,
        alignSelf: "stretch",
        paddingRight: 70,
        paddingLeft: 70
    } as ViewStyle,
    background: {
        flex: 4,
         resizeMode: "contain",
        alignSelf: "center"
    } as ImageStyle,
    separator: {
        flex: 1,
    } as ViewStyle,
    input: {
         marginTop: 30,
    }as ViewStyle,
    footer: {
        flex: 3,
    } as ViewStyle
});