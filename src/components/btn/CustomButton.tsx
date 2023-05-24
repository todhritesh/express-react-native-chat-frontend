import { TouchableOpacity,StyleSheet } from 'react-native'
import React from 'react'
import { Button, Text } from 'native-base'

interface ICustomBtnProps {
    label:string;
    onPress:() => void;
}

const CustomBtn : React.FC<ICustomBtnProps> = ({label,onPress}) => {
  return (
    <Button bg={'secondary.600'} px={4} _pressed={{bg:'secondary.700'}} onPress={onPress}  >{label}</Button>

  )
}

export default CustomBtn

const styles = StyleSheet.create({
    btn : {
        padding:10,
        borderRadius:10,
        paddingHorizontal:20
    }
})