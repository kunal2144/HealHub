import React, { useContext } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { FontAwesome5 } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'
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
import * as SecureStore from 'expo-secure-store'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-gesture-handler'

const Home = () => {
  const { setUserToken, userData } = useContext(AuthContext)

  const logout = async () => {
    await SecureStore.deleteItemAsync('JWT_TOKEN')
    setUserToken(null)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View height={'100%'} width={'95%'}>
        <View height={'95%'}>
          <ScrollView>
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
                      backgroundColor="#D0F4FF"
                      width={'100%'}
                      paddingHorizontal={5}
                      height={35}
                      position="absolute"
                      bottom={0}
                    >
                      <Text fontSize={16} fontFamily="Poppins_600SemiBold">
                        Update
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
                >
                  <VStack alignItems="left" height={'100%'} gap={10}>
                    <HStack justifyContent="space-between" flexDirection="row">
                      <Text
                        color="#ffffff"
                        fontFamily="Poppins_600SemiBold"
                        fontSize={22}
                        lineHeight={24}
                      >
                        Malaria
                      </Text>
                      <FontAwesome5 name="virus" size={40} color="black" />
                    </HStack>
                    <Text
                      fontFamily="Poppins_600SemiBold"
                      fontSize={16}
                      color="#ffffff"
                    >
                      Mosquito-borne, life-threatening blood infection causing
                      recurring fever and chills...
                    </Text>
                    <HStack gap={5} position="absolute" bottom={0} right={0}>
                      <Text
                        fontFamily="Poppins_600SemiBold"
                        fontSize={15}
                        color="#ffffff"
                      >
                        View More
                      </Text>
                      <AntDesign name="arrowright" size={24} color="white" />
                    </HStack>
                  </VStack>
                </Box>
              </HStack>
              <Box
                height={250}
                borderRadius={20}
                backgroundColor="#158AAD"
                padding={18}
                gap={10}
              >
                <VStack>
                  <HStack gap={10} alignItems="center">
                    <Image source={require('../assets/Logo.png')} size="xl" />
                    <VStack gap={10}>
                      <Text fontFamily="Poppins_600SemiBold" color="black">
                        Dr. Ajin Giny K.
                      </Text>
                      <Text> 10:00 AM </Text>
                      <Text> General Consultation</Text>
                    </VStack>
                  </HStack>
                </VStack>
              </Box>
              <Box
                height={300}
                borderRadius={20}
                backgroundColor="#158AAD"
              ></Box>
            </VStack>
          </ScrollView>
        </View>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.touchableOpacityStyle}
        >
          <HStack gap={60}>
            <AntDesign name="home" size={24} color="black" />
            <FontAwesome5 name="capsules" size={24} color="black" />
            <AntDesign name="calendar" size={24} color="black" />
            <Ionicons
              name="person-outline"
              size={24}
              color="black"
              onPress={logout}
            />
            {/* RN Navigation Bottom Tabs */}
          </HStack>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#D0F4FF',
    alignItems: 'center',
    paddingTop: 10
  },
  image: {
    width: 157,
    height: 157
  },
  touchableOpacityStyle: {
    position: 'absolute',
    width: '100%',
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 10,
    borderRadius: 18,
    borderColor: '#158AAD',
    borderWidth: 1,
    backgroundColor: '#F4F4F4'
  },
  login: {
    flexDirection: 'row',
    gap: 10,
    height: 45,
    backgroundColor: '#158AAD',
    borderRadius: 10,
    padding: 9,
    justifyContent: 'center',
    alignItems: 'center'
  },
  signup: {
    flexDirection: 'row',
    gap: 10,
    height: 45,
    backgroundColor: 'transparent',
    borderRadius: 10,
    borderColor: '#005D79',
    borderWidth: 1,
    padding: 9,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default Home
