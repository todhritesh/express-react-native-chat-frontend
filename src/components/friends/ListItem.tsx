import { Avatar, HStack, Text, VStack, useTheme } from 'native-base'
import React from 'react'
import CustomTouchableOpacity from '../btn/CustomTouchableOpacity';
import Entypo from 'react-native-vector-icons/Entypo'
import { useRoute } from '@react-navigation/native';

type ListItemProps = {
    item : any;
    index : number;
}

const ListItem : React.FC<ListItemProps> = ({item,index}) => {
    const theme = useTheme()
    const route = useRoute()
    const userId = route.params?.userId
  return (
    <CustomTouchableOpacity>
        <HStack  bg={userId === item._id ? 'blue.200':''}  alignItems='center' justifyContent="space-between" py={2} >
            <HStack alignItems='center' space={3} >
                <Avatar source={{uri:"https://picsum.photos/333/333"}} size={'md'} />
                <VStack>
                    <Text fontSize={18} fontWeight="bold" >{item.name}</Text>
                    <Text fontSize={14} >{item.email}</Text>
                </VStack>
            </HStack>
            <HStack mr={2} >
                <CustomTouchableOpacity >
                    <Entypo color={theme.colors.blue['500']} name="chat" size={24} />
                </CustomTouchableOpacity>
            </HStack>
        </HStack>
    </CustomTouchableOpacity>
  )
}

export default React.memo(ListItem)