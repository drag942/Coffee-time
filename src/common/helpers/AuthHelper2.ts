import {localization} from "../localization/localization";

//TODO: Зачем создавать второй файл, если уже есть существующий?
//TODO: Этот файл не является компонентом, соответственно должен начианться в нижнем регистре
export class AuthHelper2 {

    static checkEmail(email: string): void {
        const emailError = this.isEmail(email);

        if (emailError != null) {
            throw new Error(emailError);
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

    static checkPassword(password: string): string | null {
        return password.length < 6 ? localization.errors.invalidPassword : null;
    }
}