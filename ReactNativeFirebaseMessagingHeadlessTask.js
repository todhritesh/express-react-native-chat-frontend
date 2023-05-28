import messaging from '@react-native-firebase/messaging';

export default async (message) => {
  // Handle background push notification here
  // You can extract the necessary data from the message object
  // and perform any desired actions

  // For example, you can access the screen name from the notification data
  const NavigationScreen = message.data.NavigationScreen;
  const data = message.data;

  console.log(data)
  console.log(NavigationScreen)

  // Perform actions based on the screen name
  // ...
};
