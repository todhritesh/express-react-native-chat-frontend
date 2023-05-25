import { HStack, Spinner } from 'native-base';
import React from 'react'
import { TouchableOpacity , TouchableOpacityProps } from 'react-native'
interface ICustomTouchableOpacityProps extends TouchableOpacityProps {
  children : React.ReactNode;
  loading?:boolean;
}
const CustomTouchableOpacity : React.FC<ICustomTouchableOpacityProps> = ({children,loading,...props}) => {
  return (
    <TouchableOpacity disabled={loading} {...props} activeOpacity={.75} >
      {
        loading ? 
        <Spinner color={'blue.500'} size={30}  />
        :
        children
      }
    </TouchableOpacity>
  )
}

export default CustomTouchableOpacity