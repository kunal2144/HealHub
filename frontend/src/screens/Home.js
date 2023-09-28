import React, { useContext, useEffect, useState } from 'react'
import {
  Avatar,
  AvatarFallbackText,
  Box,
  Button,
  HStack,
  Image,
  Text,
  VStack
} from '@gluestack-ui/react'
import { AuthContext } from '../components/AuthContext'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-gesture-handler'
import DoctorImage from '../assets/stock-doctor.jpeg'
import { StyleSheet, View } from 'react-native'
import { BASE_URL } from '@env'
import axios from 'axios'

const Home = ({ navigation }) => {
  const { userData } = useContext(AuthContext)
  const [disease, setDisease] = useState(null)

  useEffect(() => {
    async function getDisease() {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        }
        const { data } = await axios.get(`${BASE_URL}api/disease/today`, {
          config
        })
        setDisease(data)
      } catch (error) {
        console.log(error)
      }
    }

    getDisease()
  }, [])

  if (!disease) return null

  return (
    <SafeAreaView style={styles.container}>
      <View height={'100%'} width={'95%'}>
        <View height={'95%'}>
          <ScrollView style={{ marginBottom: 10 }}>
            <VStack gap={10} marginBottom={50}>
              <Box
                height={80}
                width={'100%'}
                backgroundColor="white"
                borderColor="#158AAD"
                borderWidth={1}
                borderRadius={18}
              >
                <HStack
                  justifyContent="center"
                  alignItems="center"
                  height={'100%'}
                  gap={30}
                >
                  <Box>
                    <Text
                      fontFamily="Poppins_700Bold"
                      color={'black'}
                      lineHeight={26}
                      fontSize={20}
                    >
                      Good morning{' '}
                      {userData.firstName > 7 ? '' : userData.firstName},
                    </Text>
                    <Text fontFamily="Poppins_400Regular">
                      How are you doing today?
                    </Text>
                  </Box>
                  <Avatar>
                    <AvatarFallbackText>
                      {`${userData.firstName} ${userData.lastName}`}
                    </AvatarFallbackText>
                  </Avatar>
                </HStack>
              </Box>
              <HStack gap={10} justifyContent="space-between">
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
                    >
                      <Text
                        fontSize={16}
                        fontFamily="Poppins_600SemiBold"
                        color="black"
                      >
                        More Info
                      </Text>
                    </Button>
                  </VStack>
                </Box>
                <Box
                  width={'40%'}
                  height={250}
                  borderRadius={20}
                  backgroundColor="#158AAD"
                  flexGrow={1}
                  padding={18}
                  borderColor="black"
                  borderWidth={1}
                >
                  <VStack
                    alignItems="center"
                    height={'100%'}
                    justifyContent="space-between"
                  >
                    <Text
                      color="#ffffff"
                      fontFamily="Poppins_600SemiBold"
                      fontSize={22}
                      lineHeight={24}
                      ellipsizeMode="tail"
                      numberOfLines={1}
                    >
                      {disease['Name']}
                    </Text>
                    <Text
                      fontFamily="Poppins_600SemiBold"
                      fontSize={16}
                      color="#ffffff"
                      numberOfLines={5}
                    >
                      {disease['Description']}
                    </Text>
                    <Button
                      borderRadius={15}
                      borderColor="black"
                      borderWidth={1}
                      backgroundColor="#D0F4FF"
                      width={'100%'}
                      paddingHorizontal={5}
                      height={35}
                      onPress={() =>
                        navigation.navigate('Disease', {
                          disease
                        })
                      }
                    >
                      <Text
                        fontSize={16}
                        fontFamily="Poppins_600SemiBold"
                        color="black"
                      >
                        Read More
                      </Text>
                    </Button>
                  </VStack>
                </Box>
              </HStack>
              <Text
                textAlign="center"
                fontFamily="Poppins_700Bold"
                color="black"
                textShadowOffset={{ width: 0, height: 3 }}
                textShadowRadius={3}
                textShadowColor="rgba(0, 0, 0, 0.25)"
              >
                Upcoming Appointments
              </Text>
              <Box
                borderRadius={20}
                backgroundColor="#158AAD"
                padding={18}
                borderColor="black"
                borderWidth={1}
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
                      <Text
                        fontFamily="Poppins_600SemiBold"
                        color="white"
                        size="lg"
                      >
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
                    <Text
                      fontSize={16}
                      fontFamily="Poppins_600SemiBold"
                      color="black"
                    >
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
                      <Text
                        fontSize={16}
                        fontFamily="Poppins_600SemiBold"
                        color="black"
                      >
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
                      <Text
                        fontSize={16}
                        fontFamily="Poppins_600SemiBold"
                        color="black"
                      >
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
                      <Text
                        fontSize={16}
                        fontFamily="Poppins_600SemiBold"
                        color="black"
                      >
                        View All
                      </Text>
                    </Button>
                  </HStack>
                </VStack>
              </Box>
              <Text
                textAlign="center"
                fontFamily="Poppins_700Bold"
                color="black"
                textShadowOffset={{ width: 0, height: 3 }}
                textShadowRadius={3}
                textShadowColor="rgba(0, 0, 0, 0.25)"
              >
                Previous Appointments
              </Text>
              <Box
                borderRadius={20}
                backgroundColor="#158AAD"
                borderColor="black"
                borderWidth={1}
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
                      <Box
                        height={'100%'}
                        width={1}
                        backgroundColor="black"
                      ></Box>
                      <VStack>
                        <Text fontFamily="Poppins_700Bold" color="black">
                          Dr. Ajin Giny K.
                        </Text>
                        <Text color="black">Orthopaedic</Text>
                        <Text color="black">12/06/2023</Text>
                      </VStack>
                      <Box
                        height={'100%'}
                        width={1}
                        backgroundColor="black"
                      ></Box>
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
                      <Box
                        height={'100%'}
                        width={1}
                        backgroundColor="black"
                      ></Box>
                      <VStack>
                        <Text fontFamily="Poppins_700Bold" color="black">
                          Dr. Ajin Giny K.
                        </Text>
                        <Text color="black">Orthopaedic</Text>
                        <Text color="black">12/06/2023</Text>
                      </VStack>
                      <Box
                        height={'100%'}
                        width={1}
                        backgroundColor="black"
                      ></Box>
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
                </VStack>
              </Box>
            </VStack>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#D0F4FF',
    alignItems: 'center'
  },
  image: {
    width: 157,
    height: 157
  }
})

export default Home
