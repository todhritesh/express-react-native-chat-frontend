import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import StackNavigator from './src/navigators/StackNavigator'
import { NativeBaseProvider } from 'native-base'
import theme from './src/config/theme'
import { Provider } from 'react-redux'
import store from './src/redux/store'

const App = () => {
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