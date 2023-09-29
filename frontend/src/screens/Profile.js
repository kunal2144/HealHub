import React, { useContext, useMemo, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
  Box,
  Button,
  ButtonText,
  HStack,
  Input,
  InputInput,
  ModalBackdrop,
  ModalContent,
  Modal,
  Text,
  VStack,
  ModalBody
} from '@gluestack-ui/react'
import { Ionicons } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'
import { Feather } from '@expo/vector-icons'
import { AuthContext } from '../components/AuthContext'
import RadioGroup from 'react-native-radio-buttons-group'
import global from '../styles'

const Profile = () => {
  const [showModal, setShowModal] = useState(false)
  const { userData } = useContext(AuthContext)
  const [selectedId, setSelectedId] = useState()
  const radioButtons = useMemo(() => {
    const commonVals = {
      borderColor: 'white',
      color: 'white',
      fontFamily: 'Poppins_400Regular',
      size: 16
    }
    return [
      {
        id: '1',
        label: 'Male',
        value: 'male',
        ...commonVals
      },
      {
        id: '2',
        label: 'Female',
        value: 'female',
        ...commonVals
      },
      {
        id: '3',
        label: 'Other',
        value: 'other',
        ...commonVals
      }
    ]
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <View height={'100%'} width={'95%'}>
        <View height={'95%'}>
          <ScrollView style={{ marginBottom: 10 }}>
            <VStack gap={15} marginTop={10}>
              <VStack gap={5}>
                <HStack gap={10}>
                  <Ionicons name="person-outline" size={24} color="black" />
                  <Text color="black" fontFamily="Poppins_700Bold" size="2xl">
                    Profile Management
                  </Text>
                </HStack>
                <View
                  style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 1
                  }}
                />
              </VStack>
              <Box
                borderRadius={20}
                backgroundColor="#158AAD"
                padding={18}
                borderColor="black"
                borderWidth={1}
                style={global.shadow}
              >
                <VStack alignItems="center" gap={10}>
                  <Text
                    color="white"
                    fontFamily="Poppins_600SemiBold"
                    size="lg"
                  >
                    Personal Information
                  </Text>
                  <VStack width={'100%'}>
                    <Text
                      color="white"
                      fontFamily="Poppins_400Regular"
                      size="sm"
                      alignSelf="flex-start"
                    >
                      First Name
                    </Text>
                    <Input variant="underlined" size="sm" borderColor="white">
                      <InputInput
                        value={userData.firstName}
                        placeholderTextColor={'white'}
                        color="white"
                        fontFamily="Poppins_600SemiBold"
                        fontSize={16}
                      />
                      <Ionicons name="person-outline" size={24} color="white" />
                    </Input>
                  </VStack>
                  <VStack width={'100%'}>
                    <Text
                      color="white"
                      fontFamily="Poppins_400Regular"
                      size="sm"
                      alignSelf="flex-start"
                    >
                      Last Name
                    </Text>
                    <Input variant="underlined" size="sm" borderColor="white">
                      <InputInput
                        value={userData.lastName}
                        placeholderTextColor={'white'}
                        color="white"
                        fontFamily="Poppins_600SemiBold"
                        fontSize={16}
                      />
                      <Ionicons name="person-outline" size={24} color="white" />
                    </Input>
                  </VStack>
                  <VStack width={'100%'}>
                    <Text
                      color="white"
                      fontFamily="Poppins_400Regular"
                      size="sm"
                      alignSelf="flex-start"
                    >
                      Date of Birth
                    </Text>
                    <Input variant="underlined" size="sm" borderColor="white">
                      <InputInput
                        value={userData.dob ? userData.dob : 'N/A'}
                        placeholderTextColor={'white'}
                        color="white"
                        fontFamily="Poppins_600SemiBold"
                        fontSize={16}
                      />
                      <MaterialCommunityIcons
                        name="cake-variant-outline"
                        size={24}
                        color="white"
                      />
                    </Input>
                  </VStack>

                  <VStack width={'100%'}>
                    <Text
                      color="white"
                      fontFamily="Poppins_400Regular"
                      size="sm"
                      alignSelf="flex-start"
                    >
                      Email
                    </Text>
                    <Input variant="underlined" size="sm" borderColor="white">
                      <InputInput
                        value={userData.email}
                        placeholderTextColor={'white'}
                        color="white"
                        fontFamily="Poppins_600SemiBold"
                        fontSize={16}
                      />
                      <AntDesign name="mail" size={24} color="white" />
                    </Input>
                  </VStack>
                  <VStack width={'100%'}>
                    <Text
                      color="white"
                      fontFamily="Poppins_400Regular"
                      size="sm"
                      alignSelf="flex-start"
                    >
                      Phone Number
                    </Text>
                    <Input variant="underlined" size="sm" borderColor="white">
                      <InputInput
                        value={
                          userData.phoneNumber ? userData.phoneNumber : 'N/A'
                        }
                        placeholderTextColor={'white'}
                        color="white"
                        fontFamily="Poppins_600SemiBold"
                        fontSize={16}
                      />
                      <AntDesign name="phone" size={24} color="white" />
                    </Input>
                  </VStack>
                  <VStack width={'100%'}>
                    <Text
                      color="white"
                      fontFamily="Poppins_400Regular"
                      size="sm"
                      alignSelf="flex-start"
                    >
                      Blood Group
                    </Text>
                    <Input variant="underlined" size="sm" borderColor="white">
                      <InputInput
                        value={
                          userData.bloodGroup ? userData.bloodGroup : 'N/A'
                        }
                        placeholderTextColor={'white'}
                        color="white"
                        fontFamily="Poppins_600SemiBold"
                        fontSize={16}
                      />
                      <Feather name="droplet" size={24} color="white" />
                    </Input>
                  </VStack>
                  <VStack width={'100%'} gap={5}>
                    <Text
                      color="white"
                      fontFamily="Poppins_400Regular"
                      size="sm"
                      alignSelf="flex-start"
                    >
                      Gender
                    </Text>
                    <RadioGroup
                      radioButtons={radioButtons}
                      onPress={setSelectedId}
                      selectedId={selectedId}
                      layout="row"
                      containerStyle={{
                        marginLeft: -10,
                        justifyContent: 'space-between'
                      }}
                    />
                  </VStack>
                </VStack>
              </Box>
              <Box
                borderRadius={20}
                backgroundColor="#158AAD"
                padding={18}
                borderColor="black"
                borderWidth={1}
                style={global.shadow}
              >
                <VStack alignItems="center" gap={10}>
                  <Text
                    color="white"
                    fontFamily="Poppins_600SemiBold"
                    size="lg"
                  >
                    Family Information
                  </Text>
                  <Button onPress={() => setShowModal(true)}>
                    <ButtonText>Show Modal</ButtonText>
                  </Button>
                  <Modal
                    isOpen={showModal}
                    onClose={() => {
                      setShowModal(false)
                    }}
                  >
                    <ModalBackdrop />
                    <ModalContent>
                      <ModalBody>
                        <VStack alignItems="center" gap={10}>
                          <VStack width={'100%'}>
                            <Text
                              color="white"
                              fontFamily="Poppins_400Regular"
                              size="sm"
                              alignSelf="flex-start"
                            >
                              First Name
                            </Text>
                            <Input
                              variant="underlined"
                              size="sm"
                              borderColor="white"
                            >
                              <InputInput
                                value={userData.firstName}
                                placeholderTextColor={'white'}
                                color="white"
                                fontFamily="Poppins_600SemiBold"
                                fontSize={16}
                              />
                              <Ionicons
                                name="person-outline"
                                size={24}
                                color="white"
                              />
                            </Input>
                          </VStack>
                          <VStack width={'100%'}>
                            <Text
                              color="white"
                              fontFamily="Poppins_400Regular"
                              size="sm"
                              alignSelf="flex-start"
                            >
                              Last Name
                            </Text>
                            <Input
                              variant="underlined"
                              size="sm"
                              borderColor="white"
                            >
                              <InputInput
                                value={userData.lastName}
                                placeholderTextColor={'white'}
                                color="white"
                                fontFamily="Poppins_600SemiBold"
                                fontSize={16}
                              />
                              <Ionicons
                                name="person-outline"
                                size={24}
                                color="white"
                              />
                            </Input>
                          </VStack>
                          <VStack width={'100%'}>
                            <Text
                              color="white"
                              fontFamily="Poppins_400Regular"
                              size="sm"
                              alignSelf="flex-start"
                            >
                              Date of Birth
                            </Text>
                            <Input
                              variant="underlined"
                              size="sm"
                              borderColor="white"
                            >
                              <InputInput
                                value={userData.dob ? userData.dob : 'N/A'}
                                placeholderTextColor={'white'}
                                color="white"
                                fontFamily="Poppins_600SemiBold"
                                fontSize={16}
                              />
                              <MaterialCommunityIcons
                                name="cake-variant-outline"
                                size={24}
                                color="white"
                              />
                            </Input>
                          </VStack>
                          <VStack width={'100%'} gap={5}>
                            <Text
                              color="white"
                              fontFamily="Poppins_400Regular"
                              size="sm"
                              alignSelf="flex-start"
                            >
                              Gender
                            </Text>
                            <RadioGroup
                              radioButtons={radioButtons}
                              onPress={setSelectedId}
                              selectedId={selectedId}
                              layout="row"
                              containerStyle={{
                                marginLeft: -10,
                                justifyContent: 'space-between'
                              }}
                            />
                          </VStack>
                        </VStack>
                      </ModalBody>
                    </ModalContent>
                  </Modal>
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
  }
})

export default Profile
