import * as React from "react"; //Import React Library
import { NavigationContainer } from "@react-navigation/native"; //Import Navigation Container Function
import NavigationTabs from "./components/NavigationTabs.js"; //Import Navigation File

export default function App() {
  //Main Component to display
  return (
    <NavigationContainer>
      <NavigationTabs />
    </NavigationContainer>
  );
}
