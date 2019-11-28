import React from "react";
import {PureComponent} from "react";
import {Image, ImageStyle, Text, TextStyle, TouchableOpacity, View, ViewStyle} from "react-native";
import {styleSheetCreate} from "../../../common/utils";
import {Colors, Fonts} from "../../../core/theme";
import {ImageSource} from "../../../common/utils/ImageSource";
import {localization} from "../../../common/localization/localization";
import {ImageResources} from "../../../common/ImageResources.g";

interface IProps {
    id: string | undefined;
    title: string;
    address: string;
    imageSource: string | undefined;
    onPress?: (id: string) => void;
}

export class MainPageComponent extends PureComponent<IProps> {
    render(): JSX.Element {
        const {title, address, imageSource, onPress} = this.props;

        return (
            <TouchableOpacity style={styles.container} onPress={this.onPress} disabled={onPress == null}>
                <Image style={styles.image} source={ImageSource.create(imageSource)!}/>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{title}</Text>
                    <Text>{localization.main.weAreLocated}</Text>
                    <Text style={styles.address}>{address}</Text>
                    <View style={styles.readMoreContainer}>
                        <Text style={styles.textReadMore}>{localization.main.readMore}</Text>
                        <Image style={styles.imgReadMore} source={ImageResources.icon_read_more}/>
                    </View>
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
        marginBottom: 7,
        backgroundColor: Colors.white,
        flexDirection: "row",
    }as ViewStyle,
    image: {
        width: 140,
        height: 140,
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
    address: {
        fontSize: 14,
        fontFamily: Fonts.regular,
        color: Colors.black,
    } as TextStyle,
    readMoreContainer: {
       flexDirection: "row",
       paddingTop: 30,
       paddingLeft: 170
    } as ViewStyle,
    imgReadMore: {
       width: 20,
       height: 20,
    } as ImageStyle,
    textReadMore: {
        fontSize: 13,
        fontFamily: Fonts.regular,
        color: Colors.black,
    } as TextStyle,

});