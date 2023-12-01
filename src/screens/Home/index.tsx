import { useEffect } from "react"
import { Alert, View } from "react-native"
import { useMMKV, useMMKVObject } from "react-native-mmkv"

import { CurrentWeatherResponse, OPEN_WEATHER_MAP, openWeatherMap } from "@api"
import { translate } from "@locale"
import { CurrentWeatherData, STORAGE_KEYS, SearchCity } from "@services/storage"
import { LocationInput } from "./LocationInput"
import { styles } from "./styles"


export function Home() {


    const mmkv = useMMKV()
    const [currentWeather, setCurrentWeather] = useMMKVObject<CurrentWeatherData>(STORAGE_KEYS.CURRENT_WEATHER)


    async function getWeatherData(search: SearchCity) {
        const { latitude, longitude } = search
        const params = { lat: latitude, lon: longitude }

        try {
            const response = await openWeatherMap.get(OPEN_WEATHER_MAP.routes.currentWeather, { params })
            const data = response.data as CurrentWeatherResponse

            setCurrentWeather({
                weather: data.weather,

                currentTemperature: data.main.temp,
                perceivedTemperature: data.main.feels_like,
                temperatureMin: data.main.temp_min,
                temperatureMax: data.main.temp_max,

                humidity: data.main.humidity,

                sunriseTimestamp: data.sys.sunrise,
                sunsetTimestamp: data.sys.sunset,

                windSpeed: data.wind.speed,
            })
        } catch (error) {
            Alert.alert(
                translate("Home_errorGettingCurrentWeatherData_title"),
                translate("Home_errorGettingCurrentWeatherData_message")
            )
        }
    }


    useEffect(() => {
        const listener = mmkv.addOnValueChangedListener(async key => {
            if (key === STORAGE_KEYS.SEARCH_CITY) {
                const stringifiedCitySearch = mmkv.getString(STORAGE_KEYS.SEARCH_CITY)
                if (!stringifiedCitySearch) return

                const objectCitySearch = JSON.parse(stringifiedCitySearch) as SearchCity
                await getWeatherData(objectCitySearch)
            }
        })

        return () => listener.remove()
    }, [])


    return (
        <View style={styles.container}>
            <LocationInput />
        </View>
    )
}
