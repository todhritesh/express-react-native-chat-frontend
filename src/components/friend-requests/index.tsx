import { Avatar, Box, Divider, HStack, ScrollView, Text, VStack, useTheme, useToast } from 'native-base'
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
import { fetchFriendRequests } from '../../redux/slices/friend-requests-slice'


const FriendRequest = () => {
  const navigation = useNavigation()
  const friendRequestState = useAppSelector(state=>state.friendRequests)
  console.log(friendRequestState.data,"friends compoent")
  const authUser = useAppSelector(state=>state.auth)
  const toast = useToast()
  
  const dispatch = useAppDispatch()

  useEffect(()=>{
    dispatch(fetchFriendRequests())
  },[])
  return (
    <VStack flex={1} >
      <Header label="Friend Requests" />
      <LoadingContainer error={friendRequestState.error} initialLoading={!friendRequestState.initialLoading} loadingMessage='Loading Users ...' >
        <Box flex={1} px={2}  >
            <FlashList 
              // ListHeaderComponent={<ListHeaderComponent/>}
              data={friendRequestState.data}
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

export default FriendRequest


const ListHeaderComponent = () => {
  const theme = useTheme()
  const navigation = useNavigation()
  return (
    <CustomTouchableOpacity onPress={()=>navigation.navigate(NAVIGATIONROUTES.FindFriends)} >
    <HStack alignItems='center' justifyContent="space-between" my={4} >
      <HStack alignItems='center' space={4}  >
        <Box p={1} borderRadius={'full'} w={55} h={55} borderWidth={2} borderColor="orange.600" justifyContent="center" alignItems="center"  >
          <Ionicons name="person-add-sharp" style={{}} color={theme.colors.orange['500']} size={30} />
        </Box>
        <VStack flex={1} >
          <Text fontSize={20} fontWeight="bold" >Find Friends </Text>
          <Text fontSize={14} >Connect With New Peoples , Friends And Family</Text>
        </VStack>
      </HStack>
    </HStack>
    <Divider/>
  </CustomTouchableOpacity>
  )
}