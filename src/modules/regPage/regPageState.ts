export interface IRegState {
    isReg: boolean;
    error: string | null;
}

export const RegInitialState: IRegState = {
    isReg: false,
    error: null,
};