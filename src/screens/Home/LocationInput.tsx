import { Color, Prism } from "@elementium/color"
import { useState } from "react"
import { Alert, Pressable, PressableAndroidRippleConfig, StyleProp, StyleSheet, TextInput, TextStyle, View, ViewStyle } from "react-native"
import { GeoPosition } from "react-native-geolocation-service"
import { useMMKVObject } from "react-native-mmkv"
import { Icon, useTheme } from "react-native-paper"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { GeocodingResponse, OPEN_WEATHER_MAP, openWeatherMap } from "@api"
import { Geolocation } from "@services/geolocation"
import { Permissions } from "@services/permissions"
import { STORAGE_KEYS, SearchCity } from "@services/storage"


export interface LocationInputProps {
    wrapperStyle?: StyleProp<ViewStyle>
}


export function LocationInput(props: LocationInputProps) {


    const safeAreaInsets = useSafeAreaInsets()
    const { colors, fonts } = useTheme()

    const [text, setText] = useState("")
    const hasText = text !== undefined && text.length > 0
    const [citySearch, setCitySearch] = useMMKVObject<SearchCity>(STORAGE_KEYS.SEARCH_CITY)


    const flattenWrapperStyle = StyleSheet.flatten(props.wrapperStyle)
    const wrapperStyle: ViewStyle = {
        ...styles.wrapper,
        marginTop: styles.wrapper.margin + safeAreaInsets.top,
        backgroundColor: colors.surfaceVariant,
        ...flattenWrapperStyle,
    }

    const inputStyle: TextStyle = {
        ...styles.input,
        ...fonts.titleMedium,
        color: colors.onSurface,
    }


    const buttonBackgroundColor = new Color(colors.surfaceVariant)
    const buttonOverlay = new Color("white").setA(0.2)
    const buttonRipple = Prism.addColors(buttonBackgroundColor, buttonOverlay).toRgba()
    const ripple: PressableAndroidRippleConfig = { color: buttonRipple, radius: 28 }


    function GetLocationButton() {
        return (
            <Pressable style={styles.button} onPress={getLocationByGps} android_ripple={ripple}>
                <Icon source={"map-marker-outline"} size={24} />
            </Pressable>
        )
    }

    function SearchLocationButton() {
        return (
            <Pressable style={styles.button} onPress={getLocationBySearch} android_ripple={ripple}>
                <Icon source={"send"} size={24} />
            </Pressable>
        )
    }


    async function getLocationByGps() {
        const locationCoordinates = await getLocationCoordinates()
        if (!locationCoordinates) return

        const locationAddress = await getLocationAddressFromCoordinates(locationCoordinates)
        if (!locationAddress) return

        const { coords, timestamp } = locationCoordinates
        const { latitude, longitude } = coords
        const city = locationAddress.name

        setText(city)
        setCitySearch({ city, latitude, longitude, timestamp })
    }

    async function getLocationCoordinates(): Promise<GeoPosition | undefined> {
        const hasLocationPermission = await Permissions.requestFineLocation()
        if (!hasLocationPermission) {
            Alert.alert(
                "Não foi possível obter a sua localização",
                "O uso do GPS é necessário para o funcionamento do aplicativo e sua permissão não foi concedida."
            )
            return
        }

        try {
            return await Geolocation.getCurrentPosition()
        } catch (error) {
            Alert.alert(
                "Não foi possível obter a sua localização",
                "Houve um erro ao obter a localização atual do GPS."
            )
        }
        return
    }

    async function getLocationAddressFromCoordinates(coordinates: GeoPosition): Promise<GeocodingResponse | undefined> {
        const params = {
            lat: coordinates.coords.latitude,
            lon: coordinates.coords.longitude,
        }

        try {
            const response = await openWeatherMap.get(OPEN_WEATHER_MAP.routes.reverseGeocoding, { params })
            const data = response.data as GeocodingResponse[]
            if (data.length === 0) {
                Alert.alert(
                    "Não foi possível obter a sua localização",
                    "Não foi possível obter a sua cidade com base na localização do GPS"
                )
                return
            }

            return data[0]
        } catch (error) {
            Alert.alert(
                "Não foi possível obter a sua localização",
                "Houve um erro ao obter a sua cidade com base na localização do GPS."
            )
            return
        }
    }


    async function getLocationBySearch() {
        if (text === undefined || text.length === 0) {
            Alert.alert(
                "Não foi possível pesquisar localização",
                "O nome da cidade não pode ser vazio."
            )
            return
        }

        const locationCoordinates = await getLocationCoordinatesFromAddress(text)
        if (!locationCoordinates) return

        const city = locationCoordinates.name
        const latitude = locationCoordinates.lat
        const longitude = locationCoordinates.lon
        const timestamp = Date.now()

        setCitySearch({ city, latitude, longitude, timestamp })
    }

    async function getLocationCoordinatesFromAddress(cityName: string): Promise<GeocodingResponse | undefined> {
        const params = { q: cityName }

        try {
            const response = await openWeatherMap.get(OPEN_WEATHER_MAP.routes.geocoding, { params })
            const data = response.data as GeocodingResponse[]
            if (data.length === 0) {
                Alert.alert(
                    "Não foi possível obter a sua localização",
                    "Não foi possível obter suas coordenadas com base na cidade fornecida."
                )
                return
            }

            return data[0]
        } catch (error) {
            Alert.alert(
                "Não foi possível obter a sua localização",
                "Houve um erro ao obter suas coordenadas com base no nome da cidade fornecida."
            )
            return
        }
    }


    return (
        <View style={wrapperStyle}>
            <TextInput
                defaultValue={citySearch?.city}
                value={text}
                onChangeText={setText}
                selectTextOnFocus={true}
                placeholder={"Pesquisar cidade"}
                selectionColor={colors.primaryContainer}
                cursorColor={colors.primary}
                placeholderTextColor={colors.onSurfaceVariant}
                onSubmitEditing={getLocationBySearch}
                style={inputStyle}
            />

            {!hasText && <GetLocationButton />}

            {hasText && <SearchLocationButton />}
        </View>
    )
}


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
