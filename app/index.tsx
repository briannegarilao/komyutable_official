import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
  PanResponder,
} from "react-native";
import Map from "../components/Map";
import Main_bus_btn from "../components/Main_bus_btn";
import Bus_list from "../components/Bus_list";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const BUS_LIST_HEIGHT = SCREEN_HEIGHT * 0.6;

export default function Index() {
  const [isListVisible, setIsListVisible] = useState(false);
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 50) {
          closeList();
        } else {
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  const toggleBusList = () => {
    if (isListVisible) {
      closeList();
    } else {
      openList();
    }
  };

  const openList = () => {
    setIsListVisible(true);
    Animated.spring(pan, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start();
  };

  const closeList = () => {
    Animated.timing(pan, {
      toValue: { x: 0, y: BUS_LIST_HEIGHT },
      duration: 300,
      useNativeDriver: false,
    }).start(() => setIsListVisible(false));
  };

  const listTranslateY = pan.y.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [0, 0, 1],
  });

  return (
    <View style={styles.container}>
      <Map />
      <View style={styles.buttonContainer}>
        <Main_bus_btn onPress={toggleBusList} />
      </View>
      {isListVisible && (
        <Animated.View
          style={[
            styles.busListContainer,
            { transform: [{ translateY: listTranslateY }] },
          ]}
          {...panResponder.panHandlers}
        >
          <View style={styles.dragIndicator} />
          <Bus_list />
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 24,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 2,
  },
  busListContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: BUS_LIST_HEIGHT,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 3,
  },
  dragIndicator: {
    width: 40,
    height: 5,
    backgroundColor: "#ccc",
    borderRadius: 3,
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 10,
  },
});
