import {NavigationStackScreenOptions} from "react-navigation";
import {CommonHeaderStyles} from "../../core/theme/commonStyles";
import React from "react";
import {HeaderButton} from "../../navigation/components/HeaderButton";
import {ImageResources} from "../ImageResources.g";
import {NavigationActions} from "../../navigation/navigation";
import {Image, View} from "react-native";

export const NoHeader = (): NavigationStackScreenOptions | null => ({header: <React.Fragment/>});

export function PlainHeader(title?: string, showLeftButton?: boolean, showDrawerIcon?: boolean): NavigationStackScreenOptions {
    return ({
        headerTitle: title || (
             <Image
                 source={ImageResources.logo}
                 style={CommonHeaderStyles.headerImageStyle} //TODO: bad style and bad position styleSheetCreate
             />
         ),
        headerTitleStyle: CommonHeaderStyles as any,
        headerLeft: showLeftButton ? (
            <HeaderButton
                image={showDrawerIcon ? ImageResources.image_menu : ImageResources.icon_back_click}
                action={showDrawerIcon ? NavigationActions.toggleDrawer : NavigationActions.navigateToBack}
            />
        ) : undefined,
        headerRight: <View/>,
        headerBackTitle: null,
        headerStyle: CommonHeaderStyles.headerStyle as any,
        headerTitleAllowFontScaling: false,
    });
}