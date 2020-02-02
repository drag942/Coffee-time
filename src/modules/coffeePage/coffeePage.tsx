import {ProductFullInfo} from "../../core/api/CoffeeRequest";
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
import {Image, ImageStyle, Text, TextStyle, TouchableOpacity, View, ViewStyle} from "react-native";
import {ImageSource} from "../../common/utils/ImageSource";
import {Colors, CommonStyles, Fonts, windowHeight, windowWidth} from "../../core/theme";
import {ImageResources} from "../../common/ImageResources.g";
import {AttributeComponent} from "./components/attributeComponent";
import {styleSheetCreate} from "../../common/utils";
import {localization} from "../../common/localization/localization";
import {LoadState} from "../../common/loadState";

interface IStateProps {
    product: ProductFullInfo;
    error: string | null;
    loadState: LoadState;
    key: boolean;
}

interface IDispatchProps {
    getProduct: (loadState: LoadState) => void;
    setFavorite: () => void;
    unsetFavorite: () => void;
}

interface IProps extends IReduxProps<IStateProps, IEmpty> {
    navigation?: NavigationScreenProp<NavigationLeafRoute<ICommonNavParams>, NavigationAction>;

}

@connectAdv(
    ({coffeePage}: IAppState, ownProps: INavParam<ICommonNavParams>): IStateProps => ({
        product: coffeePage.product.get(getParamsFromProps(ownProps).id)!,
        error: coffeePage.error,
        loadState: coffeePage.loadState,
        key: coffeePage.product.has(getParamsFromProps(ownProps).id),
    }),
    (dispatch: Dispatch, ownProps: INavParam<ICommonNavParams>): IDispatchProps =>  {
        const id = getParamsFromProps(ownProps).id;

        //TODO: Зачем это выносить?
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

//TODO: Текст должен быть вынесен в константы
//TODO: Почему мы можем работать с продуктом, если его у нас нет?
export class CoffeePage  extends BaseReduxComponent<IStateProps, IDispatchProps, IProps> {
    static navigationOptions = PlainHeader( undefined, true);

    componentDidMount(): void {
        const {key} = this.stateProps;
        this.dispatchProps.getProduct(key ? LoadState.allIsLoaded : LoadState.firstLoad);
    }
    render(): JSX.Element {
        //TODO: Зачем вообще здесь нужен ключ? Для чего такие проверки? Почему мы не можем работать с продуктом напрямую?
        const {product, key} = this.stateProps;
        const favarite = key ? product.favarite : false;

        return (
           <View style={CommonStyles.flexWhiteBackground}>
               <Image style={styles.coffeeImg} source={key ? ImageSource.create(product.imagesPath)! : ImageResources.image_eye}/>
               <View style={styles.nameContainer}>
                   <Text style={styles.textName}>{key ? product.productName : "Кофе"}</Text>
                   <TouchableOpacity onPress={!favarite ? this.dispatchProps.setFavorite : this.dispatchProps.unsetFavorite}>
                       <Image
                           style={styles.heart}
                           source={favarite ? ImageResources.icon_heart_active : ImageResources.icon_heart_gray}
                       />
                   </TouchableOpacity>
               </View>
               <View style={styles.attributes}> //TODO: Аттрибуты должны заполнятся из продукта, потенциально их может быть больше
                   <AttributeComponent imagePath={ImageResources.icon_milk} text={"15мл"}/>
                   <AttributeComponent imagePath={ImageResources.icon_coffe} text={"25%"}/>
                   <AttributeComponent imagePath={ImageResources.icon_water} text={"25мл"}/>
                   <AttributeComponent imagePath={ImageResources.icon_temperature} text={"95'"}/>
                   <AttributeComponent imagePath={ImageResources.icon_pressure} text={"15б"}/>
               </View>
               <View style={styles.descriptionContainer}>
                   <Text style={styles.description}>
                       Lorem ipsum dolor sit amet,
                       consectetur adipiscing elit,
                       sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                       At tellus at urna condimentum mattis pellentesque id nibh.
                   </Text>
               </View>
               <View style={styles.priceContainer}>
                   <View style={styles.rubleContainer}>
                       <Text style={styles.priceText}>{key ? product.price : 0}</Text>
                       <Image source={ImageResources.icon_ruble} style={styles.ruble}/>
                   </View>
                   <TouchableOpacity style={styles.buttonStyle} disabled={true}>
                       <Text style={styles.order}>{localization.pages.order}</Text>
                   </TouchableOpacity>
               </View>
           </View>
        );
    }
}

const styles = styleSheetCreate({
    attributes: {
        flexDirection: "row",
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