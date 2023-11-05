import { Box, HStack, Image, Text, VStack, Button } from '@gluestack-ui/react'
import DoctorImage from '../assets/stock-doctor.jpeg'
import global from '../styles'
import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { AuthContext } from './AuthContext'

const PreviousConsultations = ({ navigation }) => {
  const { consultations } = useContext(AuthContext)
  if (consultations['past'].length === 0) {
    return <NoPreviousConsultations />
  }
  return (
    <Box
      borderRadius={20}
      backgroundColor="#158AAD"
      borderColor="black"
      borderWidth={1}
      style={global.shadow}
    >
      <VStack gap={10} padding={20}>
        <Text
          fontFamily={'Poppins_600SemiBold'}
          color={'white'}
          size="lg"
          textAlign="center"
        >
          Previous Consultations
        </Text>
        {consultations['past'].slice(0, 2).map((consultation, index) => (
          <Box
            borderRadius={20}
            backgroundColor="#D0F4FF"
            borderColor="black"
            borderWidth={1}
            padding={10}
            key={index}
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
                  {consultation.doctor_id.name}
                </Text>
                <Text color="black">{consultation.category}</Text>
                <Text color="black">
                  {new Date(consultation.start_datetime)
                    .toDateString()
                    .split(' ')
                    .slice(1, 4)
                    .join(' ')}
                </Text>
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
        ))}
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

PreviousConsultations.propTypes = {
  navigation: PropTypes.object,
  consultations: PropTypes.object
}

const NoPreviousConsultations = () => {
  return (
    <Box
      borderRadius={20}
      backgroundColor="#158AAD"
      borderColor="black"
      borderWidth={1}
      style={global.shadow}
    >
      <VStack gap={10} padding={20}>
        <Text fontFamily="Poppins_700Bold" color="white" textAlign="center">
          No Previous Appointments
        </Text>
      </VStack>
    </Box>
  )
}

export { PreviousConsultations, NoPreviousConsultations }
