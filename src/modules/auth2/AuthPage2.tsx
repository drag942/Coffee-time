import React from "react";
import {Image, ImageStyle, Keyboard, KeyboardAvoidingView, TouchableOpacity, View, ViewStyle} from "react-native";
import {styleSheetCreate} from "../../common/utils";
import {CommonStyles, isIos} from "../../core/theme";
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
        this.state = {login: "d@d.dd", password: "1"}; //TODO: for fast auth
    }
    render(): JSX.Element {
        const {login, password} = this.state;
        const isAuthorizing = this.stateProps.isAuthorizing;
        const isDisabled = login == "" || password == "" || isAuthorizing;

        return (
            <TouchableOpacity  style={CommonStyles.flex1} onPress={Keyboard.dismiss} activeOpacity={1}>
                <KeyboardAvoidingView
                    style={CommonStyles.flex1}
                    behavior={"padding"}
                    keyboardVerticalOffset={isIos ? 60 : 95}
                >
                    <Image style={styles.background} source={ImageResources.imagebackground} fadeDuration={0}/>
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
                </KeyboardAvoidingView>
            </TouchableOpacity>
        );
    }

    private onLoginPress = (): void => this.dispatchProps.login(this.state.login, this.state.password);
    private onLoginTextChange = (login: string): void => this.setState({login});
    private onPasswordTextChange = (password: string): void => this.setState({password});
}

const styles = styleSheetCreate({
    background: {
        position: "absolute",
        top: -100, //TODO: for identity with splash screen
        bottom: 0,
        left: 0,
        right: 0,
        resizeMode: "stretch",
        width: null as any,
        height: null as any,
    } as ImageStyle,
    separator: {
        flex: 1,
    } as ViewStyle,
    input: {
        marginHorizontal: 16,
        marginTop: 30,
    }as ViewStyle,
});