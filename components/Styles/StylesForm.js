import { StyleSheet, Dimensions } from "react-native"; //Import Styling Functions
import COLORS from "./Colors.js"; //Colors Data File

export const stylesForm = StyleSheet.create({
  //Styling Sheet for Form
  form: {
    backgroundColor: COLORS.beige,
    height: Dimensions.get("window").height - 20,
  },
  label: {
    fontSize: 14,
    padding: 5,
    paddingLeft: 10,
    marginTop: 10,
  },
  inputField: {
    flex: 1,
    width: Dimensions.get("window").width - 20,
    fontSize: 18,
    textAlign: "center",
    backgroundColor: COLORS.lime,
    borderColor: COLORS.green,
    borderWidth: 1,
    borderRadius: 5,
    padding: 15,
    margin: 10,
  },
  inputArea: {
    flex: 1,
    height: 70,
    width: Dimensions.get("window").width - 20,
    fontSize: 18,
    textAlign: "center",
    backgroundColor: COLORS.lime,
    borderColor: COLORS.green,
    borderWidth: 1,
    borderRadius: 5,
    padding: 15,
    margin: 10,
  },
  button: {
    width: 100,
    backgroundColor: COLORS.green,
    fontSize: 30,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginTop: 30,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 40,
  },
  check: {
    backgroundColor: "pink",
  },
});
