import { Box, useColorMode , IBoxProps } from 'native-base'
import React from 'react'

interface IThemeBoxProps extends IBoxProps {
    children? : React.ReactNode;
}
const ThemeBox : React.FC<IThemeBoxProps> = ({children,...props}) => {
    const {colorMode} = useColorMode()
    
  return (
    <Box  bg={colorMode === "dark" ? "coolGray.800" : "warmGray.50"} flex={1} {...props}>
        {children}
    </Box>
  )
}

export default ThemeBox