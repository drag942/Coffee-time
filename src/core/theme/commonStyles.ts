import {ImageStyle, Platform,  ViewStyle} from "react-native";
import {styleSheetCreate, styleSheetFlatten} from "../../common/utils";
import {Colors} from "./colors";
import {Fonts} from "./fonts";

export const CommonStyles = styleSheetCreate({
    flex1: {
        flex: 1
    } as ViewStyle,
    flexWhiteBackground: {
        flex: 1,
        backgroundColor: Colors.white,
    } as ViewStyle,
    bottomEmptySpace: {
        height: 50,
        backgroundColor: Colors.white
    } as ViewStyle,
    iPhoneXFooter: {
        height: 20
    } as ViewStyle,
});

const commonHeaderTitleStyle = {
    alignSelf: "center",
    textAlign: "center",
    fontSize: 20,
    fontFamily: Fonts.lobster,
    color: Colors.black,
} as ImageStyle;

const commonHeaderStyle = {
    borderBottomWidth: 0,
    borderBottomColor: Colors.transparent,
    ...Platform.select({
        ios: {
            shadowRadius: 4,
            shadowOpacity: 0.3,
            shadowOffset: {width: 0, height: 4},
        },
        android: {
            elevation: 8
        }}),
} as ViewStyle;

export const CommonHeaderStyles = styleSheetCreate({
    headerTitleStyle: styleSheetFlatten([commonHeaderTitleStyle, {color: Colors.warmGreyTwo}]),
    headerStyle: styleSheetFlatten([commonHeaderStyle, {backgroundColor: Colors.white}]),
});