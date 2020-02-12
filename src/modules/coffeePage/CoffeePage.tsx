import {AttributeInfo, ProductFullInfo} from "../../core/api/CoffeeRequest";
import {BaseReduxComponent, IReduxProps} from "../../core/BaseComponent";
import {NavigationAction, NavigationLeafRoute, NavigationScreenProp} from "react-navigation";
import {ICommonNavParams} from "../../navigation/actions";
import {connectAdv} from "../../core/store";
import {IAppState} from "../../core/store/appState";
import {getParamsFromProps, INavParam} from "../../common/helpers/getParamsFromProps";
import {Dispatch} from "redux";
import {CoffeePageAsyncActions} from "./coffeePageAsyncActions";
import {PlainHeader} from "../../common/components/Headers";
import React from "react";
import {FlatList, Image, ImageStyle, Text, TextStyle, TouchableOpacity, View, ViewStyle} from "react-native";
import {ImageSource} from "../../common/utils/ImageSource";
import {Colors, CommonStyles, Fonts, windowHeight, windowWidth} from "../../core/theme";
import {ImageResources} from "../../common/ImageResources.g";
import {AttributeComponent} from "./components/attributeComponent";
import {styleSheetCreate} from "../../common/utils";
import {localization} from "../../common/localization/localization";
import {LoadState} from "../../common/loadState";
import {LoadingView} from "../../common/components/LoadingView";

interface IStateProps {
    product: ProductFullInfo;
    error: string | null;
    loadState: LoadState;
    key: boolean;
    attributes: AttributeInfo[];
}

interface IDispatchProps {
    getProduct: (loadState: LoadState) => void;
    setFavorite: () => void;
    unsetFavorite: () => void;
}

interface IProps extends IReduxProps<IStateProps, IDispatchProps> {
    navigation?: NavigationScreenProp<NavigationLeafRoute<ICommonNavParams>, NavigationAction>;

}

@connectAdv(
    ({coffeePage}: IAppState, ownProps: INavParam<ICommonNavParams>): IStateProps =>  {
        const id = getParamsFromProps(ownProps).id;

        return ({
        product: coffeePage.product.get(id)!,
        error: coffeePage.error,
        loadState: coffeePage.loadState,
        key: coffeePage.product.has(id),
        attributes: coffeePage.product.get(id)!.attribute
    });
    },
    (dispatch: Dispatch, ownProps: INavParam<ICommonNavParams>): IDispatchProps =>  {
        const id = getParamsFromProps(ownProps).id;

        //TODO: Зачем это выносить?
        //TODO: уменьшает кол-во кода
        const getProd = (loadState: LoadState): void => {
            dispatch(CoffeePageAsyncActions.getProduct(loadState, id));
        };

       return ({
        getProduct: getProd,
        setFavorite: (): void => {
            dispatch(CoffeePageAsyncActions.setFavorite(id, getProd));
        },
        unsetFavorite: (): void => {
            dispatch(CoffeePageAsyncActions.unsetFavorite(id,  getProd));
        },
    });
    }
)

export class CoffeePage  extends BaseReduxComponent<IStateProps, IDispatchProps, IProps> {
    static navigationOptions = PlainHeader( undefined, true);

    componentDidMount(): void {
        const {key} = this.stateProps;
        this.dispatchProps.getProduct(key ? LoadState.allIsLoaded : LoadState.firstLoad);
    }
    render(): JSX.Element {
        //TODO: Зачем вообще здесь нужен ключ? Для чего такие проверки? Почему мы не можем работать с продуктом напрямую?
        //TODO ключ нужен для проверки наличия продукта в кешированой MAP в случае отсутсвия интернета
        const {product, key} = this.stateProps;

        return (
        key ?
            <View style={CommonStyles.flexWhiteBackground}>
               <Image style={styles.coffeeImg} source={ImageSource.create(product.imagesPath)!}/>
               <View style={styles.nameContainer}>
                   <Text style={styles.textName}>{product.productName}</Text>
                   <TouchableOpacity onPress={!product.favarite ? this.dispatchProps.setFavorite : this.dispatchProps.unsetFavorite}>
                       <Image
                           style={styles.heart}
                           source={product.favarite ? ImageResources.icon_heart_active : ImageResources.icon_heart_gray}
                       />
                   </TouchableOpacity>
               </View>
               <View style={styles.attributes}>
                   <FlatList data={this.stateProps.attributes} renderItem={this.renderItem} horizontal={true}/>
               </View>
               <View style={styles.descriptionContainer}>
                   <Text style={styles.description}>
                       {localization.pages.testText}
                   </Text>
               </View>
               <View style={styles.priceContainer}>
                   <View style={styles.rubleContainer}>
                       <Text style={styles.priceText}>{product.price}</Text>
                       <Image source={ImageResources.icon_ruble} style={styles.ruble}/>
                   </View>
                   <TouchableOpacity style={styles.buttonStyle} disabled={true}>
                       <Text style={styles.order}>{localization.pages.order}</Text>
                   </TouchableOpacity>
               </View>
            </View>
            :
           <LoadingView/>
        );
    }

    private renderItem = ({item}: {item: AttributeInfo }): JSX.Element => {
        return (
            <AttributeComponent imagePath={item.iconType as IconType} text={item.description}/>
        );
    };
}

const styles = styleSheetCreate({
    attributes: {
        marginVertical: 20,
        marginLeft: 10,
    }as ViewStyle,
    nameContainer: {
        flexDirection: "row",
        marginLeft: 20,
        marginTop: 20,
    }as ViewStyle,
    textName: {
        fontFamily: Fonts.lobster,
        fontSize: 25,
        color: Colors.black
    }as TextStyle,
    heart: {
        width: 33,
        height: 33,
        marginLeft: 5,
        marginTop: 2,
    }as ImageStyle,
    coffeeImg: {
        width: windowWidth * 0.75,
        height: windowHeight / 3,
        alignSelf: "center",
        marginVertical: 20,
    }as ImageStyle,
    description: {
        marginHorizontal: 20,
        fontSize: 18,
        textAlign: "left",
        lineHeight: 25,
    }as TextStyle,
    descriptionContainer: {
        flex: 1,
        marginTop: 10,
    }as ViewStyle,
    priceContainer: {
        marginTop: 70,
        flex: 1,
        flexDirection: "row",
        borderTopWidth: 2,
        borderTopColor: Colors.greyLight,
        justifyContent: "space-between",
    }as ViewStyle,
    ruble: {
        width: 30,
        height: 30,
        marginTop: 8,
        marginRight: 5,
        tintColor: Colors.warmGrey,

    }as ImageStyle,
    rubleContainer: {
        flexDirection: "row",
        marginLeft: 32,
        marginTop: 22,
    }as ViewStyle,
    priceText: {
        fontSize: 33
    }as TextStyle,
    buttonStyle: {
        marginVertical: 23,
        backgroundColor: Colors.browny,
        justifyContent: "center",
        marginRight: 10,
    }as ViewStyle,
    order: {
        fontSize: 22,
        textAlign: "center",
        marginHorizontal: 50,
        color: Colors.white,
    }as TextStyle

});