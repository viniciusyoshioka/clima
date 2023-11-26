import { Color, Prism } from "@elementium/color"
import { ForwardedRef, forwardRef, useState } from "react"
import { Pressable, PressableAndroidRippleConfig, StyleProp, StyleSheet, TextInput, TextInputProps, TextStyle, View, ViewStyle } from "react-native"
import { Icon, useTheme } from "react-native-paper"
import { useSafeAreaInsets } from "react-native-safe-area-context"


export interface LocationInputProps extends TextInputProps {
    searchLocation?: () => void
    getLocation?: () => void
    wrapperStyle?: StyleProp<ViewStyle>
}


export const LocationInput = forwardRef((props: LocationInputProps, ref: ForwardedRef<TextInput>) => {


    const safeAreaInsets = useSafeAreaInsets()
    const { colors, fonts } = useTheme()

    const [text, setText] = useState("")


    const flattenWrapperStyle = StyleSheet.flatten(props.wrapperStyle)
    const wrapperStyle: ViewStyle = {
        ...styles.wrapper,
        marginTop: styles.wrapper.margin + safeAreaInsets.top,
        backgroundColor: colors.surfaceVariant,
        ...flattenWrapperStyle,
    }

    const flattenInputStyle = StyleSheet.flatten(props.style)
    const inputStyle: TextStyle = {
        ...styles.input,
        ...fonts.titleMedium,
        color: colors.onSurface,
        ...flattenInputStyle,
    }


    const buttonBackgroundColor = new Color(colors.surfaceVariant)
    const buttonOverlay = new Color("white").setA(0.2)
    const buttonRipple = Prism.addColors(buttonBackgroundColor, buttonOverlay).toRgba()
    const ripple: PressableAndroidRippleConfig = { color: buttonRipple, radius: 28 }


    const baseValue = props.value ?? text
    const hasValue = baseValue !== undefined && baseValue.length > 0


    function SearchLocationButton() {
        return (
            <Pressable
                style={styles.button}
                onPress={props.searchLocation}
                android_ripple={ripple}
            >
                <Icon source={"send"} size={24} />
            </Pressable>
        )
    }

    function GetLocationButton() {
        return (
            <Pressable
                style={styles.button}
                onPress={props.getLocation}
                android_ripple={ripple}
            >
                <Icon source={"map-marker-outline"} size={24} />
            </Pressable>
        )
    }


    return (
        <View style={wrapperStyle}>
            <TextInput
                selectTextOnFocus={true}
                placeholder={"Pesquisar cidade"}
                selectionColor={colors.primaryContainer}
                cursorColor={colors.primary}
                placeholderTextColor={colors.onSurfaceVariant}
                {...props}
                ref={ref}
                value={props.value ?? text}
                onChangeText={props.onChangeText ?? setText}
                style={inputStyle}
            />

            {hasValue && (
                <SearchLocationButton />
            )}

            {!hasValue && (
                <GetLocationButton />
            )}
        </View>
    )
})


const styles = StyleSheet.create({
    wrapper: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        maxHeight: 56,
        margin: 16,
        gap: 8,
        paddingLeft: 16,
        borderRadius: 100,
    },
    input: {
        flex: 1,
        width: "100%",
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        width: 56,
        height: 56,
        borderRadius: 100,
    },
})
