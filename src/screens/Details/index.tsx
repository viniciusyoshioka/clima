import { useRoute } from "@react-navigation/native"
import { ScrollView } from "react-native"
import { useMMKVObject } from "react-native-mmkv"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { TodayForecast, WeatherConditions, WeatherConditionsData, WeatherSummary, WeatherSummaryData } from "@components"
import { RouteParamProps } from "@router"
import { CurrentWeatherData, ForecastWeatherData, STORAGE_KEYS, SearchCity } from "@services/storage"


export function Details() {


    const { params } = useRoute<RouteParamProps<"Details">>()
    const safeAreaInsets = useSafeAreaInsets()

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
        }
    })()


    return (
        <ScrollView
            style={{ marginTop: safeAreaInsets.top }}
            contentContainerStyle={{ padding: 16, gap: 16 }}
        >
            <WeatherSummary data={weatherSummaryData} showDateTime={false} />

            <WeatherConditions data={weatherConditionsData} />

            <TodayForecast baseTimestmap={params.timestamp} />
        </ScrollView>
    )
}
