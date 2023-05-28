import messaging from '@react-native-firebase/messaging';

const setFcmToken = async () => {
    const fcmToken = await messaging().getToken()
    if(fcmToken){
        console.log('fcmToken',fcmToken)
        return fcmToken
    }
    return null
}

export default setFcmToken