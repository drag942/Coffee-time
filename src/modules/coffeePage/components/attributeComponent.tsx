import {PureComponent} from "react";
import React from "react";
import {Image, ImageSourcePropType, ImageStyle, Text, TextStyle, View, ViewStyle} from "react-native";
import {styleSheetCreate} from "../../../common/utils";

interface IProps {
    imagePath: ImageSourcePropType;
    text: string;
}

export class AttributeComponent extends PureComponent<IProps> {
    render(): JSX.Element {
        const {imagePath, text} = this.props;

        return (
            <View style={styles.container}>
                <Image source={imagePath} style={styles.image}/>
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
