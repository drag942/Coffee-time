import React from "react";
import {PureComponent} from "react";
import {Text, TextInput, TextInputProps, TextStyle, View, ViewStyle} from "react-native";
import {styleSheetCreate} from "../../../common/utils";
import {Colors, Fonts} from "../../../core/theme";

interface IProps extends TextInputProps {
    label: string;
    error: string;
}

export class AuthInput extends PureComponent<IProps> {
        render(): JSX.Element {
            const {label, error, style} = this.props;

            return(
                <View style={styles.container}>
                    <Text style={styles.label}>{label}</Text>
                    <TextInput
                        {...this.props}
                        style={style != null ? [styles.input, style] : styles.input}
                    />
                    <Text style={styles.error}>{error}</Text>
                </View>
            );
        }
}

const styles = styleSheetCreate({
    container: {
        alignItems: "flex-start",
        justifyContent: "flex-start",
    } as ViewStyle,
    label: {
        color: Colors.black,
        fontFamily: Fonts.regular,
        fontSize: 12,
    } as TextStyle,
    input: {
        color: Colors.black,
        fontFamily: Fonts.regular,
        fontSize: 12,
    }as TextStyle,
    error: {
        color: Colors.paleRed,
        fontFamily: Fonts.regular,
        fontSize: 12,
    }as TextStyle
});