import { Image, View } from "react-native"
import { useMMKVObject } from "react-native-mmkv"
import { Text } from "react-native-paper"

import { translate } from "@locale"
import {
  CurrentWeatherData,
  STORAGE_KEYS,
  SearchCity,
  WeatherDescription,
} from "@services/storage"
import { styles } from "./styles"


export type WeatherSummaryData = {
  city: string
  timestamp: number
  weather: WeatherDescription[]
  currentTemperature: number
  perceivedTemperature: number
  temperatureMin: number
  temperatureMax: number
}


export interface WeatherSummaryProps {
  data?: WeatherSummaryData
  showDateTime?: boolean
}


export function WeatherSummary(props: WeatherSummaryProps) {


  const showDateTime = props.showDateTime ?? true

  const [citySearch] = useMMKVObject<SearchCity>(STORAGE_KEYS.SEARCH_CITY)
  const [currentWeather] = useMMKVObject<CurrentWeatherData>(
    STORAGE_KEYS.CURRENT_WEATHER
  )

  const weatherSummaryData: WeatherSummaryData | undefined = (() => {
    if (props.data) return props.data

    if (!currentWeather || !citySearch) {
      return undefined
    }

    return {
      city: citySearch.city,
      timestamp: citySearch.timestamp,
      weather: currentWeather.weather,
      currentTemperature: currentWeather.currentTemperature,
      perceivedTemperature: currentWeather.perceivedTemperature,
      temperatureMax: currentWeather.temperatureMax,
      temperatureMin: currentWeather.temperatureMin,
    }
  })()


  function getTemperature() {
    const temperature = weatherSummaryData?.currentTemperature
    if (temperature === undefined) return ""

    const temperatureString = temperature.toFixed(0)
    return `${temperatureString}°`
  }

  function getDateTime() {
    if (!weatherSummaryData) return ""

    const lastSearchDate = new Date(weatherSummaryData.timestamp)
    const date = lastSearchDate.toLocaleDateString()
    const time = lastSearchDate.toLocaleTimeString("default", {
      hour: "2-digit",
      minute: "2-digit",
    })

    return `${date} ${time}`
  }

  function getMinMaxTemperature() {
    const minTemperature = weatherSummaryData?.temperatureMin
    const maxTemperature = weatherSummaryData?.temperatureMax
    if (minTemperature === undefined || maxTemperature === undefined) return ""

    const minTemperatureString = minTemperature.toFixed()
    const maxTemperatureString = maxTemperature.toFixed()
    return `${minTemperatureString}° / ${maxTemperatureString}°`
  }

  function getPerceivedTemperature() {
    const perceivedTemperature = weatherSummaryData?.perceivedTemperature
    if (perceivedTemperature === undefined) return ""

    const perceivedTemperatureString = perceivedTemperature.toFixed()
    return `${perceivedTemperatureString}°`
  }


  if (!weatherSummaryData) return (
    <Text variant={"titleLarge"}>
      {translate("WeatherSummary_noDataAvailable")}
    </Text>
  )


  return (
    <View style={styles.currentStateContainer}>
      <View style={styles.currentTemperatureContainer}>
        <View>
          <Text variant={"displayLarge"} style={styles.temperature}>
            {getTemperature()}
          </Text>

          <Text variant={"titleMedium"} style={styles.description}>
            {weatherSummaryData.weather[0].description}
          </Text>
        </View>

        <Image
          source={{
            uri: `https://openweathermap.org/img/wn/${weatherSummaryData.weather[0].icon}@4x.png`,
            width: 100,
            height: 100,
          }}
        />
      </View>

      <View>
        <Text variant={"titleMedium"}>
          {weatherSummaryData.city}
          {" "}
          {showDateTime && (
            <>
              &bull;
              {getDateTime()}
            </>
          )}
        </Text>

        <View style={styles.temperaturesContainer}>
          <Text variant={"titleSmall"}>
            {getMinMaxTemperature()}
          </Text>

          <Text variant={"titleSmall"}>
            {translate("WeatherSummary_perceivedTemperature")}
            {" "}
            {getPerceivedTemperature()}
          </Text>
        </View>
      </View>
    </View>
  )
}
