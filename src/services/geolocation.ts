import GeolocationService, { GeoOptions, GeoPosition } from "react-native-geolocation-service"


async function getCurrentPosition(options?: GeoOptions): Promise<GeoPosition> {
    return new Promise((resolve, reject) => {
        GeolocationService.getCurrentPosition(resolve, reject, options)
    })
}


export const Geolocation = {
    getCurrentPosition,
}
