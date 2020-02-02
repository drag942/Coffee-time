//TODO: Почему опять 2?
export interface IAuthState2 {
    isAuthorizing: boolean;
    error: string | null;
}

export const AuthInitialState2: IAuthState2 = {
    isAuthorizing: false,
    error: null,
};