import {BaseReduxComponent} from "../../core/BaseComponent";
import {PlainHeader} from "../../common/components/Headers";
import {Image, ImageStyle, Keyboard, KeyboardAvoidingView, TouchableOpacity, View, ViewStyle} from "react-native";
import {Colors, CommonStyles, isIos} from "../../core/theme";
import {ImageResources} from "../../common/ImageResources.g";
import {AuthTextInput} from "../../common/components/AuthTextInput";
import {localization} from "../../common/localization/localization";
import {MainButton} from "../../common/components/MainButton";
import {ButtonType} from "../../common/enums/buttonType";
import React from "react";
import {styleSheetCreate} from "../../common/utils";
import {connectAdv} from "../../core/store";
import {IAppState} from "../../core/store/appState";
import {Dispatch} from "redux";
import {RegPageAsyncActions} from "./regPageAsyncActions";

interface IStateProps {
    isReg: boolean;
    error: string ;
}

interface IDispatchProps {
    registration: (login: string, password: string) => void;
}

interface IState {
    isDisabled: boolean;
}

@connectAdv(
    ({regPage}: IAppState): IStateProps => ({
        isReg: regPage.isReg,
        error: regPage.error || ""
    }),
    (dispatch: Dispatch): IDispatchProps => ({
        registration: (email: string, password: string): void => {
            dispatch(RegPageAsyncActions.registration(email, password));
        },
    }),
)
export class RegPage extends BaseReduxComponent<IStateProps, IDispatchProps, IState> {
    static navigationOptions = PlainHeader(undefined, true);
    private email: string = "";
    private password: string = "";
    private confrimPassword: string = "";

    constructor(props: IEmpty) {
        super(props);
        this.state = {isDisabled: true};
    }

    render(): JSX.Element {
        const isReg = this.stateProps.isReg;
        const isDisabled = this.state.isDisabled || isReg;

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
                            keyboardType={"email-address"}
                        />
                        <AuthTextInput
                            label={localization.auth.password}
                            containerStyle={styles.input}
                            secureTextEntry={true}
                            onChangeText={this.onPasswordTextChange}
                            enablesReturnKeyAutomatically={true}
                        />
                        <AuthTextInput
                            label={localization.auth.confrimPassword}
                            containerStyle={styles.input}
                            secureTextEntry={true}
                            onChangeText={this.onConfirmPasswordTextChange}
                            enablesReturnKeyAutomatically={true}
                        />
                        <View style={styles.separator}/>
                        <MainButton
                            buttonType={isDisabled ? ButtonType.disabled : ButtonType.positive}
                            disabled={isDisabled}
                            title={localization.auth.registation}
                            onPress={this.onRegPress}
                        />
                    </View>
                    <View style={styles.footer}/>
                </KeyboardAvoidingView>
            </TouchableOpacity>
        );
    }

    private onLoginTextChange = (email: string): void => {
        this.email = email;
        if ( this.email == "" || this.password == "" || this.confrimPassword == "") {
            if (!this.state.isDisabled) {
                this.setState({isDisabled: true});
            }
        } else {
            if (this.state.isDisabled) {
                this.setState({isDisabled: false});
            }
        }
    };

    private onPasswordTextChange = (password: string): void => {
        this.password = password;
        if (this.email == "" || this.password == "" || this.confrimPassword == "") {
            if (!this.state.isDisabled) {
                this.setState({isDisabled: true});
            }
        } else {
            if (this.state.isDisabled) {
                this.setState({isDisabled: false});
            }
        }
    };

    private onConfirmPasswordTextChange = (confirmPassword: string): void => {
        this.confrimPassword = confirmPassword;
        if (this.email == "" || this.password == "" || this.confrimPassword == "") {
            if (!this.state.isDisabled) {
                this.setState({isDisabled: true});
            }
        } else {
            if (this.state.isDisabled) {
                this.setState({isDisabled: false});
            }
        }
    };

    private onRegPress = (): void => {
        if (this.password == this.confrimPassword) {
            this.dispatchProps.registration(this.email, this.password);
        } else {
            alert("Пароли не совпадают");
        }
    };
}

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
        marginVertical: 20,
    } as ViewStyle,
    input: {
        marginTop: 30,
    }as ViewStyle,
    footer: {
        flex: 3,
    } as ViewStyle
});