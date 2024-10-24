import React from "react";
import { View, StyleSheet } from "react-native";
import Map from "../components/Map";
import Bus_list from "../components/Bus_list";

export default function Index() {
  return (
    <View style={styles.container}>
      <Map />
      <View style={styles.busListContainer}>
        <Bus_list />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  busListContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
});
