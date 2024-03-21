import { RouteProp } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"


export type ScreenParams = {
    Home: undefined
    Details: {
        type: "current" | "forecast"
        timestamp?: number
    }
}

export type ScreenName = keyof ScreenParams


export type NavigationParamProps<T extends ScreenName> = NativeStackNavigationProp<
    ScreenParams, T
>

export type RouteParamProps<T extends ScreenName> = RouteProp<ScreenParams, T>
