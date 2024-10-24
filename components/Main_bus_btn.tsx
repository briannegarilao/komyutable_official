import React, { useEffect, useRef } from "react";
import {
  TouchableOpacity,
  Image,
  View,
  StyleSheet,
  Animated,
} from "react-native";

// Props for MainBusBtn component
interface MainBusBtnProps {
  onPress: () => void; // Press handler
}

// Main bus button component
const Main_bus_btn: React.FC<MainBusBtnProps> = ({ onPress }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Animation value

  useEffect(() => {
    const fadeIn = Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: true,
    });

    const fadeOut = Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    });

    const sequence = Animated.sequence([fadeIn, Animated.delay(200), fadeOut]);

    Animated.loop(sequence).start();

    return () => {
      sequence.stop();
    };
  }, [fadeAnim]);

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Animated.Image
          source={require("../assets/images/bus_pin_btn.png")}
          style={[styles.image, { opacity: fadeAnim }]}
          resizeMode="contain"
        />
        <Image
          source={require("../assets/images/bus_pin.png")}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
    </TouchableOpacity>
  );
};

// Styles for MainBusBtn component
const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: 120,
    height: 120,
  },
  image: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
});

// Export MainBusBtn component
export default Main_bus_btn;
