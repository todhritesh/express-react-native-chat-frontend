import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/Login';
import SignupScreen from '../screens/Signup';
import NAVIGATIONROUTES from '../constants/navigation-routes';
import SplashScreen from '../screens/SplashScreen';
import BottomTabNavigator from './BottomTabNavigator';
import { StatusBar } from 'react-native';
import { useTheme } from 'native-base';
import FindFriendsScreen from '../screens/FindFriends';
import FriendRequestScreen from '../screens/FriendRequest';
import SentRequestScreen from '../screens/SentRequest';
import navigationService from '../services/navigationService';
import ChatScreen from '../screens/Chat';

const Stack = createStackNavigator();

export default function StackNavigator() {
  const theme = useTheme()
  return (
    <>
        <NavigationContainer ref={(ref) => navigationService.setTopLevelNavigator(ref)}>
        <StatusBar backgroundColor={theme.colors.blue['500']} />

        <Stack.Navigator>
          <Stack.Screen options={{ headerShown: false }} name={NAVIGATIONROUTES.Login} component={LoginScreen} />
          <Stack.Screen options={{ headerShown: false }} name={NAVIGATIONROUTES.Chat} component={ChatScreen} />
          <Stack.Screen options={{ headerShown: false }} name={NAVIGATIONROUTES.BottomTabNavigator} component={BottomTabNavigator} />
          <Stack.Screen options={{ headerShown: false }} name={NAVIGATIONROUTES.FindFriends} component={FindFriendsScreen} />
          <Stack.Screen options={{ headerShown: false }} name={NAVIGATIONROUTES.FriendRequests} component={FriendRequestScreen} />
          <Stack.Screen options={{ headerShown: false }} name={NAVIGATIONROUTES.SentRequests} component={SentRequestScreen} />
          <Stack.Screen options={{ headerShown: false }} name={NAVIGATIONROUTES.Splash} component={SplashScreen} />
          <Stack.Screen options={{ headerShown: false }} name={NAVIGATIONROUTES.Signup} component={SignupScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}