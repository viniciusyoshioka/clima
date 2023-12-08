import { Color, Prism } from "@elementium/color"
import { useNavigation, useRoute } from "@react-navigation/native"
import { useMemo } from "react"
import { FlatList, Image, Pressable, View, ViewStyle } from "react-native"
import { useMMKVObject } from "react-native-mmkv"
import { Divider, Text, useTheme } from "react-native-paper"
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons"

import { translate } from "@locale"
import { NavigationParamProps } from "@router"
import { ForecastWeatherData, STORAGE_KEYS, SearchCity } from "@services/storage"
import { styles } from "./styles"


export interface TodayForecastProps {
    baseTimestmap?: number
}


export function TodayForecast(props: TodayForecastProps) {


    const { colors } = useTheme()

    const navigation = useNavigation<NavigationParamProps<"Home">>()
    const { name } = useRoute()

    const disableNavigation = name === "Details"
    const [citySearch] = useMMKVObject<SearchCity>(STORAGE_KEYS.SEARCH_CITY)
    const [forecastWeather] = useMMKVObject<ForecastWeatherData>(STORAGE_KEYS.FORECAST_WEATHER)
    const todayForecastWeather = useMemo(() => {
        if (!forecastWeather) return []

        const firstTimestamp = getFirstTimestamp()
        const lastTimestamp = getLastTimestamp()
        const baseTimestmap = getBaseTimestamp()

        return forecastWeather.list.filter(forecast => {
            const forecastTimestamp = forecast.dt * 1000

            const isAfter = forecastTimestamp >= firstTimestamp
            const isBefore = forecastTimestamp < lastTimestamp
            const forecastDate = new Date(forecastTimestamp)
            const baseDate = new Date(baseTimestmap)
            const isSameDay = forecastDate.getDate() === baseDate.getDate()
            const isNextDay = forecastDate.getDate() === (baseDate.getDate() + 1)
            const isMidnight = isNextDay && (forecastDate.getHours() === 0)

            if (isAfter && isBefore && (isSameDay || isMidnight)) {
                return true
            }
            return false
        })
    }, [forecastWeather, citySearch?.timestamp])


    function getFirstTimestamp() {
        if (props.baseTimestmap) {
            const baseDate = new Date(props.baseTimestmap * 1000)
            baseDate.setHours(0, 0, 0, 0)
            return baseDate.getTime()
        }

        const firstHour = new Date()
        firstHour.setMinutes(0, 0, 0)
        return firstHour.getTime()
    }

    function getLastTimestamp() {
        if (props.baseTimestmap) {
            const baseDate = new Date(props.baseTimestmap * 1000)
            baseDate.setDate(baseDate.getDate() + 1)
            baseDate.setHours(0, 0, 0, 0)
            return baseDate.getTime()
        }

        const tomorrow = new Date()
        tomorrow.setDate(tomorrow.getDate() + 1)
        tomorrow.setHours(0, 0, 0, 0)
        return tomorrow.getTime()
    }

    function getBaseTimestamp() {
        if (props.baseTimestmap) return props.baseTimestmap * 1000
        return new Date().getTime()
    }

    function goToDetails(timestamp: number) {
        if (disableNavigation) return

        navigation.navigate("Details", { type: "forecast", timestamp })
    }

    function HourForecastItem(data: ForecastWeatherData["list"][0]) {
        const backgroundColor = new Color(colors.surface)
        const overlayColor = new Color("white").setA(0.3)
        const rippleColor = Prism.addColors(backgroundColor, overlayColor).toRgba()

        return (
            <Pressable
                style={styles.itemContainer}
                android_ripple={{ color: rippleColor, foreground: true }}
                onPress={() => goToDetails(data.dt)}
                disabled={disableNavigation}
            >
                <Text variant={"titleSmall"} style={{ color: colors.onSurface }}>
                    {formatForecastTimestamp(data.dt)}
                </Text>

                <Image
                    source={{
                        uri: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
                        width: 40,
                        height: 40,
                    }}
                    style={styles.itemIcon}
                />

                <Text variant={"titleSmall"} style={{ color: colors.onSurface }}>
                    {formatForecastTemperature(data.main.temp)}
                </Text>

                <View style={styles.itemPrecipitationContainer}>
                    <MaterialCommunityIcon
                        name={"weather-pouring"}
                        size={16}
                        color={colors.onSurface}
                    />

                    <Text variant={"titleSmall"} style={{ color: colors.onSurface }}>
                        {formatForecastPrecipitation(data.pop)}
                    </Text>
                </View>
            </Pressable>
        )
    }

    function formatForecastTimestamp(timestamp: number) {
        const forecastDate = new Date(timestamp * 1000)
        return forecastDate.toLocaleTimeString("default", {
            hour: "2-digit",
            minute: "2-digit",
        })
    }

    function formatForecastTemperature(temperature: number) {
        const stringTemperature = temperature.toFixed(0)
        return `${stringTemperature}°`
    }

    function formatForecastPrecipitation(precipitation: number) {
        const percentagePrecipitation = precipitation * 100
        const normalizedPrecipitation = percentagePrecipitation.toFixed(0)
        return `${normalizedPrecipitation}%`
    }


    const containerStyle: ViewStyle = {
        ...styles.container,
        backgroundColor: colors.surface,
    }


    return (
        <FlatList
            data={todayForecastWeather}
            renderItem={({ item }) => <HourForecastItem {...item} />}
            ItemSeparatorComponent={() => (
                <Divider style={{
                    height: "100%",
                    width: 1,
                    backgroundColor: colors.onSurfaceDisabled,
                }} />
            )}
            ListEmptyComponent={() => (
                <Text
                    variant={"titleSmall"}
                    style={{ color: colors.onSurface }}
                    children={translate("TodayForecast_noTodayForecastAvailable")}
                />
            )}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={containerStyle}
            contentContainerStyle={styles.contentContainer}
        />
    )
}
