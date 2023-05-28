import { HStack, Text, VStack } from 'native-base'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import CustomTouchableOpacity from '../btn/CustomTouchableOpacity';
import { useNavigation } from '@react-navigation/native';

type THeaderProps = {
    label:string;
}

const Header : React.FC<THeaderProps> = ({label}) => {
  const navigation = useNavigation()
  return (
    <VStack py={4} bg="blue.500" w={'full'} px={2} >
        <HStack space={4} >
            <CustomTouchableOpacity onPress={()=>navigation.goBack()} >
                <Ionicons name="arrow-back" size={28} color="white" />
            </CustomTouchableOpacity>

            <Text color="white" fontSize={20} fontWeight="bold"  >{label}</Text>
        </HStack>
    </VStack>
  )
}

export default Header