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
    static navigationOptions = NoHeader();

    constructor(props: IEmpty) {
        super(props);
        this.state = appSettingsProvider.settings.environment == "Development"
            ? {login: "string", password: "string"} //TODO: for fast auth(need use auth parameters for registered user)
            : {login: "", password: ""};
    }

    render(): JSX.Element {
        const {login, password} = this.state;
        const isAuthorizing = this.stateProps.isAuthorizing;
        const isDisabled = login == "" || password == "" || isAuthorizing;

        return (
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
                            value={this.state.login}
                        />
                        <AuthTextInput
                            label={localization.auth.password}
                            containerStyle={styles.input}
                            secureTextEntry={true}
                            onChangeText={this.onPasswordTextChange}
                            value={this.state.password}
                        />
                        <View style={styles.separator}/>
                        <MainButton
                            buttonType={isDisabled ? ButtonType.disabled : ButtonType.positive}
                            disabled={isDisabled}
                            title={localization.auth.signIn}
                            onPress={this.onLoginPress}
                        />
                    </View>
                </KeyboardAvoidingView>
            </TouchableOpacity>
        );
    }

    private onLoginPress = (): void => this.dispatchProps.login(this.state.login, this.state.password);
    private onLoginTextChange = (login: string): void => this.setState({login});
    private onPasswordTextChange = (password: string): void => this.setState({password});
    //TODO: state need use if you need change values. In this case need use class parameters(private login = "";)
}

//TODO: not use % if can, rework this page to flex only
const styles = styleSheetCreate({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        alignItems: "center",
        justifyContent: "space-between"
    } as ViewStyle,
    form: {
        flex: 1,
        justifyContent: "center",
        width: "80%",
        marginBottom: "40%",
    } as ViewStyle,
    background: {
        flex: 1,
        width: "50%",
        height: "50%",
        resizeMode: "contain",
        alignSelf: "center"
    } as ImageStyle,
    separator: {
        height: "40%"
    } as ViewStyle,
    input: {
        marginHorizontal: 16,
        marginTop: 30,
    }as ViewStyle,
});