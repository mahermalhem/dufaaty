/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import NotificationController from './NotificationService/NotificationController';
import CodePushListener from './src/Component/CodePushListener';




const  App = () => {

  return (
    <SafeAreaView style={{}}>
      <StatusBar
        barStyle={'light-content'}
      />
      <Text>hello</Text>
      <NotificationController/>
      <CodePushListener/>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  
});

export default App;
