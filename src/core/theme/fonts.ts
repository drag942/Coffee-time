import {isIos} from "./common";

export class Fonts {
    static medium = isIos ? "SFProDisplay-Medium" : "Roboto-Medium";
    static regular = isIos ? "SFProDisplay-Regular" : "Roboto-Regular";
    static lobster = isIos ? "SFProDisplay-Regular" : "Lobster-Regular";
}
