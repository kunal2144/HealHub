import { Box, Button, HStack, Image, Text, VStack } from '@gluestack-ui/react'
import DoctorImage from '../assets/stock-doctor.jpeg'
import DoctorImageThumbs from '../assets/stock-doctor-thumbs-up.jpg'
import global from '../styles'
import React, { useContext } from 'react'
import { AuthContext } from './AuthContext'
import PropTypes from 'prop-types'

const getIST = (date) => {
  let time = date
    .toLocaleString(undefined, { timeZone: 'Asia/Calcutta' })
    .split(', ')[1]
    .split(':')

  return `${time[0]}:${time[1]} ${time[2].slice(-2)}`
}

const UpcomingConsultations = ({ navigation, basic }) => {
  const { consultations } = useContext(AuthContext)
  if (consultations['upcoming'].length === 0) {
    if (!basic) {
      return <NoUpcomingConsultations navigation={navigation} />
    } else {
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
              No Upcoming Appointments
            </Text>
          </VStack>
        </Box>
      )
    }
  }
  return (
    <Box
      borderRadius={20}
      backgroundColor="#158AAD"
      borderColor="black"
      borderWidth={1}
      style={global.shadow}
    >
      <VStack gap={10} padding={18}>
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
          <VStack gap={2} justifyContent="flex-end">
            <Text fontFamily="Poppins_600SemiBold" color="white" size="lg">
              {consultations['upcoming'][0].doctor_id.name}
            </Text>
            <Text color="white" size="md">
              {getIST(new Date(consultations['upcoming'][0].start_datetime))}
              {', '}
              {new Date(consultations['upcoming'][0].start_datetime)
                .toDateString()
                .split(' ')
                .slice(1, 4)
                .join(' ')}
              {'\n'}
              {consultations['upcoming'][0].category}
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
            Message
          </Text>
        </Button>
        <HStack alignItems="center" gap={10} justifyContent="space-between">
          <Button
            borderRadius={15}
            borderColor="black"
            borderWidth={1}
            flexGrow={1}
            backgroundColor="#D0F4FF"
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
            flexGrow={1}
            backgroundColor="#D0F4FF"
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

UpcomingConsultations.defaultProps = {
  basic: false
}

UpcomingConsultations.propTypes = {
  navigation: PropTypes.object,
  basic: PropTypes.bool
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
              Someone&apos;s been keeping well!{'\n'}If you ever feel the need
              for a check, we&apos;re right here!
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
