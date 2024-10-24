import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";

const Bus_item = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/bus_pin_btn.png")}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.textContainer}>
        <Text style={styles.busName}>BUS NAME</Text>
        <Text style={styles.timeText}>Time from destination</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "white", // Added white background
  },
  image: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  textContainer: {
    flexDirection: "column",
    justifyContent: "center",
  },
  busName: {
    fontWeight: "bold",
  },
  timeText: {
    color: "#666",
  },
});

export default Bus_item;
