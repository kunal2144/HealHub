import { Box, HStack, Image, Text, VStack } from '@gluestack-ui/react'
import DoctorImage from '../assets/stock-doctor.jpeg'
import global from '../styles'
import React from 'react'
import { Button } from 'react-native'

export const PreviousConsultations = ({ navigation }) => {
  return (
    <Box
      borderRadius={20}
      backgroundColor="#158AAD"
      borderColor="black"
      borderWidth={1}
      style={global.shadow}
    >
      <VStack gap={10} padding={20}>
        <Box
          borderRadius={20}
          backgroundColor="#D0F4FF"
          borderColor="black"
          borderWidth={1}
          padding={10}
        >
          <HStack justifyContent="space-between" alignItems="center">
            <Image
              source={DoctorImage}
              size="sm"
              borderColor="white"
              borderWidth={2}
              borderRadius={100}
            />
            <Box height={'100%'} width={1} backgroundColor="black"></Box>
            <VStack>
              <Text fontFamily="Poppins_700Bold" color="black">
                Dr. Ajin Giny K.
              </Text>
              <Text color="black">Orthopaedic</Text>
              <Text color="black">12/06/2023</Text>
            </VStack>
            <Box height={'100%'} width={1} backgroundColor="black"></Box>
            <Button
              backgroundColor="#D0F4FF"
              height={35}
              onPress={() => navigation.navigate('Consultations')}
            >
              <Text
                fontSize={16}
                fontFamily="Poppins_600SemiBold"
                color="black"
                marginRight={10}
              >
                View
              </Text>
            </Button>
          </HStack>
        </Box>
        <Box
          borderRadius={20}
          backgroundColor="#D0F4FF"
          borderColor="black"
          borderWidth={1}
          padding={10}
        >
          <HStack justifyContent="space-between" alignItems="center">
            <Image
              source={DoctorImage}
              size="sm"
              borderColor="white"
              borderWidth={2}
              borderRadius={100}
            />
            <Box height={'100%'} width={1} backgroundColor="black"></Box>
            <VStack>
              <Text fontFamily="Poppins_700Bold" color="black">
                Dr. Ajin Giny K.
              </Text>
              <Text color="black">Orthopaedic</Text>
              <Text color="black">12/06/2023</Text>
            </VStack>
            <Box height={'100%'} width={1} backgroundColor="black"></Box>
            <Button
              backgroundColor="#D0F4FF"
              height={35}
              onPress={() => navigation.navigate('Consultations')}
            >
              <Text
                fontSize={16}
                fontFamily="Poppins_600SemiBold"
                color="black"
                marginRight={10}
              >
                View
              </Text>
            </Button>
          </HStack>
        </Box>
        <Button
          borderRadius={15}
          borderColor="black"
          borderWidth={1}
          backgroundColor="#D0F4FF"
          width={'100%'}
          paddingHorizontal={5}
          height={35}
          onPress={() => navigation.navigate('Consultations')}
        >
          <Text fontSize={16} fontFamily="Poppins_600SemiBold" color="black">
            View All
          </Text>
        </Button>
      </VStack>
    </Box>
  )
}
