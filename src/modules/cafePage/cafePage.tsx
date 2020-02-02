import React from "react";
import {connectAdv} from "../../core/store";
import {IAppState} from "../../core/store/appState";
import {Image, ImageStyle, Text, TextStyle, View, ViewStyle} from "react-native";
import {styleSheetCreate} from "../../common/utils";
import {Colors, Fonts, windowHeight, windowWidth} from "../../core/theme";
import {CafeInfo, ProductBriefInfo} from "../../core/api/CoffeeRequest";
import {BaseReduxComponent, IReduxProps} from "../../core/BaseComponent";
import {PlainHeader} from "../../common/components/Headers";
import {NavigationAction, NavigationLeafRoute, NavigationScreenProp} from "react-navigation";
import {ICommonNavParams} from "../../navigation/actions";
import {getParamsFromProps, INavParam} from "../../common/helpers/getParamsFromProps";
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
    key: boolean;
}

interface IDispatchProps {
    getProducts: (loadState: LoadState) => void;
    navigateToCoffeePage: (id: string) => void;
}

//TODO: Почему полностью не заполнить IReduxProps?
interface IProps extends IReduxProps<IStateProps, IEmpty> {
    navigation?: NavigationScreenProp<NavigationLeafRoute<ICommonNavParams>, NavigationAction>;
}

const offsetTop = windowHeight / 2 - 6;

/*
TODO: Это компонент, соответсвенно файл должен начинаться в верхем регистре

TODO: Получение ID можно было вынести отдельно и один раз можно было бы получить продукт,
      так получается минимум 2 раза один и тот же проход
*/
@connectAdv(
    ({mainPage, cafePage}: IAppState, ownProps: INavParam<ICommonNavParams>): IStateProps => ({
        cafe: mainPage.cafes.find(item => item.id == getParamsFromProps(ownProps).id)!,
        products: cafePage.products.get(getParamsFromProps(ownProps).id)!,
        loadState: cafePage.loadState,
        error: cafePage.error,
        key: cafePage.products.has(getParamsFromProps(ownProps).id),
    }),
    (dispatch: Dispatch, ownProps: INavParam<ICommonNavParams>): IDispatchProps => ({
        getProducts: (loadState: LoadState): void => {
            dispatch(CafePageAsyncActions.getProducts(loadState, getParamsFromProps(ownProps).id));
        },
        navigateToCoffeePage: (id: string): void => {
            dispatch(NavigationActions.navigateToCoffeePage({id}));
        }
    })
    )

export class CafePage extends BaseReduxComponent<IStateProps, IDispatchProps, IProps> {
    static navigationOptions = PlainHeader( undefined, true);

    componentDidMount(): void {
        const {key} = this.stateProps;
        //TODO: allIsLoaded используется когда мы находимся в списке и больше не можем ничего загрузить, т.к. это конечные данные
        this.dispatchProps.getProducts(key  ? LoadState.allIsLoaded : LoadState.firstLoad );
    }

    render(): JSX.Element {
        const cafe = this.stateProps.cafe;
        const {products, error, key} = this.stateProps;

        return(
            <View style={styles.container}>
                <View style={styles.containerImg}>
                    <Image
                        source={ImageSource.create(cafe.images)!}
                        style={styles.backgroundImg}
                    />
                    <Text style={styles.name}>{cafe.name}</Text>
                    <Text style={styles.address}>{cafe.address}</Text>
                </View>
                <FlatListWrapper
                    contentContainerStyle={styles.containerFlatList}
                    data={products != undefined ? products : []} //TODO: products не могут быть undefined
                    loadState={key ? LoadState.allIsLoaded : LoadState.firstLoad} //TODO: Почему нельзя передавать весь loadState?
                    keyExtractor={defaultIdExtractor}
                    errorText={error}
                    EmptyComponent={this.renderEmptyComponent}
                    renderItem={this.renderProduct}
                    onRefresh={this.pullToRefresh}
                    loadMore={this.loadMore}
                    numColumns={2}
                />
            </View>
        );
    }

    private loadMore = (): void => {
        this.dispatchProps.getProducts(LoadState.loadingMore);
    };

    private pullToRefresh = (): void => {
        this.dispatchProps.getProducts(LoadState.pullToRefresh);
    };

    private renderEmptyComponent = (): JSX.Element => {
        return (
            <EmptyComponent title={"Список пуст"}/> //TODO: Должно быть вынесено в константу
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
    containerFlatList: {
        marginTop: offsetTop,
        backgroundColor: Colors.greyLight,
        paddingBottom: offsetTop
    } as ViewStyle,
    containerImg: {
        height: windowHeight / 2,
        position: "absolute",
        width: windowWidth,
        top: 0,
        right: 0,
        left: 0,
        justifyContent: "flex-end",
    } as ViewStyle,
    container: {
        flex: 1,
    } as ViewStyle,
    component: {
        marginTop: 15,
    } as ViewStyle,
    backgroundImg: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        resizeMode: "cover",
        width: windowWidth,
        height: windowHeight / 2,
        marginBottom: 5,
        opacity: 0.6,
    } as ImageStyle,
    textContainer: {
        marginTop: 240,
        marginLeft: 20,
        marginBottom: 20
    } as ViewStyle,
    name: {
        fontFamily: Fonts.lobster,
        fontSize: 30,
        color: Colors.black,
        marginBottom: 13,
        marginLeft: 10,
    } as TextStyle,
    address: {
        fontFamily: Fonts.regular,
        fontSize: 18,
        color: Colors.black,
        marginBottom: 13,
        marginLeft: 10,
    }as TextStyle
});