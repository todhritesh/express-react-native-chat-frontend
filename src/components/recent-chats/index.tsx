import { Avatar, Box , Divider, HStack, ScrollView, Text, VStack, useTheme, useToast } from 'native-base'
import React, { useCallback, useEffect, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Pressable } from 'react-native'
import api from '../../services/api'
import { handleApiError } from '../../services/handleApiError'
import NAVIGATIONROUTES from '../../constants/navigation-routes'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import useAppSelector from '../../redux/hooks/useAppSelector'
import { FlashList } from '@shopify/flash-list'
import ListItem from './ListItem'
import Header from '../headers/Header'
import CustomTouchableOpacity from '../btn/CustomTouchableOpacity'
import LoadingContainer from '../loading/LoadingContainer'
import { fetchRecentChats } from '../../redux/slices/recent-chat-slice'
import useAppDispatch from '../../redux/hooks/useAppDispatch'
import {RefreshControl} from 'react-native'

const RecentChats = () => {
  const navigation = useNavigation()
  const recentChatState = useAppSelector(state=>state.recentChat)
  console.log("friends compoentttt")
  const authUser = useAppSelector(state=>state.auth)
  const theme = useTheme()
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await dispatch(fetchRecentChats())
    setRefreshing(false);
  },[])
  
  const dispatch = useAppDispatch()
  const isFocused = useIsFocused()

  useEffect(()=>{
    if(isFocused && !recentChatState.loading && recentChatState.initialLoading){
      onRefresh()
    }
    dispatch(fetchRecentChats())
  },[isFocused])
  return (
    <VStack flex={1} >
      <Header label="Your Recent Chats" />
      <LoadingContainer error={recentChatState.error} initialLoading={!recentChatState.initialLoading} loadingMessage='Loading Users ...' >
        <Box flex={1} px={2}  >
            <FlashList 
              // ListHeaderComponent={<ListHeaderComponent/>}
              data={recentChatState.data}
              keyExtractor={item=>item._id.toString()}
              renderItem={({item,index})=><ListItem item={item} index={index} />}
              estimatedItemSize={58}
              ItemSeparatorComponent={()=><Divider/>}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  colors={[theme.colors.green['600'],theme.colors.blue['600'],theme.colors.orange['600']]}
                />
              }
            />
        </Box>
      </LoadingContainer>
    </VStack>
  )
}

export default RecentChats


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