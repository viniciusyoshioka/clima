import { useEffect } from "react"
import { Alert } from "react-native"
import { useMMKV, useMMKVObject } from "react-native-mmkv"

import {
  CurrentWeatherResponse,
  ForecastResponse,
  OPEN_WEATHER_MAP,
  openWeatherMap,
} from "@api"
import { translate } from "@locale"
import {
  CurrentWeatherData,
  ForecastWeatherData,
  STORAGE_KEYS,
  SearchCity,
} from "@services/storage"
import { LocationInput } from "./LocationInput"
import { WeatherData } from "./WeatherData"


export function Home() {


  const mmkv = useMMKV()
  const [citySearch, setCitySearch] = useMMKVObject<SearchCity>(
    STORAGE_KEYS.SEARCH_CITY
  )
  const [, setCurrentWeather] = useMMKVObject<CurrentWeatherData>(
    STORAGE_KEYS.CURRENT_WEATHER
  )
  const [, setForecastWeather] = useMMKVObject<ForecastWeatherData>(
    STORAGE_KEYS.FORECAST_WEATHER
  )


  async function getWeatherData(search: SearchCity) {
    try {
      await getCurrentWeatherData(search)
    } catch (error) {
      Alert.alert(
        translate("Home_errorGettingCurrentWeatherData_title"),
        translate("Home_errorGettingCurrentWeatherData_message")
      )
      return
    }

    try {
      await getForecastWeatherData(search)
    } catch (error) {
      Alert.alert(
        translate("Home_errorGettingForecastWeatherData_title"),
        translate("Home_errorGettingForecastWeatherData_message")
      )
    }
  }

  async function getCurrentWeatherData(search: SearchCity) {
    const { latitude, longitude } = search
    const params = { lat: latitude, lon: longitude }

    const response = await openWeatherMap.get(
      OPEN_WEATHER_MAP.routes.currentWeather,
      { params }
    )
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
  }

  async function getForecastWeatherData(search: SearchCity) {
    const daysToForecast = 5
    const hoursToForecastPerDay = 24 / 3
    const amountOfTimestamps = daysToForecast * hoursToForecastPerDay

    const { latitude, longitude } = search
    const params = { lat: latitude, lon: longitude, cnt: amountOfTimestamps }

    const response = await openWeatherMap.get(
      OPEN_WEATHER_MAP.routes.forecast,
      { params }
    )
    const data = response.data as ForecastResponse

    setForecastWeather(data)
  }


  useEffect(() => {
    if (!citySearch) return

    const lastSearch = citySearch.timestamp
    const now = Date.now()
    const differenceInMs = now - lastSearch
    const differenceInMin = differenceInMs / 1000 / 60
    if (differenceInMin > 1) {
      setCitySearch({ ...citySearch, timestamp: now })
      getWeatherData(citySearch)
    }
  }, [])

  useEffect(() => {
    const listener = mmkv.addOnValueChangedListener(async key => {
      if (key === STORAGE_KEYS.SEARCH_CITY) {
        const stringifiedCitySearch = mmkv.getString(STORAGE_KEYS.SEARCH_CITY)
        if (stringifiedCitySearch === undefined) return

        const objectCitySearch = JSON.parse(stringifiedCitySearch) as SearchCity
        await getWeatherData(objectCitySearch)
      }
    })

    return () => listener.remove()
  }, [])


  return (
    <>
      <LocationInput />

      <WeatherData />
    </>
  )
}
