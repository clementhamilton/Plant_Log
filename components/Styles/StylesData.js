import { StyleSheet, Dimensions } from "react-native"; //Import Styling Functions
import COLORS from "./Colors.js"; //Colors Data File

export const stylesData = StyleSheet.create({
  //Styling Sheet for Form
  container: {
    flex: 0,
    backgroundColor: COLORS.beige,
  },
  downloadView: {
    justifyContent: "center",
    fontSize: 15,
    flex: 0,
    height: 70,
    backgroundColor: COLORS.green,
  },
  item: {
    marginTop: 24,
    padding: 30,
    backgroundColor: COLORS.lime,
    fontSize: 20,
    textAlign: "center",
  },
});
