import React from 'react'
import ThemeBox from '../components/ThemeBox'
import Splash from '../components/splash'

const SplashScreen = () => {
  return (
    <ThemeBox flex={1} px={2} >
      <Splash />
    </ThemeBox>
  )
}

export default SplashScreen