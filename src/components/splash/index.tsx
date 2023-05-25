import { Box, Image, Spinner, Text, Toast, VStack, useToast } from 'native-base'
import React, { useEffect, useState } from 'react'
import {setAuthData} from "../../redux/authSlice"
import api from '../../services/api'
import { useNavigation } from '@react-navigation/native'
import NAVIGATIONROUTES from '../../constants/navigation-routes'
import AsyncStorage from '@react-native-async-storage/async-storage'
import STORAGE from '../../constants/storage'
import { useDispatch } from 'react-redux'



const Signup = () => {

    const navigation = useNavigation()
    const dispatch = useDispatch()

    async function authCheck() {
        try {
            let authInfo = await AsyncStorage.getItem(STORAGE.AuthInfo)

            if (authInfo) {
                authInfo = JSON.parse(authInfo)

                const res = await api.post('/auth/auth-check', {},{
                    headers:{
                        Authorization:`Bearer ${authInfo?.token}`
                    }
                })
                dispatch(setAuthData({token:res.data.token,user:res.data.user}))

                navigation.navigate(NAVIGATIONROUTES.BottomTabNavigator)
                console.log(res.data)

            }else{
                navigation.navigate(NAVIGATIONROUTES.Login)
            }
        } catch (err) {
            await AsyncStorage.removeItem(STORAGE.AuthInfo)
            console.log(err)
        }
    }

    useEffect(() => {
        authCheck()
    },[])


    return (
        <Box justifyContent={'center'} alignItems={'center'} flex={1} >
            <VStack space={2} w='full' flex={1} justifyContent={'center'} alignItems={'center'}  >
                <Image alt="logo" source={require('../../assets/logo.png')} w={200} h={200} />
                <Spinner color="blue.500" size={60} />
                <Box flex={.25} bg="red.400" />
                <Text fontWeight="bold" fontSize={30} >Native Chat</Text>
            </VStack>
        </Box>
    )
}

export default Signup