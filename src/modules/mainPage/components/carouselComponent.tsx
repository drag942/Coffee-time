import React from "react";
import {PureComponent} from "react";
import {Image, ImageStyle, Text, TextStyle, TouchableOpacity, View, ViewStyle} from "react-native";
import {styleSheetCreate} from "../../../common/utils";
import {Colors, Fonts} from "../../../core/theme";
import {ImageSource} from "../../../common/utils/ImageSource";

interface IProps {
    id: string | undefined;
    title: string;
    address: string;
    imageSource: string | undefined;
    onPress?: (id: string) => void;
}

//TODO: Компонент может работать даже если в ID приёдет undefined? Почему вообще может быть undefined?
export class CarouselComponent extends PureComponent<IProps> {
    render(): JSX.Element {
        const {title, imageSource, onPress} = this.props;

        return (
            <TouchableOpacity style={styles.container} onPress={this.onPress} disabled={onPress == null}>
                <Image style={styles.image} source={ImageSource.create(imageSource)!}/>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{title}</Text>
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
        borderRadius: 20,
        marginBottom: 7,
        backgroundColor: Colors.white,
        flexDirection: "column",
        alignItems: "center",
        elevation: 5,
    }as ViewStyle,
    image: {
        width: 215,
        height: 165,
        marginTop: 5,
        marginHorizontal: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    } as ImageStyle,
    textContainer: {
        flexDirection: "column",
        paddingLeft: 10,
    } as ViewStyle,
    title: {
        paddingTop: 4,
        fontSize: 20,
        fontFamily: Fonts.regular,
        fontWeight: "bold" ,
        color: Colors.browny,
        marginBottom: 5,
    }as TextStyle,
});