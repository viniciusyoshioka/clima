import { Pressable, PressableProps, StyleSheet, View, ViewStyle } from "react-native"
import { Divider, Text, useTheme } from "react-native-paper"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

import { Color, Prism } from "@elementium/color"
import { styles } from "./styles"


export interface ConditionCardProps extends PressableProps {
    icon: string
    title: string
    value: string
}


export function ConditionCard(props: ConditionCardProps) {


    const { colors } = useTheme()


    const style = StyleSheet.flatten(props.style)

    const backgroundColor = new Color(colors.surface)
    const overlayColor = new Color("white").setA(0.3)
    const rippleColor = Prism.addColors(backgroundColor, overlayColor).toRgba()

    const cardStyle: ViewStyle = {
        ...styles.container,
        backgroundColor: backgroundColor.toRgba(),
        ...style,
    }


    return (
        <Pressable
            android_ripple={{ color: rippleColor, foreground: true }}
            {...props}
            style={cardStyle}
        >
            <MaterialCommunityIcons
                name={props.icon}
                size={32}
                color={colors.onSurface}
                style={{ flex: 1 }}
            />

            <Divider style={styles.divider} />

            <View style={styles.infoContainer}>
                <Text variant={"titleMedium"}>
                    {props.title}
                </Text>

                <Text variant={"titleSmall"}>
                    {props.value}
                </Text>
            </View>
        </Pressable>
    )
}
