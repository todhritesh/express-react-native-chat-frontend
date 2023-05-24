import React from 'react'
import Login from '../components/login'
import ThemeBox from '../components/ThemeBox'

const LoginScreen = () => {
  return (
    <ThemeBox flex={1} px={2} >
      <Login />
    </ThemeBox>
  )
}

export default LoginScreen