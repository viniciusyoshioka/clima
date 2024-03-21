import { ScrollView, StatusBar, StyleSheet, ViewStyle } from "react-native"
import { useMMKVObject } from "react-native-mmkv"

import {
  TodayForecast,
  WeatherConditions,
  WeatherSummary,
  WeekForecast,
} from "@components"
import { STORAGE_KEYS, SearchCity } from "@services/storage"


export function WeatherData() {


  const [citySearch] = useMMKVObject<SearchCity>(STORAGE_KEYS.SEARCH_CITY)

  const contentContainerStyle: ViewStyle = {
    ...styles.contentContainer,
    paddingTop: 56 + (2 * 16),
  }


  if (!citySearch) {
    return null
  }


  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={contentContainerStyle}
    >
      <WeatherSummary />

      <WeatherConditions />

      <TodayForecast />

      <WeekForecast />
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight ?? 0,
  },
  contentContainer: {
    padding: 16,
    gap: 16,
  },
})
