import { StyleSheet } from "react-native"


export const styles = StyleSheet.create({
    currentStateContainer: {
        gap: 8,
    },
    currentTemperatureContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    temperature: {
        fontSize: 64,
    },
    description: {
        textTransform: "capitalize",
    },
    weatherImage: {
        flex: 1,
    },
    temperaturesContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
    },
})
