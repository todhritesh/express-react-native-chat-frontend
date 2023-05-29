import { Avatar, Box , Divider, HStack, ScrollView, Text, TextArea, VStack, useColorMode, useTheme, useToast } from 'native-base'
import React, { useCallback, useEffect, useReducer, useRef, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import { Pressable } from 'react-native'
import { handleApiError } from '../../services/handleApiError'
import NAVIGATIONROUTES from '../../constants/navigation-routes'
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native'
import useAppSelector from '../../redux/hooks/useAppSelector'
import { FlashList } from '@shopify/flash-list'
import ListItem from './ListItem'
import Header from '../headers/Header'
import CustomTouchableOpacity from '../btn/CustomTouchableOpacity'
import LoadingContainer from '../loading/LoadingContainer'
import data from './data'
import {
  reducer,Actions,initialState
} from './reducer'
import useAuthApi from '../../services/hooks/useAuthApi'
import { useSocket } from '../../context/SocketProvider'


const RecentChats = () => {
  const navigation = useNavigation()
  console.log("chat compoentttt")
  const authUser = useAppSelector(state=>state.auth)
  const theme = useTheme()
  const route = useRoute()
  const {receiver,conversationId} = route.params
  console.log({receiver,conversationId,authUser} )
  const [messages,dispatch] = useReducer(reducer,initialState)
  const api = useAuthApi()
  const textMsgRef = useRef({__msg:""})
  const {colorMode} = useColorMode()
  const socket = useSocket()
  

  const handleChangeText = useCallback((val:string)=>{
    textMsgRef.current.__msg = val
  },[])

  const handleClearMsg = useCallback(()=>{
    textMsgRef.current.clear()
  },[])

  useEffect(()=>{
    const fetchMessages = async () => {
      try{
        dispatch({type:Actions.LoadingStart})
        const res =  await api.get(`/chat/one-to-one/messages?conversationId=${conversationId}`)
        console.log(res.data)
        dispatch({type:Actions.FetchData,payload:res.data.messages})
      }catch(err){
        console.log("message err================",err)
        dispatch({type:Actions.Error,payload:err.message})
      }
    }
    socket?.emit('one_to_one_join_room',conversationId)
    socket?.on('one_to_one_receive_message',msg=>{
      dispatch({type:Actions.AppendData,payload:msg})

    })
    fetchMessages()
  },[])

  const handleSendMessage = useCallback(async ()=>{
    const res = await api.post('chat/one-to-one/send-message',{
      "receiverId":receiver._id,
      "textMsg":textMsgRef.current.__msg,
      "conversationId":conversationId,
      "messageType":"Text"
    })
    const msg = {
      "conversationId":conversationId,
      "messageType":"Text",
      sender:authUser.user,
      receiver,
      "textMsg":textMsgRef.current.__msg,
    }
    socket?.emit('one_to_one_send_message',{ room_id:conversationId, data:msg })
    dispatch({type:Actions.AppendData,payload:msg})
    console.log(res.data)
    handleClearMsg()

  },[textMsgRef.current?.__msg])


  return (
    <VStack flex={1} >
      <Header label="Dhritesh kumar" />
      <LoadingContainer error={messages.error} initialLoading={messages.loading} loadingMessage='Loading Messages ...' >
        <Box flex={1} px={2} py={2} >
            <FlashList 
              // ListHeaderComponent={<ListHeaderComponent/>}
              data={messages.data}
              // keyExtractor={item=>item._id.toString()}
              renderItem={({item,index})=><ListItem item={item} index={index} />}
              estimatedItemSize={58}
              inverted
              // ItemSeparatorComponent={()=><Box my={2} />}
              showsVerticalScrollIndicator={false}
            />
            <HStack space={2} alignItems="center"  >
              <TextArea 
                ref={textMsgRef}
                rightElement={
                  <CustomTouchableOpacity onPress={handleClearMsg} >
                    <Entypo size={16} style={{marginRight:5}} name="circle-with-cross" />
                  </CustomTouchableOpacity>
                }
                onChangeText={handleChangeText}
                placeholderTextColor={colorMode==="dark"?'warmGray.300':'coolGray.400'}
                fontSize={16} w={'full'} borderColor={'blue.300'} _focus={{borderColor:"blue.400"}} autoCompleteType  placeholder="Write your message ..." flex={1} />
              <CustomTouchableOpacity onPress={handleSendMessage} >
                <Ionicons name="send" size={36} color={theme.colors.blue['500']} />
              </CustomTouchableOpacity>
            </HStack>
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