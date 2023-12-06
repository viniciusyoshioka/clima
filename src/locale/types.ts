
export type TranslationKeyType =
    | "ok"

    // CurrentConditions
    | "CurrentConditions_humidity"
    | "CurrentConditions_wind"
    | "CurrentConditions_sunrise"
    | "CurrentConditions_sunset"
    // TodayForecast
    | "TodayForecast_noTodayForecastAvailable"

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


export type TranslationObjectType = {
    [key in TranslationKeyType]: string
}
