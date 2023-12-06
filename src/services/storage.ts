import { ForecastResponse } from "@api"


export enum STORAGE_KEYS {
    SEARCH_CITY = "search_city",
    CURRENT_WEATHER = "current_weather",
    FORECAST_WEATHER = "forecast_weather",
}


export interface SearchCity {
    city: string
    latitude: number
    longitude: number
    timestamp: number
}


type WeatherDescription = {
    id: number
    main: string
    description: string
    icon: string
}

export interface CurrentWeatherData {
    weather: WeatherDescription[]

    currentTemperature: number
    perceivedTemperature: number
    temperatureMin: number
    temperatureMax: number

    humidity: number

    sunriseTimestamp: number
    sunsetTimestamp: number

    windSpeed: number
}


export type ForecastWeatherData = ForecastResponse["list"]
