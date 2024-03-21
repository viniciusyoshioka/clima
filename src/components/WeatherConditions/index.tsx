import { useNavigation, useRoute } from "@react-navigation/native"
import { View } from "react-native"
import { useMMKVObject } from "react-native-mmkv"
import { Text } from "react-native-paper"

import { translate } from "@locale"
import { NavigationParamProps } from "@router"
import { CurrentWeatherData, STORAGE_KEYS, SearchCity } from "@services/storage"
import { ConditionCard } from "../ConditionCard"
import { styles } from "./styles"


export type WeatherConditionsData = {
    timestamp: number
    humidity: number
    windSpeed: number
    sunriseTimestamp: number
    sunsetTimestamp: number
    precipitationPercentage?: number
}


export interface WeatherConditionsProps {
    data?: WeatherConditionsData
}


export function WeatherConditions(props: WeatherConditionsProps) {


    const navigation = useNavigation<NavigationParamProps<"Home">>()
    const { name } = useRoute()

    const disableNavigation = name === "Details"
    const [citySearch] = useMMKVObject<SearchCity>(STORAGE_KEYS.SEARCH_CITY)
    const [currentWeather] = useMMKVObject<CurrentWeatherData>(
        STORAGE_KEYS.CURRENT_WEATHER
    )

    const weatherConditionsData: WeatherConditionsData | undefined = (() => {
        if (props.data) return props.data

        if (!currentWeather || !citySearch) {
            return undefined
        }

        return {
            timestamp: citySearch.timestamp,
            humidity: currentWeather.humidity,
            windSpeed: currentWeather.windSpeed,
            sunriseTimestamp: currentWeather.sunriseTimestamp,
            sunsetTimestamp: currentWeather.sunsetTimestamp,
        }
    })()


    function getSunRise() {
        if (!weatherConditionsData) return ""

        const sunriseDate = new Date(weatherConditionsData.sunriseTimestamp * 1000)
        return sunriseDate.toLocaleTimeString("default", {
            hour: "2-digit",
            minute: "2-digit",
        })
    }

    function getSunSet() {
        if (!weatherConditionsData) return ""

        const sunsetDate = new Date(weatherConditionsData.sunsetTimestamp * 1000)
        return sunsetDate.toLocaleTimeString("default", {
            hour: "2-digit",
            minute: "2-digit",
        })
    }

    function getPrecipitationPercentage() {
        if (!weatherConditionsData)
            return ""
        if (weatherConditionsData.precipitationPercentage == undefined)
            return ""

        const percentagePrecipitation = (
            weatherConditionsData.precipitationPercentage * 100
        )
        const normalizedPrecipitation = percentagePrecipitation.toFixed(0)
        return `${normalizedPrecipitation}%`
    }

    function goToDetails() {
        if (disableNavigation) return
        if (!weatherConditionsData) return

        if (props.data) {
            navigation.navigate("Details", {
                type: "forecast",
                timestamp: weatherConditionsData.timestamp,
            })
        } else {
            navigation.navigate("Details", { type: "current" })
        }
    }


    if (!weatherConditionsData) return (
        <Text variant={"titleLarge"}>
            {translate("WeatherConditions_noData")}
        </Text>
    )


    return (
        <View style={styles.container}>
            <View style={styles.conditionLine}>
                <ConditionCard
                    icon={"water"}
                    title={translate("WeatherConditions_humidity")}
                    value={`${currentWeather?.humidity}%`}
                    onPress={goToDetails}
                    disabled={disableNavigation}
                />

                <ConditionCard
                    icon={"weather-windy"}
                    title={translate("WeatherConditions_wind")}
                    value={`${currentWeather?.windSpeed} m/s`}
                    onPress={goToDetails}
                    disabled={disableNavigation}
                />
            </View>

            <View style={styles.conditionLine}>
                <ConditionCard
                    icon={"weather-sunset-up"}
                    title={translate("WeatherConditions_sunrise")}
                    value={`${getSunRise()}`}
                    onPress={goToDetails}
                    disabled={disableNavigation}
                />

                <ConditionCard
                    icon={"weather-sunset-down"}
                    title={translate("WeatherConditions_sunset")}
                    value={`${getSunSet()}`}
                    onPress={goToDetails}
                    disabled={disableNavigation}
                />
            </View>

            {(weatherConditionsData.precipitationPercentage !== undefined) && (
                <View style={styles.conditionLine}>
                    <ConditionCard
                        icon={"weather-pouring"}
                        title={translate("WeatherConditions_rainChance")}
                        value={`${getPrecipitationPercentage()}`}
                        onPress={goToDetails}
                        disabled={disableNavigation}
                    />
                </View>
            )}
        </View>
    )
}
