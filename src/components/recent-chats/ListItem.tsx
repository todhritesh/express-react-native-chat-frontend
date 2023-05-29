import { Avatar, HStack, Text, VStack, useTheme } from 'native-base'
import React from 'react'
import CustomTouchableOpacity from '../btn/CustomTouchableOpacity';
import Entypo from 'react-native-vector-icons/Entypo'
import { useNavigation, useRoute } from '@react-navigation/native';
import NAVIGATIONROUTES from '../../constants/navigation-routes';

type ListItemProps = {
    item : any;
    index : number;
}

const ListItem : React.FC<ListItemProps> = ({item,index}) => {
    const theme = useTheme()
    const route = useRoute()
    const userId = route.params?.userId
    const navigation = useNavigation()
  return (
    <CustomTouchableOpacity>
        <HStack  bg={userId === item._id ? 'blue.200':''}  alignItems='center' justifyContent="space-between" py={2} >
            <HStack alignItems='center' space={3} >
                <Avatar source={{uri:"https://picsum.photos/333/333"}} size={'md'} />
                <VStack>
                    <Text fontSize={18} fontWeight="bold" >{item.participants[0].name}</Text>
                    <Text fontSize={14} >{item.participants[0].email}</Text>
                </VStack>
            </HStack>
            <HStack mr={2} >
                <CustomTouchableOpacity onPress={()=>navigation.navigate(NAVIGATIONROUTES.Chat,{conversationId:item._id,receiver:item.participants[0]})} >
                    <Entypo color={theme.colors.blue['500']} name="chat" size={24} />
                </CustomTouchableOpacity>
            </HStack>
        </HStack>
    </CustomTouchableOpacity>
  )
}

export default React.memo(ListItem)