import { NativeModules, Platform } from "react-native"


export function getDeviceLanguageCode(): string {
    switch (Platform.OS) {
        case "android":
            return NativeModules.I18nManager.localeIdentifier.toLowerCase()
        case "ios":
            return NativeModules.SettingsManager.settings.AppleLocale.toLowerCase()
        default:
            throw new Error("Only Android and iOS are supported.")
    }
}
