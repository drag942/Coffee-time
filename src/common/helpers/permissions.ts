import {PermissionsAndroid} from "react-native";
import {showToastString} from "../showToast";

export async function getGeoLocationPermission(callBack: () => void): Promise<void> {
    try {
        const permission = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );

        if (permission == PermissionsAndroid.RESULTS.GRANTED) {
            callBack();
        }
    } catch (error) {
        showToastString(error.message);
    }
}