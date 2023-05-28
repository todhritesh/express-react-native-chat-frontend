import { Avatar, HStack, Text, Toast, VStack, useTheme } from 'native-base'
import React from 'react'
import CustomTouchableOpacity from '../btn/CustomTouchableOpacity';
import Entypo from 'react-native-vector-icons/Entypo'
import useCancelSentRequest from './hooks/useCancelSentRequest';

type ListItemProps = {
    item : any;
    index : number;
}

const ListItem : React.FC<ListItemProps> = ({item,index}) => {
    const theme = useTheme()
    const [loading,error,cancelSentRequest] = useCancelSentRequest(item)

    if(error){  
        Toast.show({
            title:error,
            bg:'error.400',
            duration:3000,
        })
    }
  return (
    <CustomTouchableOpacity>
        <HStack alignItems='center' justifyContent="space-between" my={2} >
            <HStack alignItems='center' space={3} >
                <Avatar source={{uri:"https://picsum.photos/333/333"}} size={'md'} />
                <VStack>
                    <Text fontSize={18} fontWeight="bold" >{item.name}</Text>
                    <Text fontSize={14} >{item.email}</Text>
                </VStack>
            </HStack>
            {
                item.defaultStatus &&
                <HStack mr={2} space={3} >
                    <CustomTouchableOpacity loading={loading} onPress={()=>cancelSentRequest()} >
                        <Entypo color={theme.colors.error['500']} name="cross" size={30} />
                    </CustomTouchableOpacity>
                </HStack>
            }
        </HStack>
    </CustomTouchableOpacity>
  )
}

export default React.memo(ListItem)