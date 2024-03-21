import axios from "axios"

import { OPEN_WEATHER_MAP_API_KEY } from "@env"
import { getDeviceLanguageCode } from "@locale"


export const openWeatherMap = axios.create({
  baseURL: "https://api.openweathermap.org",
  params: {
    appid: OPEN_WEATHER_MAP_API_KEY,
    limit: 1,
    units: "metric",
    lang: getDeviceLanguageCode(),
  },
})
