//React Import
import {
  useState,
  TextInput,
  View,
  Text,
  useEffect,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions,
  Button,
  Alert,
  Share,
  KeyboardAvoidingView,
} from "react-native"; //React Native Functions
import * as React from "react"; //React Functions

//Navigation Import
import { NavigationContainer } from "@react-navigation/native"; //Navigation Container Function
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"; //Bottom Tabs Function
import Ionicons from "@expo/vector-icons/Ionicons"; //Import Icon Library
import { FontAwesome5 } from "@expo/vector-icons"; //Icon Pack
import { AntDesign } from "@expo/vector-icons"; //Icon Pack
//Functions for Form
import COLORS from "./Styles/Colors.js"; //Colors Data File
import { stylesForm } from "./Styles/StylesForm.js"; //Stylesheet from File
import storeData from "./FormFunctions"; //StoreData Function from File
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"; //Keyboard Interaction
import { Formik, Field, Form } from "formik"; //Form Library
//Functions for Data
import { stylesData } from "./Styles/StylesData.js"; //Stylesheet from File

export default function NavigationTabs() {
  //Main Container
  const Tab = createBottomTabNavigator(); //Create a Tab Navigation Set
  //Base Data
  const [data, setData] = React.useState([
    {
      key: "0",
      date: "10/10/2010",
      location: "baseData",
      species: "baseEntry",
    },
    {
      key: "1",
      date: "7/4/2023",
      location: "today",
      species: "today",
      reminder: "Tue May 09 2023",
    },
  ]); //React Database
  const [keys, setKey] = React.useState(2); //Data ID System

  function Form() {
    //Form Screen Container
    React.useEffect(() => {
      console.log(data);
    });
    const handleKeyDown = (e) => {
      if (e.nativeEvent.key === "Enter") {
        dismissKeyboard();
      }
    };

    const submitHandler = (values) => {
      //Update React Database
      setData((prevData) => {
        return [...prevData, values];
      });
      //Update ID System
      setKey((prevData) => {
        return prevData + 1;
      });
      //Store Data into Async
      storeData(values);
    };

    return (
      //Form Container
      <View style={stylesForm.form}>
        {/* Scrollable Container */}
        <KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }}>
          {/* Form Container */}
          <Formik
            initialValues={{
              date: "",
              location: "",
              species: "",
              amount: "",
              reminder: "",
              comments: "",
            }} //Initial Values of the Form
            onSubmit={(values, actions) => {
              //Add ID to user entry
              values.key = keys;
              //Add Today's Date
              var dateNow = new Date();
              //Parse Date to Readable
              values.date = dateNow.toDateString();
              //Add Reminder's Date
              var dateReminder = new Date();
              dateReminder.setDate(dateReminder.getDate() + 7);
              //Parse Data to Readable
              values.reminder = dateReminder.toDateString();
              //Submit Values
              submitHandler(values);
              //Reset Form
              actions.resetForm();
            }}
          >
            {(props) => (
              <View>
                <Text style={stylesForm.label}>Location</Text>
                <TextInput
                  style={stylesForm.inputField} //Styling
                  placeholder="Enter the location" //Placeholder
                  onChangeText={props.handleChange("location")} //Update Values
                  value={props.values.location} //Value --> Data
                />
                <Text style={stylesForm.label}>Species</Text>
                <TextInput
                  style={stylesForm.inputField}
                  placeholder="Enter the species"
                  onChangeText={props.handleChange("species")}
                  value={props.values.species}
                />

                <Text style={stylesForm.label}>Amount</Text>
                <TextInput
                  style={stylesForm.inputField}
                  placeholder="Enter the quantity of seeds"
                  onChangeText={props.handleChange("amount")}
                  value={props.values.amount}
                  keyboardType="numeric" //Number Input
                />

                <Text style={stylesForm.label}>Comments</Text>
                <TextInput
                  style={stylesForm.inputArea}
                  placeholder="Comments"
                  onChangeText={props.handleChange("comments")}
                  value={props.values.comments}
                />
                <Button
                  style={stylesForm.button}
                  title="SAVE"
                  onPress={props.handleSubmit}
                  color={COLORS.green}
                  //Button Styling and Config
                />
              </View>
            )}
          </Formik>
        </KeyboardAwareScrollView>
      </View>
    );
  }

  function Data() {
    //Data Screen Container
    const pressHandler = (id) => {
      //Pressing List Item Function
      const json = JSON.stringify(data[id]);
      //Clean JSON Data
      var unquoted = json.replace(/"/g, " ");
      unquoted = unquoted.replace(/[{}]/g, "");
      //Display Clean Data
      alert(unquoted);
    };

    const onShare = async () => {
      //Sharing Data Function
      try {
        //Async Sharing Request
        const result = await Share.share({
          message: JSON.stringify(data),
        });
      } catch (err) {
        //Error Handling
        Alert.alert(err.message);
      }
    };

    const sameDate = (d1) => {
      //Reminder Notification Function
      var reminder = new Date(d1);
      var today = new Date();
      //Comparing Dates
      if (reminder.getTime() - today.getTime() < 1000) {
        return <Text style={stylesForm.check}>Check</Text>;
      }
    };

    return (
      <TouchableWithoutFeedback>
        <ScrollView style={stylesData.container}>
          <Button
            //Download Data Button
            title="Download Data"
            color={COLORS.green}
            onPress={onShare}
            style={stylesForm.button}
          />
          {data.map((item) => {
            //Display Data into a List
            return (
              <TouchableOpacity
                key={item.key}
                onPress={() => pressHandler(item.key)}
              >
                <Text style={stylesData.item} key={item.key}>
                  {item.location} - {item.species} {sameDate(item.reminder)}
                </Text>
              </TouchableOpacity>
            );
          })}
          {/* Bottom Padding */}
          <View style={{ padding: 80 }}></View>
        </ScrollView>
      </TouchableWithoutFeedback>
    );
  }

  //Navigation Container Display
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 14 },
        tabBarItemStyle: { width: 100 },
        //Navigation Tab Config
      }}
    >
      <Tab.Screen
        //Form Screen Config
        name="Form"
        component={Form}
        options={{
          tabBarLabel: "Form",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="tree" size={24} color="black" />
          ),
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        //Data Screen Config
        name="Data"
        component={Data}
        options={{
          tabBarLabel: "Data",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="database" size={24} color="black" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
