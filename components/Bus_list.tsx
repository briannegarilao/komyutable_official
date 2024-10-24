import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Bus_item from "./Bus_item";

const Bus_list = () => {
  return (
    <View style={styles.container}>
      <Bus_item />
      <Bus_item />
      <Bus_item />
      <Bus_item />
      <Bus_item />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
  },
});

export default Bus_list;
