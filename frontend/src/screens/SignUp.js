import { View, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import InputBox from '../components/InputBox'
import {
  Box,
  Button,
  HStack,
  Input,
  InputIcon,
  InputInput,
  Text,
  VStack,
  useToast
} from '@gluestack-ui/react'
import { LinearGradient } from 'expo-linear-gradient'
import { AntDesign, Entypo } from '@expo/vector-icons'

const SignUp = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [currentToastType, setCurrentToastType] = useState(null)
  const [validInputs, setValidInputs] = useState(false)
  const toast = useToast()

  const emailRegex =
    /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/
  const passwordRegex =
    /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/

  return (
    <LinearGradient colors={['#2B87A2', '#79E083']}>
      <View style={styles.container}>
        <VStack
          gap={20}
          marginTop={30}
          width={'100%'}
          alignItems="center"
          justifyContent="center"
        >
          <Text
            fontFamily="Poppins_700Bold"
            fontSize={40}
            lineHeight={45}
            color="#0E4A5C"
          >
            HealHub
          </Text>
          <Box
            backgroundColor="#EAFFEC"
            width={'80%'}
            alignItems="center"
            gap={40}
            paddingVertical={40}
            paddingHorizontal={10}
            borderRadius={10}
            borderColor="#79E083"
            borderWidth={5}
          >
            <Input width={'90%'} variant="underlined" borderColor="#000000">
              <InputInput
                placeholder="First Name"
                placeholderTextColor="#A0A6A1"
                color="#3a3a3a"
                autoCapitalize="none"
                spellCheck={false}
                autoFocus={false}
                autoCorrect={false}
              />
              <InputIcon>
                <AntDesign name="user" size={20} color="gray" />
              </InputIcon>
            </Input>
            <Input width={'90%'} variant="underlined" borderColor="#000000">
              <InputInput
                placeholder="Last Name"
                placeholderTextColor="#A0A6A1"
                color="#3a3a3a"
                autoCapitalize="none"
                spellCheck={false}
                autoFocus={false}
                autoCorrect={false}
              />
              <InputIcon>
                <AntDesign name="user" size={20} color="gray" />
              </InputIcon>
            </Input>
            <Input width={'90%'} variant="underlined" borderColor="#000000">
              <InputInput
                placeholder="Email Address"
                placeholderTextColor="#A0A6A1"
                color="#3a3a3a"
                autoCapitalize="none"
                spellCheck={false}
                autoFocus={false}
                autoCorrect={false}
              />
              <InputIcon>
                <AntDesign name="mail" size={20} color="gray" />
              </InputIcon>
            </Input>
            <Input width={'90%'} variant="underlined" borderColor="#000000">
              <InputInput
                placeholder="Password"
                placeholderTextColor="#A0A6A1"
                color="#3a3a3a"
                autoCapitalize="none"
                spellCheck={false}
                autoFocus={false}
                autoCorrect={false}
              />
              <InputIcon>
                <Entypo name="eye-with-line" size={20} color="gray" />
              </InputIcon>
            </Input>
            <Input width={'90%'} variant="underlined" borderColor="#000000">
              <InputInput
                placeholder="Confirm Password"
                placeholderTextColor="#A0A6A1"
                color="#3a3a3a"
                autoCapitalize="none"
                spellCheck={false}
                autoFocus={false}
                autoCorrect={false}
              />
              <InputIcon>
                <Entypo name="eye-with-line" size={20} color="gray" />
              </InputIcon>
            </Input>
          </Box>
          <Button
            style={[styles.login]}
            width={'65%'}
            isDisabled={!validInputs}
          >
            <Text fontSize={16} color="white" fontFamily="Poppins_700Bold">
              Sign Up
            </Text>
            <AntDesign name="login" size={24} color="white" />
          </Button>
          <HStack gap={20}>
            <Text color="black">____________</Text>
            <Text marginTop={5} fontFamily="Poppins_700Bold" color="black">
              OR
            </Text>
            <Text color="black">____________</Text>
          </HStack>
          <Button
            style={[styles.signup]}
            width={'65%'}
            isDisabled={!validInputs}
          >
            <Text fontSize={16} color="#005D79" fontFamily="Poppins_700Bold">
              Log in
            </Text>
            <AntDesign name="login" size={24} color="#005D79" />
          </Button>
        </VStack>
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 157,
    height: 157
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
  loginPressed: {
    backgroundColor: '#0F5F7B'
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
  },
  signupPressed: {
    backgroundColor: 'rgba(52, 152, 219, 0.2)'
  }
})

export default SignUp
