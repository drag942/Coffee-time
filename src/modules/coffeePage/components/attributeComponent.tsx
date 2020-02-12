import {PureComponent} from "react";
import React from "react";
import {Image, ImageSourcePropType, ImageStyle, Text, TextStyle, View, ViewStyle} from "react-native";
import {styleSheetCreate} from "../../../common/utils";
import {ImageResources} from "../../../common/ImageResources.g";

interface IProps {
    imagePath: IconType;
    text: string;
}

export class AttributeComponent extends PureComponent<IProps> {
    render(): JSX.Element {
        const {imagePath, text} = this.props;

        let image: ImageSourcePropType;
        switch (imagePath) {
            case IconType.Coffee:
                image = ImageResources.icon_coffe;
                break;
            case IconType.Milk:
                image = ImageResources.icon_milk;
                break;
            case IconType.Pressure:
                image = ImageResources.icon_pressure;
                break;
            case IconType.Temperature:
                image = ImageResources.icon_temperature;
                break;
            case IconType.Water:
                image = ImageResources.icon_water;
                break;
            default:
        }

        return (
            <View style={styles.container}>
                <Image source={image!} style={styles.image}/>
                <Text style={styles.text}>{text}</Text>
            </View>
        );
    }
}

const styles = styleSheetCreate({
    container: {
        marginHorizontal: 10
    }as ViewStyle,
    image: {
        height: 44,
        width: 44,
    }as ImageStyle,
    text: {
        marginTop: 5,
        fontSize: 10,
        textAlign: "center",
    }as TextStyle
});
