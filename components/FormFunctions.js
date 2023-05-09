import AsyncStorage from "@react-native-async-storage/async-storage"; //Import AsyncStorage Library

export default storeData = async (info) => {
  //AsyncStorage Save Data to Local Storage
  try {
    //Send Data to LocalStorage
    await AsyncStorage.setItem("savedData", JSON.stringify(info));
    console.log("Data saved in Async Storage");
  } catch (err) {
    console.log(err);
  }
};
