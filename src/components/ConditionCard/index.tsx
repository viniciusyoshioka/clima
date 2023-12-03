import { StyleSheet, View, ViewProps, ViewStyle } from "react-native"
import { Divider, Text, useTheme } from "react-native-paper"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

import { styles } from "./styles"


export interface ConditionCardProps extends ViewProps {
    icon: string
    title: string
    value: string
}


export function ConditionCard(props: ConditionCardProps) {


    const { colors } = useTheme()


    const style = StyleSheet.flatten(props.style)

    const cardStyle: ViewStyle = {
        ...styles.container,
        backgroundColor: colors.surface,
        ...style,
    }


    return (
        <View {...props} style={cardStyle}>
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
        </View>
    )
}
