import { StyleSheet } from "react-native"


export const styles = StyleSheet.create({
    container: {
        width: "100%",
        borderRadius: 16,
        padding: 16,
        gap: 8,
    },
    itemContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    itemDayName: {
        flex: 1,
        textTransform: "capitalize",
    },
    itemPrecipitationContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        width: 72,
    },
    itemPrecipitationText: {
        flex: 1,
    },
})
