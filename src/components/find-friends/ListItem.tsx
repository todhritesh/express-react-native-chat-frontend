import { Avatar, HStack, Text, Toast, VStack, useTheme } from 'native-base'
import React from 'react'
import CustomTouchableOpacity from '../btn/CustomTouchableOpacity';
import Ionicons from 'react-native-vector-icons/Ionicons'
import useSendFriendRequest from './hooks/useSendFriendRequest';

type ListItemProps = {
    item : any;
    index : number;
}

const ListItem : React.FC<ListItemProps> = ({item,index}) => {
    const theme = useTheme()
    const [loading,error,sendFriendRequest] = useSendFriendRequest(item)

    if(error){  
        Toast.show({
            title:error,
            bg:'error.400',
            duration:3000,
        })
    }
  return (
    <CustomTouchableOpacity  >
        <HStack alignItems='center' justifyContent="space-between" py={2} >
            <HStack alignItems='center' space={3} >
                <Avatar source={{uri:"https://picsum.photos/333/333"}} size={'md'} />
                <VStack>
                    <Text fontSize={18} fontWeight="bold" >{item.name}</Text>
                    <Text fontSize={14} >{item.email}</Text>
                </VStack>
            </HStack>
            {
                item.defaultStatus &&
                <HStack mr={2} >
                    <CustomTouchableOpacity loading={loading} onPress={()=>sendFriendRequest()} >
                        <Ionicons name="person-add-sharp"  color={theme.colors.blue['500']} size={30} />
                    </CustomTouchableOpacity>
                </HStack>
            }
        </HStack>
    </CustomTouchableOpacity>
  )
}

export default React.memo(ListItem)