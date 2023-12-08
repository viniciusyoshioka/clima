
export type TranslationKeyType =
    | "ok"

    // TodayForecast
    | "TodayForecast_noTodayForecastAvailable"
    // WeatherConditions
    | "WeatherConditions_noData"
    | "WeatherConditions_humidity"
    | "WeatherConditions_wind"
    | "WeatherConditions_sunrise"
    | "WeatherConditions_sunset"
    | "WeatherConditions_rainChance"
    // WeatherSummary
    | "WeatherSummary_noDataAvailable"
    | "WeatherSummary_perceivedTemperature"
    // WeekForecast
    | "WeekForecast_noWeekForecastAvailable"

    // Home
    | "Home_errorGettingCurrentWeatherData_title"
    | "Home_errorGettingCurrentWeatherData_message"
    | "Home_errorGettingForecastWeatherData_title"
    | "Home_errorGettingForecastWeatherData_message"
    // LocationInput
    | "LocationInput_noLocationPermission_title"
    | "LocationInput_noLocationPermission_message"
    | "LocationInput_errorGettingLocation_title"
    | "LocationInput_errorGettingLocation_message"
    | "LocationInput_couldNotGetAddressFromCoordinates_title"
    | "LocationInput_couldNotGetAddressFromCoordinates_message"
    | "LocationInput_errorGettingAddressFromCoordinates_title"
    | "LocationInput_errorGettingAddressFromCoordinates_message"
    | "LocationInput_cityNameMustNotBeEmpty_title"
    | "LocationInput_cityNameMustNotBeEmpty_message"
    | "LocationInput_couldNotGetLocationCoordinatesFromAddress_title"
    | "LocationInput_couldNotGetLocationCoordinatesFromAddress_message"
    | "LocationInput_errorGettingLocationCoordinatesFromAddress_title"
    | "LocationInput_errorGettingLocationCoordinatesFromAddress_message"
    | "LocationInput_placeholder"

    // Details
    | "Details_header_title"


export type TranslationObjectType = {
    [key in TranslationKeyType]: string
}
