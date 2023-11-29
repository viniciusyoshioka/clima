import { useState } from "react"
import { Alert, View } from "react-native"
import { GeoPosition } from "react-native-geolocation-service"
import { useMMKVObject } from "react-native-mmkv"

import { GeocodingResponse, OPEN_WEATHER_MAP, openWeatherMap } from "@api"
import { Geolocation } from "@services/geolocation"
import { Permissions } from "@services/permissions"
import { STORAGE_KEYS, SearchCity } from "@services/storage"
import { LocationInput } from "./LocationInput"
import { styles } from "./styles"


export function Home() {


    const [citySearch, setCitySearch] = useMMKVObject<SearchCity>(STORAGE_KEYS.SEARCH_CITY)
    const [cityName, setCityName] = useState(citySearch?.city)


    async function getLocationByGps() {
        const locationCoordinates = await getLocationCoordinates()
        if (!locationCoordinates) return

        const locationAddress = await getLocationAddressFromCoordinates(locationCoordinates)
        if (!locationAddress) return

        const { coords, timestamp } = locationCoordinates
        const { latitude, longitude } = coords
        const city = locationAddress.name

        setCitySearch({ city, latitude, longitude, timestamp })
    }

    async function getLocationCoordinates(): Promise<GeoPosition | undefined> {
        const hasLocationPermission = await Permissions.requestFineLocation()
        if (!hasLocationPermission) {
            Alert.alert(
                "Não foi possível obter a sua localização",
                "O uso do GPS é necessário para o funcionamento do aplicativo e sua permissão não foi concedida."
            )
            return
        }

        try {
            return await Geolocation.getCurrentPosition()
        } catch (error) {
            Alert.alert(
                "Não foi possível obter a sua localização",
                "Houve um erro ao obter a localização atual do GPS."
            )
        }
        return
    }

    async function getLocationAddressFromCoordinates(coordinates: GeoPosition): Promise<GeocodingResponse | undefined> {
        const params = {
            lat: coordinates.coords.latitude,
            lon: coordinates.coords.longitude,
        }

        try {
            const response = await openWeatherMap.get(OPEN_WEATHER_MAP.routes.reverseGeocoding, { params })
            const data = response.data as GeocodingResponse[]
            if (data.length === 0) {
                Alert.alert(
                    "Não foi possível obter a sua localização",
                    "Não foi possível obter a sua cidade com base na localização do GPS"
                )
                return
            }

            return data[0]
        } catch (error) {
            Alert.alert(
                "Não foi possível obter a sua localização",
                "Houve um erro ao obter a sua cidade com base na localização do GPS."
            )
            return
        }
    }


    async function getLocationBySearch() {
        if (cityName === undefined || cityName.length === 0) {
            Alert.alert(
                "Não foi possível obter a sua localização",
                "O nome da cidade não pode ser vazio."
            )
            return
        }

        const locationCoordinates = await getLocationCoordinatesFromAddress(cityName)
        if (!locationCoordinates) return

        const city = locationCoordinates.name
        const latitude = locationCoordinates.lat
        const longitude = locationCoordinates.lon
        const timestamp = Date.now()
        setCitySearch({ city, latitude, longitude, timestamp })
    }

    async function getLocationCoordinatesFromAddress(cityName: string): Promise<GeocodingResponse | undefined> {
        const params = { q: cityName }

        try {
            const response = await openWeatherMap.get(OPEN_WEATHER_MAP.routes.geocoding, { params })
            const data = response.data as GeocodingResponse[]
            if (data.length === 0) {
                Alert.alert(
                    "Não foi possível obter a sua localização",
                    "Não foi possível obter suas coordenadas com base na cidade fornecida."
                )
                return
            }

            return data[0]
        } catch (error) {
            Alert.alert(
                "Não foi possível obter a sua localização",
                "Houve um erro ao obter suas coordenadas com base no nome da cidade fornecida."
            )
            return
        }
    }


    return (
        <View style={styles.container}>
            <LocationInput
                defaultValue={citySearch?.city}
                value={cityName}
                onChangeText={setCityName}
                getLocation={getLocationByGps}
                searchLocation={getLocationBySearch}
            />
        </View>
    )
}
