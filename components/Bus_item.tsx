import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";

const Bus_item = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/bus_pin_btn.png")}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.textContainer}>
        <Text style={styles.busName}>Bus Route</Text>
        <Text style={styles.timeText}>Estimated time</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "white",
    gap: 8,
  },
  image: {
    width: 50,
    height: 50,
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
