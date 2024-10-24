import React from "react";
import { View, Image, StyleSheet, Text, TouchableOpacity } from "react-native";

interface BusItemProps {
  busRouteName: string;
  estimatedTime: string;
}

const Bus_item: React.FC<BusItemProps> = ({ busRouteName, estimatedTime }) => {
  return (
    <TouchableOpacity>
      <View style={styles.container}>
        <Image
          source={require("../assets/images/bus_pin_btn.png")}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.textContainer}>
          <Text style={styles.busName}>{busRouteName}</Text>
          <Text style={styles.timeText}>{estimatedTime}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// Styles for BusItem component
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
