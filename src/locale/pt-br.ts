/* eslint-disable camelcase */
import { TranslationObjectType } from "./types"


export const pt_br: TranslationObjectType = {
    ok: "Ok",

    // TodayForecast
    TodayForecast_noTodayForecastAvailable: "Previsão do tempo não disponível para hoje",
    // WeatherConditions
    WeatherConditions_noData: "Condições do clima não disponíveis",
    WeatherConditions_humidity: "Humidade",
    WeatherConditions_wind: "Vento",
    WeatherConditions_sunrise: "Nascer do Sol",
    WeatherConditions_sunset: "Por do Sol",
    WeatherConditions_rainChance: "Chance de chuva",
    // WeatherSummary
    WeatherSummary_noDataAvailable: "Dados de temperatura não disponíveis",
    WeatherSummary_perceivedTemperature: "Sensação térmica",
    // WeekForecast
    WeekForecast_noWeekForecastAvailable: "Previsão do tempo não disponível para esta semana",

    // Home
    Home_errorGettingCurrentWeatherData_title: "Não foi possível obter os dados do clima",
    Home_errorGettingCurrentWeatherData_message: "Houve um erro ao obter os dados mais atuais do clima. Verifique sua conexão com a Internet ou tente novamente mais tarde.",
    Home_errorGettingForecastWeatherData_title: "Não foi possível obter os dados do clima",
    Home_errorGettingForecastWeatherData_message: "Houve um erro ao obter os dados mais atuais da previsão do tempo para hoje. Verifique sua conexão com a Internet ou tente novamente mais tarde.",
    // LocationInput
    LocationInput_noLocationPermission_title: "Não foi possível obter a sua localização",
    LocationInput_noLocationPermission_message: "O uso do GPS é necessário para o funcionamento do aplicativo e sua permissão não foi concedida.",
    LocationInput_errorGettingLocation_title: "Não foi possível obter a sua localização",
    LocationInput_errorGettingLocation_message: "Houve um erro ao obter a localização atual do GPS.",
    LocationInput_couldNotGetAddressFromCoordinates_title: "Não foi possível obter a sua localização",
    LocationInput_couldNotGetAddressFromCoordinates_message: "Não foi possível obter a sua cidade com base na localização do GPS",
    LocationInput_errorGettingAddressFromCoordinates_title: "Não foi possível obter a sua localização",
    LocationInput_errorGettingAddressFromCoordinates_message: "Houve um erro ao obter a sua cidade com base na localização do GPS.",
    LocationInput_cityNameMustNotBeEmpty_title: "Não foi possível pesquisar localização",
    LocationInput_cityNameMustNotBeEmpty_message: "O nome da cidade não pode ser vazio.",
    LocationInput_couldNotGetLocationCoordinatesFromAddress_title: "Não foi possível obter a sua localização",
    LocationInput_couldNotGetLocationCoordinatesFromAddress_message: "Não foi possível obter suas coordenadas com base na cidade fornecida.",
    LocationInput_errorGettingLocationCoordinatesFromAddress_title: "Não foi possível obter a sua localização",
    LocationInput_errorGettingLocationCoordinatesFromAddress_message: "Houve um erro ao obter suas coordenadas com base no nome da cidade fornecida.",
    LocationInput_placeholder: "Pesquisar cidade",
}
