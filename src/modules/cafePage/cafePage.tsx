import React from "react";
import {connectAdv} from "../../core/store";
import {IAppState} from "../../core/store/appState";
import {View, ViewStyle} from "react-native";
import {styleSheetCreate} from "../../common/utils";
import {Colors} from "../../core/theme";
import {CafeInfo} from "../../core/api/CoffeeRequest";
import {BaseReduxComponent, IReduxProps} from "../../core/BaseComponent";

import {PlainHeader} from "../../common/components/Headers";
import {MainPageComponent} from "../mainPage/components/mainPageComponent";
import {NavigationAction, NavigationLeafRoute, NavigationScreenProp} from "react-navigation";
import {ICommonNavParams} from "../../navigation/actions";
import {INavParam} from "../../common/helpers/getParamsFromProps";

interface IStateProps {
    cafe: CafeInfo;
}

interface IProps extends IReduxProps<IStateProps, IEmpty> {
    navigation: NavigationScreenProp<NavigationLeafRoute<ICommonNavParams>, NavigationAction>;
}

@connectAdv(({mainPage}: IAppState, ownProps: INavParam<ICommonNavParams>): IStateProps => ({
        cafe: mainPage.cafes.find(item => item.id == ownProps.navigation.state.params!.id)!,

    })
)

export class CafePage extends BaseReduxComponent<IStateProps, IEmpty, IProps> {
    static navigationOptions = PlainHeader( true);
    render(): JSX.Element {
        const cafe = this.stateProps.cafe;
        return(
            <View style={styles.container}>
                <MainPageComponent id={cafe.id} title={cafe.name} address={cafe.address} imageSource={cafe.images}/>
            </View>
        );
    }
}

const styles = styleSheetCreate({
    container: {
        flex: 1,
        backgroundColor: Colors.white
    } as ViewStyle,
    component: {
        paddingTop: 15,
    } as ViewStyle,
});