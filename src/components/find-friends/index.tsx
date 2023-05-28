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
import LoadingContainer from '../loading/LoadingContainer'
import useAppDispatch from '../../redux/hooks/useAppDispatch'
import { fetchNonFriend } from '../../redux/slices/non-friends-slice'

const FindFriends = () => {
  const navigation = useNavigation()
  const nonFriendState = useAppSelector(state=>state.nonFriends)
  console.log(nonFriendState)
  const authUser = useAppSelector(state=>state.auth)
  const toast = useToast()
  
  const dispatch = useAppDispatch()

  useEffect(()=>{
    dispatch(fetchNonFriend())
  },[])

  return (
    <VStack flex={1} >
      <Header label="Find Friends" />
      <LoadingContainer error={nonFriendState.error} initialLoading={!nonFriendState.initialLoading} loadingMessage='Loading Users ...' >
        <Box flex={1} px={2}  >
            <FlashList 
              ListHeaderComponent={<ListHeaderComponent/>}
              data={nonFriendState.data}
              keyExtractor={item=>item._id.toString()}
              renderItem={({item,index})=><ListItem item={item} index={index} />}
              estimatedItemSize={58}
              ItemSeparatorComponent={()=><Divider/>}
              showsVerticalScrollIndicator={false}
            />
        </Box>
      </LoadingContainer>
    </VStack>
  )
}

export default FindFriends


const ListHeaderComponent = () => {
  const theme = useTheme()
  const {colorMode} = useColorMode()
  const themeColor = colorMode === "light" ? "coolGray.800" : "warmGray.50"
  const navigation = useNavigation()

  return (
    <Box>
      <HStack justifyContent="space-between" >
        <HStack alignItems='center' justifyContent="center" my={4} w={'1/2'} borderRightColor={themeColor} borderRightWidth={1} >
          <CustomTouchableOpacity onPress={()=>navigation.navigate(NAVIGATIONROUTES.FriendRequests)} >
            <VStack flex={1} justifyContent="center" >
              <Text textAlign="center" fontSize={24} fontWeight="bold" >View </Text>
              <Text textAlign="center" fontSize={20} >Friend Requests</Text>
            </VStack>
          </CustomTouchableOpacity>
        </HStack>
        <HStack alignItems='center' justifyContent="center" my={4} w={'1/2'} borderLeftColor={themeColor} borderLeftWidth={1} >
          <CustomTouchableOpacity onPress={()=>navigation.navigate(NAVIGATIONROUTES.SentRequests)} >
            <VStack flex={1} justifyContent="center" >
              <Text textAlign="center" fontSize={24} fontWeight="bold" >View </Text>
              <Text textAlign="center" fontSize={20} >Sent Requests</Text>
            </VStack>
          </CustomTouchableOpacity>
        </HStack>
      </HStack>
      <Divider />
    </Box>
  )
}