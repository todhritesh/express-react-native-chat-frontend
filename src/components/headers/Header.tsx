import { HStack, Text, VStack } from 'native-base'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import CustomTouchableOpacity from '../btn/CustomTouchableOpacity';

type THeaderProps = {
    label:string;
}

const Header : React.FC<THeaderProps> = ({label}) => {
  return (
    <VStack py={4} bg="blue.500" w={'full'} px={2} >
        <HStack space={4} >
            <CustomTouchableOpacity>
                <Ionicons name="arrow-back" size={28} color="white" />
            </CustomTouchableOpacity>

            <Text color="white" fontSize={20} fontWeight="bold"  >{label}</Text>
        </HStack>
    </VStack>
  )
}

export default Header