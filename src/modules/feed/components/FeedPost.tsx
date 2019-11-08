import React from "react";
import {PureComponent} from "react";
import {Text, TextStyle, View, ViewStyle} from "react-native";
import {styleSheetCreate} from "../../../common/utils";
import {Colors, Fonts} from "../../../core/theme";

interface IProps {
    id: string;
    title: string;
    body: string;
}

export class FeedPost extends PureComponent<IProps> {
    render(): JSX.Element {
        const {title, body} = this.props;

        return(
            <View style={styles.container}>
                <Text style={styles.title}>
                    {title}
                </Text>
                <Text style={styles.body}>
                    {body}
                </Text>
            </View>
        );
    }
}

const styles = styleSheetCreate({
    container: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: Colors.black,
        padding: 10,
        alignItems: "flex-start",
        justifyContent: "flex-start",
        flexDirection: "column",
        elevation: 5,
        marginVertical: 2,
    }as ViewStyle,
    title: {
        fontSize: 14,
        fontFamily: Fonts.regular,
        fontWeight: "bold" ,
        color: Colors.black,
        marginBottom: 5,
    }as TextStyle,
    body: {
        fontSize: 12,
        fontFamily: Fonts.regular,
        color: Colors.black,
    } as TextStyle,

});