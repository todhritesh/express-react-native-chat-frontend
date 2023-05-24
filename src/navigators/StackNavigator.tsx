import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/Login';
import SignupScreen from '../screens/Signup';
import HomeScreen from '../screens/Home';
import NAVIGATIONROUTES from '../constants/navigation-routes';
import SplashScreen from '../screens/SplashScreen';

const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen options={{headerShown:false}} name={NAVIGATIONROUTES.Splash} component={SplashScreen} />
            <Stack.Screen options={{headerShown:false}} name={NAVIGATIONROUTES.Login} component={LoginScreen} />
            <Stack.Screen options={{headerShown:false}} name={NAVIGATIONROUTES.Signup} component={SignupScreen} />
            <Stack.Screen options={{headerShown:false}} name={NAVIGATIONROUTES.Home} component={HomeScreen} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}