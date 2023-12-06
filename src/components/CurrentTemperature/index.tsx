import { Image, View } from "react-native"
import { useMMKVObject } from "react-native-mmkv"
import { Text } from "react-native-paper"

import { CurrentWeatherData, STORAGE_KEYS, SearchCity } from "@services/storage"
import { styles } from "./styles"


export function CurrentTemperature() {


    const [citySearch, setCitySearch] = useMMKVObject<SearchCity>(STORAGE_KEYS.SEARCH_CITY)
    const [currentWeather, setCurrentWeather] = useMMKVObject<CurrentWeatherData>(STORAGE_KEYS.CURRENT_WEATHER)


    function getTemperature() {
        const temperature = currentWeather?.currentTemperature
        if (!temperature) return

        const temperatureString = temperature.toFixed(0)
        return `${temperatureString}°`
    }

    function getDateTime() {
        if (!citySearch) return

        const lastSearchDate = new Date(citySearch.timestamp)
        const date = lastSearchDate.toLocaleDateString()
        const time = lastSearchDate.toLocaleTimeString("default", {
            hour: "2-digit",
            minute: "2-digit",
        })

        return `${date} ${time}`
    }

    function getMinMaxTemperature() {
        const minTemperature = currentWeather?.temperatureMin
        const maxTemperature = currentWeather?.temperatureMax
        if (!minTemperature || !maxTemperature) return

        const minTemperatureString = minTemperature.toFixed()
        const maxTemperatureString = maxTemperature.toFixed()
        return `${minTemperatureString}° / ${maxTemperatureString}°`
    }

    function getPerceivedTemperature() {
        const perceivedTemperature = currentWeather?.perceivedTemperature
        if (!perceivedTemperature) return

        const perceivedTemperatureString = perceivedTemperature.toFixed()
        return `${perceivedTemperatureString}°`
    }


    return (
        <View style={styles.currentStateContainer}>
            <View style={styles.currentTemperatureContainer}>
                <View>
                    <Text variant={"displayLarge"} style={styles.temperature}>
                        {getTemperature()}
                    </Text>

                    <Text variant={"titleMedium"} style={styles.description}>
                        {currentWeather?.weather[0].description}
                    </Text>
                </View>

                <Image source={{
                    uri: `https://openweathermap.org/img/wn/${currentWeather?.weather[0].icon}@4x.png`,
                    width: 100,
                    height: 100,
                }} />
            </View>

            <View>
                <Text variant={"titleMedium"}>
                    {citySearch?.city} &bull; {getDateTime()}
                </Text>

                <View style={styles.temperaturesContainer}>
                    <Text variant={"titleSmall"}>
                        {getMinMaxTemperature()}
                    </Text>

                    <Text variant={"titleSmall"}>
                        {"Sensação térmica:"} {getPerceivedTemperature()}
                    </Text>
                </View>
            </View>
        </View>
    )
}
