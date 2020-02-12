import {LoadState} from "../common/loadState";

export interface IAuthParams {
    login: string;
    password: string;
}

export interface IRegParams {
    email: string;
    password: string;
    confrimPassword: string;
}

export interface ICafePageParams {
    loadState: LoadState;
    id: string;
}
