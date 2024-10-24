import React from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import Bus_item from "./Bus_item";
import useFetchRoutes from "../hooks/useFetchRoutes";

const Bus_list = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Bus Routes</Text>
      </View>

      <Bus_item busRouteName="Route 01" estimatedTime={"mins"} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    overflow: "hidden",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: "white",
  },
  headerContainer: {
    width: "100%",
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    borderBottomWidth: 2,
    borderBottomColor: "#1967B2",
  },
  headerText: {
    fontSize: 16,
  },
});

export default Bus_list;
