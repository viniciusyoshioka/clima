import { NavigationContainer } from "@react-navigation/native"
import { NativeStackNavigationOptions, createNativeStackNavigator } from "@react-navigation/native-stack"
import { useColorScheme } from "react-native"

import { Details } from "@screens/Details"
import { Home } from "@screens/Home"
import { ScreenParams } from "./types"


export * from "./types"


const NativeStack = createNativeStackNavigator<ScreenParams>()


export function Router() {


    const colorScheme = useColorScheme() ?? "light"
    const isDark = colorScheme === "dark"


    const nativeStackNavigationOptions: NativeStackNavigationOptions = {
        headerShown: false,
        statusBarColor: "transparent",
        statusBarStyle: isDark ? "light" : "dark",
        statusBarTranslucent: true,
        contentStyle: {
            backgroundColor: isDark ? "black" : "white",
        },
    }


    return (
        <NavigationContainer>
            <NativeStack.Navigator initialRouteName={"Home"} screenOptions={nativeStackNavigationOptions}>
                <NativeStack.Screen name={"Home"} component={Home} />
                <NativeStack.Screen name={"Details"} component={Details} />
            </NativeStack.Navigator>
        </NavigationContainer>
    )
}
