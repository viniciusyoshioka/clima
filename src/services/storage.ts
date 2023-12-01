
export enum STORAGE_KEYS {
    SEARCH_CITY = "search_city",
    CURRENT_WEATHER = "current_weather",
}


export interface SearchCity {
    city: string
    latitude: number
    longitude: number
    timestamp: number
}


export interface CurrentWeatherData {
    weather: {
        id: number
        main: string
        description: string
        icon: string
    }

    currentTemperature: number
    perceivedTemperature: number
    temperatureMin: number
    temperatureMax: number

    humidity: number

    sunriseTimestamp: number
    sunsetTimestamp: number

    windSpeed: number
}
