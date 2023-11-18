import { useColorScheme } from "react-native"
import { KeyboardProvider } from "react-native-keyboard-controller"
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from "react-native-paper"

import { Router } from "@router"


export function App() {


    const colorScheme = useColorScheme() ?? "light"
    const isDark = colorScheme === "dark"


    return (
        <KeyboardProvider statusBarTranslucent={true}>
            <PaperProvider theme={isDark ? MD3DarkTheme : MD3LightTheme}>
                <Router />
            </PaperProvider>
        </KeyboardProvider>
    )
}
