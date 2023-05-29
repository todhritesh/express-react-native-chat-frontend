import { Alert, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useEffect } from 'react'
import StackNavigator from './src/navigators/StackNavigator'
import { NativeBaseProvider, Toast, useTheme } from 'native-base'
import theme from './src/config/theme'
import { Provider } from 'react-redux'
import store from './src/redux/store'
import messaging from '@react-native-firebase/messaging';
import navigationService from './src/services/navigationService'
import NAVIGATIONROUTES from './src/constants/navigation-routes'


const App = () => {

  useEffect(()=>{
    messaging().setBackgroundMessageHandler(async (remoteMessage)=>{
      console.log("backkkkkk gorund ==========")
    })

    messaging().onNotificationOpenedApp(async remoteMessage=>{
      console.log("on Open app=======>",remoteMessage)
      const NavigationScreen = remoteMessage?.data?.NavigationScreen
      const userId = remoteMessage?.data?.userId
      if(NavigationScreen){
        console.log(NavigationScreen)
          navigationService.navigate(NavigationScreen,{userId})
      }
    })

    const unsubscribe = messaging().onMessage(async (remoteMessage)=>{
      // Alert.alert("A new Fcm message arrived",JSON.stringify(remoteMessage))
      Toast.show({
        title:remoteMessage.notification?.body,
        bg:"success.500",
        duration:3000,
        placement:'top'
      })
      console.log(remoteMessage)
    })

    return unsubscribe
  },[])

  return (
    <NativeBaseProvider theme={theme} >
      <SafeAreaView style={{ flex: 1 }} >
        <Provider store={store} >
          <StackNavigator />
        </Provider>
      </SafeAreaView>
    </NativeBaseProvider>
  )
}

export default App

const styles = StyleSheet.create({})