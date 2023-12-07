import { Color, Prism } from "@elementium/color"
import { useNavigation } from "@react-navigation/native"
import { useMemo } from "react"
import { Image, Pressable, ScrollView, View, ViewStyle } from "react-native"
import { useMMKVObject } from "react-native-mmkv"
import { Divider, Text, useTheme } from "react-native-paper"
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons"

import { translate } from "@locale"
import { NavigationParamProps } from "@router"
import { ForecastWeatherData, STORAGE_KEYS, SearchCity } from "@services/storage"
import { styles } from "./styles"


export interface TodayForecastProps {
    baseTimestmap?: number
    showForecastAfterTimestamps?: number
    showForecastBeforeTimestamps?: number
}


export function TodayForecast(props: TodayForecastProps) {


    const { colors } = useTheme()

    const navigation = useNavigation<NavigationParamProps<"Home">>()

    const [citySearch] = useMMKVObject<SearchCity>(STORAGE_KEYS.SEARCH_CITY)
    const [forecastWeather] = useMMKVObject<ForecastWeatherData>(STORAGE_KEYS.FORECAST_WEATHER)
    const todayForecastWeather = useMemo(() => {
        if (!forecastWeather) return []

        const firstTimestamp = getFirstTimestamp()
        const lastTimestamp = getLastTimestamp()
        const baseTimestmap = getBaseTimestamp()

        return forecastWeather.filter(forecast => {
            const forecastTimestamp = forecast.dt * 1000

            const isAfter = forecastTimestamp >= firstTimestamp
            const isBefore = forecastTimestamp <= lastTimestamp
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
        if (props.showForecastAfterTimestamps) {
            return props.showForecastAfterTimestamps
        }

        const firstHour = new Date()
        firstHour.setMinutes(0, 0, 0)
        return firstHour.getTime()
    }

    function getLastTimestamp() {
        if (props.showForecastBeforeTimestamps) {
            return props.showForecastBeforeTimestamps
        }

        const tomorrow = new Date()
        tomorrow.setDate(tomorrow.getDate() + 1)
        tomorrow.setHours(0, 0, 0, 0)
        return tomorrow.getTime()
    }

    function getBaseTimestamp() {
        if (props.baseTimestmap) return props.baseTimestmap
        return new Date().getTime()
    }

    function goToDetails(timestamp: number) {
        navigation.navigate("Details", { type: "forecast", timestamp })
    }

    function HourForecastItem(data: ForecastWeatherData[0]) {
        const backgroundColor = new Color(colors.surface)
        const overlayColor = new Color("white").setA(0.3)
        const rippleColor = Prism.addColors(backgroundColor, overlayColor).toRgba()

        return (
            <Pressable
                style={styles.itemContainer}
                android_ripple={{ color: rippleColor, foreground: true }}
                onPress={() => goToDetails(data.dt)}
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
        <ScrollView
            style={containerStyle}
            contentContainerStyle={styles.contentContainer}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
        >
            {(todayForecastWeather.length > 0) && todayForecastWeather.map((forecast, index) => (
                <>
                    <HourForecastItem {...forecast} key={`${index}-item`} />

                    {(index < (todayForecastWeather.length - 1)) && (
                        <Divider
                            style={{
                                height: "100%",
                                width: 1,
                                backgroundColor: colors.onSurfaceDisabled,
                            }}
                            key={`${index}-divider`}
                        />
                    )}
                </>
            ))}

            {(todayForecastWeather.length === 0) && (
                <Text variant={"titleSmall"} style={{ color: colors.onSurface }} key={"no-forecast-alert"}>
                    {translate("TodayForecast_noTodayForecastAvailable")}
                </Text>
            )}
        </ScrollView>
    )
}
