import { Box, Text, Toast, VStack, useToast } from 'native-base'
import React, {useState } from 'react'
import CustomBtn from '../btn/CustomButton'
import CustomInput from '../input/CustomInput'
import Feather from 'react-native-vector-icons/Feather'
import { Pressable } from 'react-native'
import api from '../../services/api'
import { handleApiError } from '../../services/handleApiError'
import { useNavigation } from '@react-navigation/native'
import NAVIGATIONROUTES from '../../constants/navigation-routes'



const Signup = () => {

    const navigation = useNavigation()

    const [passVisible,setpassVisible] = useState(false)
    const [confirmPassVisible,setConfirmPassVisible] = useState(false)
    const toast = useToast()
    const [email,setEmail] = useState('email2')
    const [name,setName] = useState('name')
    const [password,setPassword] = useState("pass")
    const [confirmPassword,setConfirmPassword] = useState("pass")

    

    async function handleSignup(){
      try {
        if(!email || !name || !password || !confirmPassword) {
          toast.show({
            title: 'All fields are required',
            bg:'error.600',
            duration: 3000,
          });
          return
        }
        if(password  !== confirmPassword) {
          toast.show({
            title: 'Password and confirm password must be same',
            bg:'error.600',
            duration: 3000,
          });
          return
        }
  
        const res = await api.post('/auth/signup',{
          name,password,email
        })

        Toast.show({
          title:"Account Created Successfully !",
          bg:"success.500",
          duration:3000
        })

        console.log(res.data)
        navigation.navigate(NAVIGATIONROUTES.Login)
  
      }catch(err){
        handleApiError(err)
      }


    }
  return (
    <Box justifyContent={'center'} alignItems={'center'} flex={1}  >
      <VStack space={6} w='full' >
        <VStack w="full" >
          <Text fontWeight="bold" fontSize={18} >Name</Text>
          <CustomInput value={name} onChangeText={val=>setName(val)} placeholder='eg : John Doe' />
        </VStack>
        <VStack w="full" >
          <Text fontWeight="bold" fontSize={18} >Email</Text>
          <CustomInput value={email} onChangeText={val=>setEmail(val)} placeholder='eg : example@gmail.com' />
        </VStack>
        <VStack w="full" >
          <Text fontWeight="bold" fontSize={18} >Password</Text>
          <CustomInput value={password} onChangeText={val=>setPassword(val)} rightElement={passVisible?<Pressable onPress={()=>setpassVisible(false)} ><Feather size={24} style={{marginRight:10}} name="eye"/></Pressable>:<Pressable onPress={()=>setpassVisible(true)} ><Feather size={24} style={{marginRight:10}}  name="eye-off"/></Pressable>} secureTextEntry={!passVisible} placeholder='**********' />
        </VStack>
        <VStack w="full" >
          <Text fontWeight="bold" fontSize={18} >Confirm Password</Text>
          <CustomInput value={confirmPassword} onChangeText={val=>setConfirmPassword(val)} rightElement={confirmPassVisible?<Pressable onPress={()=>setConfirmPassVisible(false)} ><Feather size={24} style={{marginRight:10}} name="eye"/></Pressable>:<Pressable onPress={()=>setConfirmPassVisible(true)} ><Feather size={24} style={{marginRight:10}}  name="eye-off"/></Pressable>} secureTextEntry={!confirmPassVisible} placeholder='**********' />
        </VStack>
        <VStack w={'1/2'} alignSelf="center" >
         <CustomBtn label="Signup" onPress={handleSignup} />
        </VStack>
      </VStack>
    </Box>
  )
}

export default Signup