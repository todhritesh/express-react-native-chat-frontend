import { Box, Text, VStack, useToast } from 'native-base'
import React, { useState } from 'react'
import CustomBtn from '../btn/CustomButton'
import CustomInput from '../input/CustomInput'
import Feather from 'react-native-vector-icons/Feather'
import { Pressable } from 'react-native'
import api from '../../services/api'
import { handleApiError } from '../../services/handleApiError'
import NAVIGATIONROUTES from '../../constants/navigation-routes'
import { useNavigation } from '@react-navigation/native'
import useAppSelector from '../../redux/hooks/useAppSelector'


const Login = () => {
  const navigation = useNavigation()
    const authUser = useAppSelector(state=>state.auth)
  const toast = useToast()
console.log(authUser,"in home")
  return (
    <Box justifyContent={'center'} alignItems={'center'} flex={1}  >
      <Text>Home</Text>
      <Text>Home</Text>
      <Text>Home</Text>
      <Text>Home</Text>
      <Text>Home</Text>
      <Text>Home</Text>
      <Text>Home</Text>
      <Text>Home</Text>
      <Text>Home</Text>
      <Text>Home</Text>
    </Box>
  )
}

export default Login