import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableHighlight,
} from "react-native";

const Bus_item = () => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <TouchableHighlight
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      underlayColor="#4687c7"
      style={styles.touchable}
    >
      <View style={[styles.container, isPressed && styles.containerPressed]}>
        <Image
          source={require("../assets/images/bus_pin_btn.png")}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.textContainer}>
          <Text style={[styles.busName, isPressed && styles.textPressed]}>
            BUS NAME
          </Text>
          <Text style={[styles.timeText, isPressed && styles.textPressed]}>
            Time from destination
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  touchable: {
    backgroundColor: "white",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "white",
    gap: 8,
  },
  containerPressed: {
    backgroundColor: "#4687c7",
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
  textPressed: {
    color: "white",
  },
});

export default Bus_item;
