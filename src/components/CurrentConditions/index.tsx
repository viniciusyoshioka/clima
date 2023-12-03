import { View } from "react-native"
import { useMMKVObject } from "react-native-mmkv"

import { translate } from "@locale"
import { CurrentWeatherData, STORAGE_KEYS } from "@services/storage"
import { ConditionCard } from "../ConditionCard"
import { styles } from "./styles"


export function CurrentConditions() {


    const [currentWeather, setCurrentWeather] = useMMKVObject<CurrentWeatherData>(STORAGE_KEYS.CURRENT_WEATHER)


    function getSunRise() {
        if (!currentWeather) return

        const sunriseDate = new Date(currentWeather.sunriseTimestamp * 1000)
        return sunriseDate.toLocaleTimeString("default", {
            hour: "2-digit",
            minute: "2-digit",
        })
    }

    function getSunSet() {
        if (!currentWeather) return

        const sunsetDate = new Date(currentWeather.sunsetTimestamp * 1000)
        return sunsetDate.toLocaleTimeString("default", {
            hour: "2-digit",
            minute: "2-digit",
        })
    }


    return (
        <View style={styles.container}>
            <View style={styles.conditionLine}>
                <ConditionCard
                    icon={"water"}
                    title={translate("CurrentConditions_humidity")}
                    value={`${currentWeather?.humidity}%`}
                />

                <ConditionCard
                    icon={"weather-windy"}
                    title={translate("CurrentConditions_wind")}
                    value={`${currentWeather?.windSpeed} m/s`}
                />
            </View>

            <View style={styles.conditionLine}>
                <ConditionCard
                    icon={"weather-sunset-up"}
                    title={translate("CurrentConditions_sunrise")}
                    value={`${getSunRise()}`}
                />

                <ConditionCard
                    icon={"weather-sunset-down"}
                    title={translate("CurrentConditions_sunset")}
                    value={`${getSunSet()}`}
                />
            </View>
        </View>
    )
}
