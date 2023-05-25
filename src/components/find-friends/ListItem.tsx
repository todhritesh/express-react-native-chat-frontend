import { Avatar, HStack, Text, VStack, useTheme } from 'native-base'
import React from 'react'
import CustomTouchableOpacity from '../btn/CustomTouchableOpacity';
import Ionicons from 'react-native-vector-icons/Ionicons'

type ListItemProps = {
    item : any;
    index : number;
}

const ListItem : React.FC<ListItemProps> = ({item,index}) => {

    const theme = useTheme()
  return (
    <CustomTouchableOpacity>
        <HStack alignItems='center' justifyContent="space-between" my={2} >
            <HStack alignItems='center' space={2} >
                <Avatar source={{uri:"https://picsum.photos/333/333"}} size={'md'} />
                <VStack>
                    <Text fontSize={18} fontWeight="bold" >Dhritesh {item.id}</Text>
                    <Text fontSize={14} >dhritesh@gmail.com</Text>
                </VStack>
            </HStack>
            <HStack mr={2} >
                <CustomTouchableOpacity loading={false} >
                    <Ionicons name="person-add-sharp"  color={theme.colors.blue['500']} size={30} />
                </CustomTouchableOpacity>
            </HStack>
        </HStack>
    </CustomTouchableOpacity>
  )
}

export default React.memo(ListItem)