import { View, StyleSheet } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
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
import { BASE_URL } from '@env'
import axios from 'axios'
import * as SecureStore from 'expo-secure-store'
import { AuthContext } from '../components/AuthContext'
import CustomToast from '../components/CustomToast'

const SignUp = (props) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [currentToastType, setCurrentToastType] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
  const [validInputs, setValidInputs] = useState(false)
  const { setUserToken, setUserData } = useContext(AuthContext)
  const toast = useToast()

  const nameRegex = /^[a-zA-z]{3,}$/
  const emailRegex =
    /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/
  const passwordRegex =
    /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:]).{8,16}$/

  useEffect(() => {
    if (
      password == confirmPassword &&
      passwordRegex.test(password) &&
      emailRegex.test(email) &&
      nameRegex.test(firstName) &&
      nameRegex.test(lastName)
    )
      setValidInputs(true)
    else setValidInputs(false)
  }, [email, password, confirmPassword, firstName, lastName])

  const showToast = (toastConfig, type) => {
    if (currentToastType !== type) {
      toast.closeAll()
      setTimeout(() => {
        toast.show(toastConfig)
        setCurrentToastType(type)
      }, 100)
    }
  }

  const signUp = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }

      let first_name = firstName.charAt(0).toUpperCase()
      let last_name = lastName.charAt(0).toUpperCase()

      first_name += firstName.slice(1).toLowerCase()
      last_name += lastName.slice(1).toLowerCase()

      const { data } = await axios.post(
        `${BASE_URL}api/patient/`,
        {
          first_name,
          last_name,
          email,
          password
        },
        config
      )

      await SecureStore.setItemAsync('JWT_TOKEN', data.token)
      await SecureStore.setItemAsync('USER_DATA', JSON.stringify(data))
      setUserToken(data.token)
      setUserData(data)
    } catch (error) {
      if (error.response.status == 400) {
        showToast({
          placement: 'bottom',
          duration: 5000,
          onCloseComplete: () => setCurrentToastType(''),
          render: ({ id }) => {
            return (
              <CustomToast
                id={id}
                backgroundColor="$error700"
                actionType="error"
                title="Signup Failed"
                description="Email already exists"
                color="$textLight50"
                buttonColor="white"
                toast={toast}
              />
            )
          }
        })
      } else {
        showToast({
          placement: 'bottom',
          duration: 5000,
          onCloseComplete: () => setCurrentToastType(''),
          render: ({ id }) => {
            return (
              <CustomToast
                id={id}
                backgroundColor="$error700"
                actionType="error"
                title="Signup Failed"
                description="Something went wrong"
                color="$textLight50"
                buttonColor="white"
                toast={toast}
              />
            )
          }
        })
      }
    }
  }

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
            borderColor="#2B87A2"
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
                value={firstName}
                onChangeText={(value) => setFirstName(value)}
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
                value={lastName}
                onChangeText={(value) => setLastName(value)}
              />
              <InputIcon>
                <AntDesign name="user" size={20} color="gray" />
              </InputIcon>
            </Input>
            <Input width={'90%'} variant="underlined" borderColor="#000000">
              <InputInput
                placeholder="Email Address"
                placeholderTextColor="#A0A6A1"
                keyboardType="email-address"
                color="#3a3a3a"
                autoCapitalize="none"
                spellCheck={false}
                autoFocus={false}
                autoCorrect={false}
                value={email}
                onChangeText={(value) => setEmailAddress(value)}
              />
              <InputIcon>
                <AntDesign name="mail" size={20} color="gray" />
              </InputIcon>
            </Input>
            <Input width={'90%'} variant="underlined" borderColor="#000000">
              <InputInput
                placeholder="Password"
                placeholderTextColor="#A0A6A1"
                type={showPassword ? 'text' : 'password'}
                color="#3a3a3a"
                autoCapitalize="none"
                spellCheck={false}
                autoFocus={false}
                autoCorrect={false}
                value={password}
                onChangeText={(value) => setPassword(value)}
              />
              <InputIcon>
                <Entypo
                  name={showPassword ? 'eye' : 'eye-with-line'}
                  size={20}
                  color="gray"
                  onPress={() => setShowPassword((value) => !value)}
                />
              </InputIcon>
            </Input>
            <Input width={'90%'} variant="underlined" borderColor="#000000">
              <InputInput
                placeholder="Confirm Password"
                placeholderTextColor="#A0A6A1"
                type={showPassword ? 'text' : 'password'}
                color="#3a3a3a"
                autoCapitalize="none"
                spellCheck={false}
                autoFocus={false}
                autoCorrect={false}
                value={confirmPassword}
                onChangeText={(value) => setConfirmPassword(value)}
              />
              <InputIcon>
                <Entypo
                  name={showPassword ? 'eye' : 'eye-with-line'}
                  size={20}
                  color="gray"
                  onPress={() => setShowPassword((value) => !value)}
                />
              </InputIcon>
            </Input>
          </Box>
          <Button
            style={[styles.login]}
            width={'65%'}
            isDisabled={!validInputs}
            onPress={signUp}
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
            onPress={() => props.navigation.navigate('Login')}
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
