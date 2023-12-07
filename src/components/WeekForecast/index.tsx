/* eslint-disable camelcase */
import { useMemo } from "react"
import { View, ViewStyle } from "react-native"
import { useMMKVObject } from "react-native-mmkv"
import { Divider, Text, useTheme } from "react-native-paper"
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons"

import { translate } from "@locale"
import { ForecastWeatherData, STORAGE_KEYS, SearchCity } from "@services/storage"
import { styles } from "./styles"


export function WeekForecast() {


    const { colors } = useTheme()

    const [citySearch] = useMMKVObject<SearchCity>(STORAGE_KEYS.SEARCH_CITY)
    const [forecastWeather] = useMMKVObject<ForecastWeatherData>(STORAGE_KEYS.FORECAST_WEATHER)
    const weekForecastWeather = useMemo(() => {
        if (!forecastWeather) return []

        const tomorrow = new Date()
        tomorrow.setDate(tomorrow.getDate() + 1)
        tomorrow.setHours(0, 0, 0, 0)
        const tomorrowTimestamp = tomorrow.getTime()

        const filteredForecastWeather = forecastWeather.filter(forecast => {
            const forecastTimestamp = forecast.dt * 1000

            if (forecastTimestamp >= tomorrowTimestamp) {
                return true
            }
            return false
        })

        const weekForecastToReturn: ForecastWeatherData = []
        for (let i = 0; i < filteredForecastWeather.length; i++) {
            if (weekForecastToReturn.length === 0) {
                weekForecastToReturn.push(filteredForecastWeather[i])
                continue
            }

            const previousForecast = weekForecastToReturn[weekForecastToReturn.length - 1]
            const currentForecast = filteredForecastWeather[i]

            const previousForecastDate = new Date(previousForecast.dt * 1000)
            const previousForecastDay = previousForecastDate.getDate()
            const currentForecastDate = new Date(currentForecast.dt * 1000)
            const currentForecastDay = currentForecastDate.getDate()

            if (previousForecastDay !== currentForecastDay) {
                weekForecastToReturn.push(currentForecast)
                continue
            }

            const meanDayForecast: ForecastWeatherData[0] = {
                dt: (previousForecast.dt + currentForecast.dt) / 2,
                main: {
                    feels_like: (previousForecast.main.feels_like + currentForecast.main.feels_like) / 2,
                    grnd_level: (previousForecast.main.grnd_level + currentForecast.main.grnd_level) / 2,
                    humidity: (previousForecast.main.humidity + currentForecast.main.humidity) / 2,
                    pressure: (previousForecast.main.pressure + currentForecast.main.pressure) / 2,
                    sea_level: (previousForecast.main.sea_level + currentForecast.main.sea_level) / 2,
                    temp: (previousForecast.main.temp + currentForecast.main.temp) / 2,
                    temp_kf: (previousForecast.main.temp_kf + currentForecast.main.temp_kf) / 2,
                    temp_max: (previousForecast.main.temp_max + currentForecast.main.temp_max) / 2,
                    temp_min: (previousForecast.main.temp_min + currentForecast.main.temp_min) / 2,
                },
                clouds: {
                    all: (previousForecast.clouds.all + currentForecast.clouds.all) / 2,
                },
                wind: {
                    speed: (previousForecast.wind.speed + currentForecast.wind.speed) / 2,
                    deg: (previousForecast.wind.deg + currentForecast.wind.deg) / 2,
                    gust: (previousForecast.wind.gust + currentForecast.wind.gust) / 2,
                },
                visibility: (previousForecast.visibility + currentForecast.visibility) / 2,
                pop: (previousForecast.pop + currentForecast.pop) / 2,

                weather: currentForecast.weather,
                sys: currentForecast.sys,
                dt_txt: currentForecast.dt_txt,
            }

            weekForecastToReturn[weekForecastToReturn.length - 1] = meanDayForecast
        }
        return weekForecastToReturn
    }, [forecastWeather, citySearch?.timestamp])


    function WeekForecastItem(item: ForecastWeatherData[0]) {
        return (
            <View style={styles.itemContainer}>
                <Text variant={"titleSmall"} style={[styles.itemDayName, { color: colors.onSurface } ]}>
                    {formatForecastDate(item.dt)}
                </Text>

                <View style={styles.itemPrecipitationContainer}>
                    <MaterialCommunityIcon
                        name={"weather-pouring"}
                        size={20}
                        color={colors.onSurface}
                    />

                    <Text variant={"titleSmall"} style={[styles.itemPrecipitationText, { color: colors.onSurface } ]}>
                        {formatForecastPrecipitation(item.pop)}
                    </Text>
                </View>

                <Text variant={"titleSmall"} style={[ { color: colors.onSurface } ]}>
                    {`${formatForecastTemperature(item.main.temp_min)} / ${formatForecastTemperature(item.main.temp_max)}`}
                </Text>
            </View>
        )
    }

    function formatForecastDate(timestamp: number) {
        const forecastDate = new Date(timestamp * 1000)
        const weekday = forecastDate.toLocaleDateString(undefined, { weekday: "long" })
        return weekday.split(",")[0]
    }

    function formatForecastPrecipitation(precipitation: number) {
        const percentagePrecipitation = precipitation * 100
        const normalizedPrecipitation = percentagePrecipitation.toFixed(0)
        return `${normalizedPrecipitation}%`
    }

    function formatForecastTemperature(temperature: number) {
        const stringTemperature = temperature.toFixed(0)
        return `${stringTemperature}°`
    }


    const containerStyle: ViewStyle = {
        ...styles.container,
        backgroundColor: colors.surface,
    }


    return (
        <View style={containerStyle}>
            {(weekForecastWeather.length > 0) && weekForecastWeather.map((forecast, index) => (
                <>
                    <WeekForecastItem {...forecast} key={`${index}-item`} />

                    {(index < (weekForecastWeather.length - 1)) && (
                        <Divider
                            style={{
                                width: "100%",
                                height: 1,
                                backgroundColor: colors.onSurfaceDisabled,
                            }}
                            key={`${index}-divider`}
                        />
                    )}
                </>
            ))}

            {(weekForecastWeather.length === 0) && (
                <Text variant={"titleSmall"} style={{ color: colors.onSurface }} key={"no-forecast-alert"}>
                    {translate("WeekForecast_noWeekForecastAvailable")}
                </Text>
            )}
        </View>
    )
}
