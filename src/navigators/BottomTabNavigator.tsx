import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChatScreen from '../screens/Chat';
import FontAwesome from "react-native-vector-icons/FontAwesome"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import NAVIGATIONROUTES from '../constants/navigation-routes';
import FriendsScreen from '../screens/Friends';
import AccountScreen from '../screens/Account';
import { Text, View, useColorMode, useTheme } from 'native-base';
import RecentChatsScreen from '../screens/RecentChats';
import ThemeBox from '../components/ThemeBox';

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  const theme = useTheme()
  const {colorMode} = useColorMode()
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveBackgroundColor: theme.colors.blue['500'],
        tabBarActiveTintColor: 'white',
        tabBarLabelStyle: { fontWeight: "900", fontSize: 15 , },
        tabBarInactiveTintColor: colorMode === 'dark' ? 'white' : theme.colors.blue['500'],
        tabBarBackground: () => <ThemeBox />
      }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="user-friends" color={color} size={size} />
          ),
          headerShown: false,
          title:"Friends"
        }}
        name={NAVIGATIONROUTES.Friends} component={FriendsScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="wechat" color={color} size={size} />
          ),
          headerShown: false,
          title:"Chats"
        }}
        name={NAVIGATIONROUTES.RecentChats} component={RecentChatsScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-circle" color={color} size={28} />
          ),
          headerShown: false,
          title:"Account"
        }}
        name={NAVIGATIONROUTES.Account} component={AccountScreen}
      />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator