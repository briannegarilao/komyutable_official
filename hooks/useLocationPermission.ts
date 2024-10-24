import { useEffect } from "react";
import { PermissionsAndroid } from "react-native";

const useLocationPermission = () => {
  const requestLocationPermission = async () => {
    try {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);
};

export default useLocationPermission;
