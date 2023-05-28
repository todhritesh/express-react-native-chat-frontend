import {PermissionsAndroid} from 'react-native';
const requestPushNotificationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        {
          title: 'Push Notification Permission',
          message: 'Your app would like to send you push notifications.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
  
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Push notification permission granted.');
        // Proceed with push notification setup
      } else {
        console.log('Push notification permission denied.');
        // Handle the case when permission is denied
      }
    } catch (error) {
      console.log('Error while requesting push notification permission:', error);
    }
  };

export default requestPushNotificationPermission
  

