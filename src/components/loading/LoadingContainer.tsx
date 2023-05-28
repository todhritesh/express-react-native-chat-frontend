import React from 'react'
import { Box, Text, VStack, useTheme } from 'native-base'
import CustomSpinner from './CustomSpinner';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

type LoadingContainerProps = {
  initialLoading:boolean;
    children:React.ReactNode;
    loadingMessage:string;
    error:string;
}

const LoadingContainer : React.FC<LoadingContainerProps> = ({initialLoading,children,loadingMessage,error}) => {
    const theme = useTheme()
    if(error){
        return (
            <Box flex={1} justifyContent='center' alignItems={'center'} >
                <VStack space={4} justifyContent={'center'} w="95%" alignItems='center' >
                  <MaterialIcons name='error' size={84} color={theme.colors.error['500']} />
                  <Text fontWeight='bold' fontSize={24} >{error}</Text>
                </VStack>
            </Box>
          )
    }

    if(initialLoading){
        return (
            <Box flex={1} justifyContent='center' alignItems={'center'} >
                <VStack space={4} >
                  <CustomSpinner />
                  <Text fontWeight='bold' fontSize={24} >{loadingMessage}</Text>
                </VStack>
            </Box>
          )
    }

  return (
    <Box flex={1} >
        {children}
    </Box>
  )
}

export default LoadingContainer