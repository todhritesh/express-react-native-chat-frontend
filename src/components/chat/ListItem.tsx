import { Avatar, HStack, Text, VStack, useTheme } from 'native-base'
import React from 'react'
import CustomTouchableOpacity from '../btn/CustomTouchableOpacity';
import Entypo from 'react-native-vector-icons/Entypo'
import { useRoute } from '@react-navigation/native';
import useAppSelector from '../../redux/hooks/useAppSelector';

type ListItemProps = {
    item : any;
    index : number;
}

const ListItem : React.FC<ListItemProps> = ({item,index}) => {
    const theme = useTheme()
    const route = useRoute()
    const userId = route.params?.userId
    const sender = useAppSelector(state=>state.auth).user
  return (
    <CustomTouchableOpacity>
        <HStack my={3} alignItems='center' justifyContent={item.sender._id===sender._id ? "flex-end":"flex-start"} >
            <HStack  flexDirection={item.sender._id===sender._id ? 'row-reverse':'row'} maxW={'75%'}  alignItems='flex-end' space={2} >
                <Avatar source={{uri:"https://picsum.photos/333/333"}} size={'sm'} />
                <VStack borderTopRadius={12} borderBottomRightRadius={item.sender._id===sender._id ?0:12} borderBottomLeftRadius={item.sender._id===sender._id ?12:0} bg={item.sender._id===sender._id ? 'blue.500':'blueGray.300'} p={1.5} >
                    <Text textAlign={'left'} color={item.sender._id===sender._id?'white':'blueGray.900'} fontSize={16} fontWeight="medium" > {item.textMsg} </Text>
                </VStack>
            </HStack>
        </HStack>
    </CustomTouchableOpacity>
  )
}

export default React.memo(ListItem)