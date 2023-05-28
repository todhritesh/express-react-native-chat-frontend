import { Avatar, HStack, Text, VStack, useTheme } from 'native-base'
import React from 'react'
import CustomTouchableOpacity from '../btn/CustomTouchableOpacity';
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import useFriendRequest from './hooks/useFriendRequest';


type ListItemProps = {
    item : any;
    index : number;
}

const ListItem : React.FC<ListItemProps> = ({item,index}) => {
    const theme = useTheme()
    const [acceptLoading,rejectLoading,error,acceiptRequest,rejectRequest] = useFriendRequest(item)
  return (
      <CustomTouchableOpacity>
          <HStack alignItems='center' justifyContent="space-between" my={2} >
              <HStack alignItems='center' space={3} >
                  <Avatar source={{ uri: "https://picsum.photos/333/333" }} size={'md'} />
                  <VStack>
                      <Text fontSize={18} fontWeight="bold" >{item.name}</Text>
                      <Text fontSize={14} >{item.email}</Text>
                  </VStack>
              </HStack>
              {
                item.defaultStatus &&
                <HStack mr={2} space={4} >
                  <CustomTouchableOpacity loading={acceptLoading} disabled={acceptLoading || rejectLoading} onPress={() => acceiptRequest()} >
                      <FontAwesome color={theme.colors.blue['500']} name="check" size={30} />
                  </CustomTouchableOpacity>
                  <CustomTouchableOpacity loading={rejectLoading} disabled={acceptLoading || rejectLoading} onPress={() => rejectRequest()} >
                      <Entypo color={theme.colors.error['500']} name="cross" size={30} />
                  </CustomTouchableOpacity>
              </HStack>
              }
          </HStack>
      </CustomTouchableOpacity>
  )
}

export default React.memo(ListItem)