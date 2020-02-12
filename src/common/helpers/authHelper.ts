import {localization} from "../localization/localization";

export class AuthHelper {

    static checkEmail(email: string): void {
        const emailError = this.isEmail(email);

        if (emailError != null) {
            alert(localization.errors.invalidEmail);
            throw new Error(localization.errors.invalidEmail);
        }
    }

    static isEmail(login: string): string | null {
        //tslint:disable
        if (login == "") {
            return localization.errors.error;
        }

        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const regexTest = emailRegex.test(login);

        if (!regexTest) {
            return localization.errors.invalidEmail;
        }

        return null;
    }

    static checkPassword(password: string): void {
        const passwordError = this.isEmail(password);

        if (passwordError != null) {
            alert(localization.errors.invalidPassword);
            throw new Error(localization.errors.invalidPassword);
        }
    }

    static isPassword(password: string): string | null {
        return password.length < 6 ? localization.errors.invalidPassword : null;
    }

    static checkConfrimPassword (password: string, confrimPassword: string): void {
        if(password != confrimPassword){
            alert(localization.errors.regConfrimPassError);
            throw new Error(localization.errors.regConfrimPassError);
        }
    }
}