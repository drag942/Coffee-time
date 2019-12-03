import LocalizedStrings from "react-native-localization";
import {dateLocalization} from "./dateLocalization";
import {commonLocalization} from "./commonLocalization";
import {pagesLocalization} from "./pagesLocalization";
import {emptyLocalization} from "./emptyLocalization";
import {authLocalization} from "./authLocalization";
import {errorsLocalization} from "./errorsLocalization";
import {mainPageLocalization} from "./mainPageLocalization";

class Localization {
    common = new LocalizedStrings(commonLocalization);
    date = new LocalizedStrings(dateLocalization);
    pages = new LocalizedStrings(pagesLocalization);
    empty = new LocalizedStrings(emptyLocalization);
    auth = new LocalizedStrings(authLocalization);
    errors = new LocalizedStrings(errorsLocalization);
    main = new LocalizedStrings(mainPageLocalization);
    getLanguage(): string {
        return this.common.getLanguage();
    }
}

export const localization = new Localization();