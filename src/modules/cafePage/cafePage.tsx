import React from "react";
import {connectAdv} from "../../core/store";
import {IAppState} from "../../core/store/appState";
import {Image, ImageStyle,  Text, TextStyle, View, ViewStyle} from "react-native";
import {styleSheetCreate} from "../../common/utils";
import {Colors, CommonStyles, Fonts} from "../../core/theme";
import {CafeInfo, ProductBriefInfo} from "../../core/api/CoffeeRequest";
import {BaseReduxComponent, IReduxProps} from "../../core/BaseComponent";
import {PlainHeader} from "../../common/components/Headers";
import {NavigationAction, NavigationLeafRoute, NavigationScreenProp} from "react-navigation";
import {ICommonNavParams} from "../../navigation/actions";
import {INavParam} from "../../common/helpers/getParamsFromProps";
import {ImageSource} from "../../common/utils/ImageSource";
import {FlatListWrapper} from "../../common/components/FlatListWrapper";
import {LoadState} from "../../common/loadState";
import {Dispatch} from "redux";
import {CafePageAsyncActions} from "./cafePageAsyncActions";
import {EmptyComponent} from "../../common/components/EmptyComponent";
import {defaultIdExtractor} from "../../common/helpers";
import {ProductComponent} from "./components/productComponent";
import {NavigationActions} from "../../navigation/navigation";

interface IStateProps {
    cafe: CafeInfo;
    products: ProductBriefInfo[];
    loadState: LoadState;
    error: string | null;
}

interface IDispatchProps {
    getProducts: () => void;
    navigateToCoffeePage: (id: string) => void;
}

interface IProps extends IReduxProps<IStateProps, IEmpty> {
    navigation: NavigationScreenProp<NavigationLeafRoute<ICommonNavParams>, NavigationAction>;
}

@connectAdv(
    ({mainPage, cafePage}: IAppState, ownProps: INavParam<ICommonNavParams>): IStateProps => ({
        cafe: mainPage.cafes.find(item => item.id == ownProps.navigation.state.params!.id)!,
        products: cafePage.products,
        loadState: cafePage.loadState,
        error: cafePage.error,
    }),
    (dispatch: Dispatch, ownProps: INavParam<ICommonNavParams>): IDispatchProps => ({
        getProducts: (): void => {
            dispatch(CafePageAsyncActions.getProducts(ownProps.navigation.state.params!.id));
        },
        navigateToCoffeePage: (id: string): void => {
            dispatch(NavigationActions.navigateToCoffeePage({id}));
        }
    })
    )

export class CafePage extends BaseReduxComponent<IStateProps, IDispatchProps, IProps> {
    static navigationOptions = PlainHeader( undefined, true);
    componentDidMount(): void {
        this.dispatchProps.getProducts();
    }

    render(): JSX.Element {
        const cafe = this.stateProps.cafe;
        const {products, error, loadState} = this.stateProps;

        return(
            <View style={styles.container}>
                <View style={CommonStyles.flex1}>
                    <Image source={ImageSource.create(cafe.images)!} style={styles.backgroundImg}/>
                    <View style={styles.textContainer}>
                        <Text style={styles.name}>{cafe.name}</Text>
                        <Text style={styles.address}>{cafe.address}</Text>
                    </View>
                </View>
                <View style={CommonStyles.flex1}>
                    <FlatListWrapper
                        style={styles.container}
                        data={products}
                        loadState={loadState}
                        keyExtractor={defaultIdExtractor}
                        errorText={error}
                        EmptyComponent={this.renderEmptyComponent}
                        renderItem={this.renderProduct}
                        tryAgain={this.tryAgain}
                        onRefresh={this.tryAgain}
                        loadMore={this.tryAgain}
                        numColumns={2}
                    />
                </View>
            </View>
        );
    }
    private tryAgain = (): void => {
        this.dispatchProps.getProducts();
    };
    private renderEmptyComponent = (): JSX.Element => {
        return (
            <EmptyComponent title={"Список пуст"}/>
        );
    };

    private renderProduct = ({item}: {item: ProductBriefInfo}): JSX.Element => {
        return (
           <ProductComponent
               name={item.name}
               price={item.price}
               favorite={item.favorite}
               imagesPath={item.imagesPath}
               id={item.id}
               cofeId={item.cofeId}
               onPress={this.dispatchProps.navigateToCoffeePage}
           />
        );

    };

}

const styles = styleSheetCreate({
    container: {
        flex: 1,
        backgroundColor: Colors.greyLight
    } as ViewStyle,
    component: {
        paddingTop: 15,
    } as ViewStyle,
    backgroundImg: {
        position: "absolute",
        top: -100,
        bottom: 0,
        left: 0,
        right: 0,
        resizeMode: "stretch",
        width: null as any,
        height: null as any,
        marginBottom: 5,
        opacity: 0.6,
    } as ImageStyle,
    textContainer: {
        marginTop: 260,
        marginLeft: 20,
    } as ViewStyle,
    name: {
        fontFamily: Fonts.lobster,
        fontSize: 30,
        color: Colors.black
    } as TextStyle,
    address: {
        fontFamily: Fonts.regular,
        fontSize: 18,
        color: Colors.black,
        marginTop: 13,
    }as TextStyle

});