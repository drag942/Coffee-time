import React from "react";
import {PureComponent} from "react";
import {Image, ImageStyle, Text, TextStyle, TouchableOpacity, View, ViewStyle} from "react-native";
import {Colors, Fonts, windowWidth} from "../../../core/theme";
import {ImageSource} from "../../../common/utils/ImageSource";
import {ImageResources} from "../../../common/ImageResources.g";
import {styleSheetCreate} from "../../../common/utils";

interface IProps {
    id: string;
    cofeId: string;
    name: string;
    price: number;
    favorite: boolean;
    imagesPath?: string | undefined;
    onPress?: (id: string) => void;
}

export class ProductComponent extends PureComponent<IProps> {
    render(): JSX.Element {
        const {name, price, favorite, imagesPath, onPress} = this.props;

        return (
            <TouchableOpacity style={styles.container} onPress={this.onPress} disabled={onPress == null}>
                <View style={styles.titleView}>
                    <Text style={styles.name}>{name}</Text>
                </View>
                <View style={styles.imgCoffeeContainer}>
                    <Image source={ImageSource.create(imagesPath)!} style={styles.imgCoffee}/>
                </View>
                <View style={styles.infoView}>
                    <Text style={styles.price}>{price}</Text>
                    <Image style={styles.rubleImg} source={ImageResources.icon_ruble} />
                    <Image style={styles.heartImg} source={favorite ? ImageResources.icon_heart_active : ImageResources.icon_heart_gray}/>
                </View>
            </TouchableOpacity>
        );
    }
    private onPress = (): void => {
        this.props.onPress!(this.props.id!);
    }
}

const styles = styleSheetCreate({
    container: {
        width: windowWidth / 2 - 10,
        backgroundColor: Colors.white,
        marginHorizontal: 5,
        marginVertical: 5,
    }as ViewStyle,
   titleView: {
       flex: 1,
       marginTop: 5,
       marginLeft: 5,
   }as ViewStyle,
   name: {
       fontFamily: Fonts.regular,
       fontWeight: "bold",
       color: Colors.warmGrey,
       fontSize: 20,
       marginTop: 5,
       marginLeft: 5,
   }as TextStyle,
   imgCoffeeContainer: {
       flex: 4,
   }as ViewStyle,
   imgCoffee: {
       width: 110,
       height: 110,
       marginLeft: 40,
       marginTop: 20,
       marginBottom: 15,
    }as ImageStyle,
    infoView: {
        flex: 1,
        flexDirection: "row",
        marginLeft: 10,
        marginBottom: 10,
    }as ViewStyle,
    heartImg: {
        width: 25,
        height: 25,
        marginLeft: 105,
    }as ImageStyle,
    rubleImg: {
        width: 25,
        height: 25,
        marginTop: 3,
    }as ImageStyle,
    price: {
       fontFamily: Fonts.lobster,
        fontSize: 25,
        color: Colors.browny,
    }as TextStyle,
});