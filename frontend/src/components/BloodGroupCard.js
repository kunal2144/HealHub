import { Box, Button, Text, VStack } from '@gluestack-ui/react'
import global from '../styles'
import React from 'react'

const BloodGroupCard = ({ navigation }) => {
  return (
    <Box
      width={'40%'}
      height={250}
      borderRadius={20}
      backgroundColor="#158AAD"
      flexGrow={1}
      padding={18}
      gap={10}
      borderColor="black"
      borderWidth={1}
      style={global.shadow}
    >
      <VStack alignItems="center" height={'100%'}>
        <Text
          color="#ffffff"
          fontFamily="Poppins_600SemiBold"
          fontSize={22}
          lineHeight={24}
        >
          Blood Group
        </Text>
        <Text
          fontFamily="Poppins_700Bold"
          lineHeight={150}
          fontSize={70}
          color="#ffffff"
        >
          AB+
        </Text>
        <Button
          borderRadius={15}
          borderColor="black"
          borderWidth={1}
          backgroundColor="#D0F4FF"
          width={'100%'}
          paddingHorizontal={5}
          height={35}
          position="absolute"
          bottom={0}
          onPress={() => navigation.navigate('Profile')}
        >
          <Text fontSize={16} fontFamily="Poppins_600SemiBold" color="black">
            More Info
          </Text>
        </Button>
      </VStack>
    </Box>
  )
}

export default BloodGroupCard
