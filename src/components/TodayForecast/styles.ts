import { StyleSheet } from "react-native"


export const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 16,
  },
  contentContainer: {
    padding: 16,
    gap: 4,
  },
  itemContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 6,
    borderRadius: 4,
    overflow: "hidden",
  },
  itemIcon: {
    marginVertical: 8,
  },
  itemPrecipitationContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    marginTop: 8,
  },
})
