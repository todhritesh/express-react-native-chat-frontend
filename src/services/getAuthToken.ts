import AsyncStorage from "@react-native-async-storage/async-storage"
import STORAGE from "../constants/storage"

export default async function getAuthToken(){
    let authInfo = await AsyncStorage.getItem(STORAGE.AuthInfo)
    // await AsyncStorage.clear()
    if (authInfo) {
        authInfo = JSON.parse(authInfo)

        return `Bearer ${authInfo?.token}`
    }

    return null
}