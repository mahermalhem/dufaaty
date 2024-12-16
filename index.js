/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from "@react-native-firebase/messaging";
import DeviceInfo from "react-native-device-info";
import RNRestart from "react-native-restart";


messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log("Message handled in the background!", remoteMessage);
});

if (__DEV__) {
    require("./ReactotronConfig");
}

if (!__DEV__) {
    console.log = ()=>{};
}

DeviceInfo.isEmulator()
  .then((isEmulator) => {
    if (isEmulator && !__DEV__) {
      RNRestart.Restart();
    }
  })
  .catch((err) => console.log(err));

AppRegistry.registerComponent(appName, () => App);
