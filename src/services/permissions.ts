import { PermissionsAndroid } from "react-native"


export class Permissions {

    static async requestFineLocation(): Promise<boolean> {
        const hasPermission = await PermissionsAndroid.check("android.permission.ACCESS_FINE_LOCATION")
        if (hasPermission) return true

        const response = await PermissionsAndroid.request("android.permission.ACCESS_FINE_LOCATION")
        return response === "granted"
    }
}
