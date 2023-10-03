import { Box, Button, HStack, Image, Text, VStack } from '@gluestack-ui/react'
import DoctorImage from '../assets/stock-doctor.jpeg'
import DoctorImageThumbs from '../assets/stock-doctor-thumbs-up.jpg'
import global from '../styles'
import React from 'react'

const UpcomingConsultations = ({ navigation }) => {
  return (
    <Box
      borderRadius={20}
      backgroundColor="#158AAD"
      padding={18}
      borderColor="black"
      borderWidth={1}
      style={global.shadow}
    >
      <VStack gap={10}>
        <HStack gap={10} alignItems="center">
          <Box borderRadius={100} borderWidth={2} borderColor="black">
            <Image
              source={DoctorImage}
              size="xl"
              borderColor="white"
              borderWidth={3}
              borderRadius={100}
            />
          </Box>
          <VStack gap={2}>
            <Text fontFamily="Poppins_600SemiBold" color="white" size="lg">
              Dr. Ajin Giny K.
            </Text>
            <Text color="white" size="md">
              10:00 AM{'\n'}General Consultation
            </Text>
          </VStack>
        </HStack>
        <Button
          borderRadius={15}
          borderColor="black"
          borderWidth={1}
          backgroundColor="#D0F4FF"
          width={'100%'}
          paddingHorizontal={5}
          height={35}
          bottom={0}
        >
          <Text fontSize={16} fontFamily="Poppins_600SemiBold" color="black">
            More Info
          </Text>
        </Button>
        <HStack alignItems="center" justifyContent="space-between">
          <Button
            borderRadius={15}
            borderColor="black"
            borderWidth={1}
            backgroundColor="#D0F4FF"
            width={'30%'}
            paddingHorizontal={5}
            height={35}
            bottom={0}
          >
            <Text fontSize={16} fontFamily="Poppins_600SemiBold" color="black">
              Message
            </Text>
          </Button>
          <Button
            borderRadius={15}
            borderColor="black"
            borderWidth={1}
            backgroundColor="#D0F4FF"
            width={'35%'}
            paddingHorizontal={5}
            height={35}
            bottom={0}
          >
            <Text fontSize={16} fontFamily="Poppins_600SemiBold" color="black">
              Reschedule
            </Text>
          </Button>
          <Button
            borderRadius={15}
            borderColor="black"
            borderWidth={1}
            backgroundColor="#D0F4FF"
            width={'30%'}
            paddingHorizontal={5}
            height={35}
            bottom={0}
            onPress={() => navigation.navigate('Consultations')}
          >
            <Text fontSize={16} fontFamily="Poppins_600SemiBold" color="black">
              View All
            </Text>
          </Button>
        </HStack>
      </VStack>
    </Box>
  )
}

const NoUpcomingConsultations = ({ navigation }) => {
  return (
    <Box
      borderRadius={20}
      backgroundColor="#158AAD"
      padding={10}
      borderColor="black"
      borderWidth={1}
      style={global.shadow}
    >
      <VStack gap={10}>
        <HStack gap={10}>
          <Box borderWidth={0}>
            <Box borderRadius={100} borderWidth={2} borderColor="black">
              <Image
                source={DoctorImageThumbs}
                size="xl"
                borderColor="white"
                borderWidth={3}
                borderRadius={100}
              />
            </Box>
          </Box>
          <VStack gap={5} flexShrink={1}>
            <Text
              color="#ffffff"
              fontFamily="Poppins_700Bold"
              size="lg"
              flexShrink={1}
            >
              No upcoming appointments!
            </Text>
            <Text
              color="#ffffff"
              fontFamily="Poppins_400Regular"
              size="sm"
              flexShrink={1}
            >
              Someone&apos;s been keeping well! If you ever feel the need for a
              check, we&apos;re right here!
            </Text>
          </VStack>
        </HStack>
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
            Book Now
          </Text>
        </Button>
      </VStack>
    </Box>
  )
}

export { UpcomingConsultations, NoUpcomingConsultations }
