import {localization} from "../localization/localization";
import {IAuth2Params} from "../../types/interfaces";

export class AuthHelper {
    static checkParams(params: IAuth2Params): void {
        this.isEmail(params.login);
        this.checkPassword(params.password);
    }

    static isEmail(login: string): void {
        //tslint:disable
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const regexTest = emailRegex.test(login);

        if (!regexTest) {
            throw new Error(localization.errors.invalidEmail);
        }
    }

    static checkPassword(password: string): void {
        if (password.length < 6) {
            throw new Error(localization.errors.invalidPassword);
        }
    }
}