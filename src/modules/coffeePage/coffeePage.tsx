import {ProductFullInfo} from "../../core/api/CoffeeRequest";
import {BaseReduxComponent, IReduxProps} from "../../core/BaseComponent";
import {NavigationAction, NavigationLeafRoute, NavigationScreenProp} from "react-navigation";
import {ICommonNavParams} from "../../navigation/actions";
import {connectAdv} from "../../core/store";
import {IAppState} from "../../core/store/appState";
import {INavParam} from "../../common/helpers/getParamsFromProps";
import {Dispatch} from "redux";
import {CoffeePageAsyncActions} from "./coffeePageAsyncActions";
import {PlainHeader} from "../../common/components/Headers";
import React from "react";
import {Image, ImageStyle, Text, TextStyle, TouchableOpacity, View, ViewStyle} from "react-native";
import {ImageSource} from "../../common/utils/ImageSource";
import {Colors, CommonStyles, Fonts, windowHeight, windowWidth} from "../../core/theme";
import {ImageResources} from "../../common/ImageResources.g";
import {AtributeComponent} from "./components/atributeComponent";
import {styleSheetCreate} from "../../common/utils";
import {localization} from "../../common/localization/localization";

interface IStateProps {
    product: ProductFullInfo;
    error: string | null;
}

interface IDispatchProps {
    getProduct: () => void;
    setFavorite: (callback: () => void) => void;
    unsetFavorite: (callback: () => void) => void;
}

interface IProps extends IReduxProps<IStateProps, IEmpty> {
    navigation?: NavigationScreenProp<NavigationLeafRoute<ICommonNavParams>, NavigationAction>;
}

@connectAdv(
    ({coffeePage}: IAppState): IStateProps => ({
        product: coffeePage.product,
        error: coffeePage.error,
    }),
    (dispatch: Dispatch, ownProps: INavParam<ICommonNavParams>): IDispatchProps => ({
        getProduct: (): void => {
            dispatch(CoffeePageAsyncActions.getProduct(ownProps.navigation.state.params!.id));
        },
        setFavorite: (callback: () => void): void => {
            dispatch(CoffeePageAsyncActions.setFavorite(ownProps.navigation.state.params!.id, () => callback()));
        },
        unsetFavorite: (callback: () => void): void => {
            dispatch(CoffeePageAsyncActions.unsetFavorite(ownProps.navigation.state.params!.id, () => callback()));
        },
    })
)

export class CoffeePage  extends BaseReduxComponent<IStateProps, IDispatchProps, IProps> {
    static navigationOptions = PlainHeader( undefined, true);
    componentDidMount(): void {
         this.dispatchProps.getProduct();
    }
    render(): JSX.Element {
         const {product} = this.stateProps;

         return (
           <View style={CommonStyles.flexWhiteBackground}>
               <Image style={styles.coffeeImg} source={ImageSource.create(product.imagesPath)!}/>
               <View style={styles.nameContainer}>
                   <Text style={styles.textName}>{product.productName}</Text>
                   <TouchableOpacity onPress={product.favarite ? this.unsetFavorite : this.setFavorite}>
                       <Image
                           style={styles.heart}
                           source={product.favarite ? ImageResources.icon_heart_active : ImageResources.icon_heart_gray}
                       />
                   </TouchableOpacity>
               </View>
               <View style={styles.atributes}>
                   <AtributeComponent imagePath={ImageResources.icon_milk} text={"15мл"}/>
                   <AtributeComponent imagePath={ImageResources.icon_coffe} text={"25%"}/>
                   <AtributeComponent imagePath={ImageResources.icon_water} text={"25мл"}/>
                   <AtributeComponent imagePath={ImageResources.icon_temperature} text={"95'"}/>
                   <AtributeComponent imagePath={ImageResources.icon_pressure} text={"15б"}/>
               </View>
               <View style={styles.descriptionContainer}>
                   <Text style={styles.description}>
                       {""/*TODO: in api i see description*/}
                       Lorem ipsum dolor sit amet,
                       consectetur adipiscing elit,
                       sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                       At tellus at urna condimentum mattis pellentesque id nibh.
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
        );
    }
    private setFavorite = (): void => {
        this.dispatchProps.setFavorite(this.dispatchProps.getProduct);
    };
    private unsetFavorite = (): void => {
        this.dispatchProps.unsetFavorite(this.dispatchProps.getProduct);
}
}

const styles = styleSheetCreate({
    atributes: {
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