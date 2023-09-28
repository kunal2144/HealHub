import React, { useContext } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
  Avatar,
  AvatarFallbackText,
  Box,
  CircleIcon,
  Input,
  InputInput,
  Radio,
  RadioGroup,
  RadioIcon,
  RadioIndicator,
  RadioLabel,
  Text,
  VStack
} from '@gluestack-ui/react'
import { AuthContext } from '../components/AuthContext'
import global from '../styles'

const Profile = () => {
  const { userData } = useContext(AuthContext)

  return (
    <SafeAreaView style={styles.container}>
      <View height={'100%'} width={'95%'}>
        <View height={'95%'}>
          <ScrollView style={{ marginBottom: 10 }}>
            <VStack gap={15}>
              <Avatar alignSelf="center" size="2xl">
                <AvatarFallbackText>
                  {`${userData.firstName} ${userData.lastName}`}
                </AvatarFallbackText>
              </Avatar>
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
                    </Input>
                  </VStack>
                  <VStack width={'100%'}>
                    <Text
                      color="white"
                      fontFamily="Poppins_400Regular"
                      size="sm"
                      alignSelf="flex-start"
                    >
                      Gender
                    </Text>
                  </VStack>
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
