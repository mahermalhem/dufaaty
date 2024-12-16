import React from "react";
import { View, StyleSheet, Text } from "react-native";

const NoInternetConnection = () => {
  return (
    <View style={styles.emptyView}>
      <Text>NoInternetConnection</Text>
    </View>
  );
};
const styles = StyleSheet.create({
});

export default NoInternetConnection;
