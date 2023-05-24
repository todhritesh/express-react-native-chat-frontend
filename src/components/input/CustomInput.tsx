import { Input , IInputProps, useColorMode  } from 'native-base'
import React  from 'react'

const CustomInput : React.FC<IInputProps> = (props) => {
  const {colorMode} = useColorMode()
  return (
    <Input placeholderTextColor={colorMode==="dark"?'warmGray.300':'coolGray.400'} fontSize={16} w={'full'} borderColor={'secondary.300'} _focus={{borderColor:"secondary.400"}} {...props} />
  )
}

export default CustomInput