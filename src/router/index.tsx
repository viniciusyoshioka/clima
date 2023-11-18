import { NavigationContainer } from "@react-navigation/native"
import { NativeStackNavigationOptions, createNativeStackNavigator } from "@react-navigation/native-stack"
import { useColorScheme } from "react-native"
import { useTheme } from "react-native-paper"

import { Home } from "@screens/Home"


const NativeStack = createNativeStackNavigator()


export function Router() {


    const { colors } = useTheme()
    const colorScheme = useColorScheme() ?? "light"
    const isDark = colorScheme === "dark"


    const nativeStackNavigationOptions: NativeStackNavigationOptions = {
        headerShown: false,
        statusBarColor: "transparent",
        statusBarStyle: isDark ? "light" : "dark",
        statusBarTranslucent: true,
        contentStyle: {
            backgroundColor: colors.background,
        },
    }


    return (
        <NavigationContainer>
            <NativeStack.Navigator initialRouteName={"Home"} screenOptions={nativeStackNavigationOptions}>
                <NativeStack.Screen name={"Home"} component={Home} />
            </NativeStack.Navigator>
        </NavigationContainer>
    )
}
