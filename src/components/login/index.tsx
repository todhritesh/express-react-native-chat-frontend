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
import AsyncStorage from '@react-native-async-storage/async-storage'
import STORAGE from '../../constants/storage'
import { useDispatch } from 'react-redux'
import {setAuthData} from '../../redux/authSlice'


const Login = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const [passVisible,setpassVisible] = useState(false)
  const toast = useToast()
  const [email,setEmail] = useState('email')
  const [password,setPassword] = useState("pass")

  async function handleLogin () {
    try {
      if(!email || !password ) {
        toast.show({
          title: 'All fields are required',
          bg:'error.600',
          duration: 3000,
        });
        return
      }

      const res = await api.post('/auth/login',{
        password,email
      })

      await AsyncStorage.setItem(STORAGE.AuthInfo,JSON.stringify(res.data))

      dispatch(setAuthData({token:res.data.token,user:res.data.user}))

      toast.show({
        title:"Account Created Successfully !",
        bg:"success.500",
        duration:3000
      })

      console.log(res.data)
      navigation.navigate(NAVIGATIONROUTES.Home)

    }catch(err){
      handleApiError(err)
    }
  }

  return (
    <Box justifyContent={'center'} alignItems={'center'} flex={1}  >
      <VStack space={6} w='full' >
      <VStack w="full" >
          <Text fontWeight="bold" fontSize={18} >Email</Text>
          <CustomInput value={email} onChangeText={val=>setEmail(val)} placeholder='eg : example@gmail.com' />
        </VStack>
        <VStack w="full" >
          <Text fontWeight="bold" fontSize={18} >Password</Text>
          <CustomInput value={password} onChangeText={val=>setPassword(val)} rightElement={passVisible?<Pressable onPress={()=>setpassVisible(false)} ><Feather size={24} style={{marginRight:10}} name="eye"/></Pressable>:<Pressable onPress={()=>setpassVisible(true)} ><Feather size={24} style={{marginRight:10}}  name="eye-off"/></Pressable>} secureTextEntry={!passVisible} placeholder='**********' />
        </VStack>
        <VStack w={'1/2'} alignSelf="center" >
         <CustomBtn label="Login" onPress={handleLogin} />
        </VStack>
      </VStack>
    </Box>
  )
}

export default Login