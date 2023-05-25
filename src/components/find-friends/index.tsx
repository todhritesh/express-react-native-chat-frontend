import { Avatar, Box, Divider, HStack, ScrollView, Text, VStack, useColorMode, useTheme, useToast } from 'native-base'
import React, { useEffect, useState } from 'react'
import CustomBtn from '../btn/CustomButton'
import CustomInput from '../input/CustomInput'
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Pressable } from 'react-native'
import api from '../../services/api'
import { handleApiError } from '../../services/handleApiError'
import NAVIGATIONROUTES from '../../constants/navigation-routes'
import { useNavigation } from '@react-navigation/native'
import useAppSelector from '../../redux/hooks/useAppSelector'
import { FlashList } from '@shopify/flash-list'
import ListItem from './ListItem'
import Header from '../headers/Header'
import CustomTouchableOpacity from '../btn/CustomTouchableOpacity'
import { useDispatch } from 'react-redux'
import { fetchFriends } from '../../redux/slices/friends-slice'

const FindFriends = () => {
  const navigation = useNavigation()
  const friendState = useAppSelector(state=>state.friends)
  console.log(friendState)
    const authUser = useAppSelector(state=>state.auth)
  const toast = useToast()
  const theme = useTheme()
  const {colorMode} = useColorMode()
  const themeColor = colorMode === "light" ? "coolGray.800" : "warmGray.50"
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(fetchFriends())
  },[])

  return (
    <VStack flex={1} >
      <Header label="Find Friends" />
      <Box flex={1} px={2}  >
          <FlashList 
            ListHeaderComponent={
            <Box>
              <HStack justifyContent="space-between" >
                <HStack alignItems='center' justifyContent="center" my={4} w={'1/2'} borderRightColor={themeColor} borderRightWidth={1} >
                  <CustomTouchableOpacity>
                    <VStack flex={1} justifyContent="center" >
                      <Text textAlign="center" fontSize={24} fontWeight="bold" >View </Text>
                      <Text textAlign="center" fontSize={20} >Friend Requests</Text>
                    </VStack>
                  </CustomTouchableOpacity>
                </HStack>
                <HStack alignItems='center' justifyContent="center" my={4} w={'1/2'} borderLeftColor={themeColor} borderLeftWidth={1} >
                  <CustomTouchableOpacity>
                    <VStack flex={1} justifyContent="center" >
                      <Text textAlign="center" fontSize={24} fontWeight="bold" >View </Text>
                      <Text textAlign="center" fontSize={20} >Sent Requests</Text>
                    </VStack>
                  </CustomTouchableOpacity>
                </HStack>
              </HStack>
              <Divider />
            </Box>
            }
            data={Array.from({ length: 30 }, (_, i) => ({ id: i + 1 }))}
            keyExtractor={item=>item.id.toString()}
            renderItem={({item,index})=><ListItem item={item} index={index} />}
            estimatedItemSize={58}
            ItemSeparatorComponent={()=><Divider/>}
            showsVerticalScrollIndicator={false}
          />
      </Box>
    </VStack>
  )
}

export default FindFriends