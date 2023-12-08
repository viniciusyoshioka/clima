import { useNavigation, useRoute } from "@react-navigation/native"
import { ScrollView } from "react-native"
import { useMMKVObject } from "react-native-mmkv"
import { Appbar } from "react-native-paper"

import { TodayForecast, WeatherConditions, WeatherConditionsData, WeatherSummary, WeatherSummaryData } from "@components"
import { translate } from "@locale"
import { NavigationParamProps, RouteParamProps } from "@router"
import { CurrentWeatherData, ForecastWeatherData, STORAGE_KEYS, SearchCity } from "@services/storage"


export function Details() {


    const navigation = useNavigation<NavigationParamProps<"Details">>()
    const { params } = useRoute<RouteParamProps<"Details">>()

    const [citySearch] = useMMKVObject<SearchCity>(STORAGE_KEYS.SEARCH_CITY)
    const [currentWeather] = useMMKVObject<CurrentWeatherData>(STORAGE_KEYS.CURRENT_WEATHER)
    const [forecastWeather] = useMMKVObject<ForecastWeatherData>(STORAGE_KEYS.FORECAST_WEATHER)

    const weatherSummaryData: WeatherSummaryData | undefined = (() => {
        if (!citySearch || !currentWeather || !forecastWeather) return undefined

        if (params.type === "current") return {
            city: citySearch.city,
            timestamp: citySearch.timestamp,
            currentTemperature: currentWeather.currentTemperature,
            perceivedTemperature: currentWeather.perceivedTemperature,
            temperatureMin: currentWeather.temperatureMin,
            temperatureMax: currentWeather.temperatureMax,
            weather: currentWeather.weather,
        }

        const filteredForecastData = forecastWeather.list.reduce((previous, current, index) => {
            if (index === 0) return current

            const timestamp = params.timestamp ?? 0
            const previousDiff = Math.abs(timestamp - previous.dt)
            const currentDiff = Math.abs(timestamp - current.dt)

            if (currentDiff < previousDiff) return current
            return previous
        })

        return {
            city: forecastWeather.city.name,
            timestamp: filteredForecastData.dt * 1000,
            currentTemperature: filteredForecastData.main.temp,
            perceivedTemperature: filteredForecastData.main.feels_like,
            temperatureMin: filteredForecastData.main.temp_min,
            temperatureMax: filteredForecastData.main.temp_max,
            weather: filteredForecastData.weather,
        }
    })()

    const weatherConditionsData: WeatherConditionsData | undefined = (() => {
        if (!citySearch || !currentWeather || !forecastWeather) return undefined

        if (params.type === "current") return {
            timestamp: citySearch.timestamp,
            humidity: currentWeather.humidity,
            windSpeed: currentWeather.windSpeed,
            sunriseTimestamp: currentWeather.sunriseTimestamp,
            sunsetTimestamp: currentWeather.sunsetTimestamp,
        }

        const filteredForecastData = forecastWeather.list.reduce((previous, current, index) => {
            if (index === 0) return current

            const timestamp = params.timestamp ?? 0
            const previousDiff = Math.abs(timestamp - previous.dt)
            const currentDiff = Math.abs(timestamp - current.dt)

            if (currentDiff < previousDiff) return current
            return previous
        })

        return {
            timestamp: filteredForecastData.dt * 1000,
            humidity: filteredForecastData.main.humidity,
            windSpeed: filteredForecastData.wind.speed,
            sunriseTimestamp: forecastWeather.city.sunrise,
            sunsetTimestamp: forecastWeather.city.sunset,
            precipitationPercentage: filteredForecastData.pop,
        }
    })()


    function formatDate() {
        if (params.timestamp) {
            const date = new Date(params.timestamp * 1000)
            return date.toLocaleDateString()
        }

        if (!citySearch) return
        const date = new Date(citySearch.timestamp)
        return date.toLocaleDateString()
    }

    function formatTime() {
        if (params.timestamp) {
            const date = new Date(params.timestamp * 1000)
            return date.toLocaleTimeString("default", {
                hour: "2-digit",
                minute: "2-digit",
            })
        }

        if (!citySearch) return
        const date = new Date(citySearch.timestamp)
        return date.toLocaleTimeString("default", {
            hour: "2-digit",
            minute: "2-digit",
        })
    }


    return <>
        <Appbar.Header>
            <Appbar.BackAction onPress={navigation.goBack} />
            <Appbar.Content title={`${translate("Details_header_title")}: ${formatDate()} ${formatTime()}`} />
        </Appbar.Header>

        <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>
            <WeatherSummary data={weatherSummaryData} showDateTime={false} />

            <WeatherConditions data={weatherConditionsData} />

            <TodayForecast baseTimestmap={params.timestamp} />
        </ScrollView>
    </>
}
