import React, { useEffect, useState } from 'react'
import { View, Image, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { AntDesign } from '@expo/vector-icons'
import { VStack, HStack, Text, Button, useToast } from '@gluestack-ui/react'
import { BASE_URL } from '@env'
import Logo from '../assets/Logo.png'
import InputBox from '../components/InputBox'
import axios from 'axios'
import CustomToast from '../components/CustomToast'

const Login = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginPressed, setLoginPressed] = useState(false)
  const [signupPressed, setSignupPressed] = useState(false)
  const [currentToastType, setCurrentToastType] = useState(null)
  const [validInputs, setValidInputs] = useState(false)
  const toast = useToast()

  const emailRegex =
    /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/

  useEffect(() => {
    if (password && emailRegex.test(email)) setValidInputs(true)
    else setValidInputs(false)
  }, [email, password])

  const showToast = (toastConfig, type) => {
    if (currentToastType !== type) {
      toast.closeAll()
      setTimeout(() => {
        toast.show(toastConfig)
        setCurrentToastType(type)
      }, 100)
    }
  }

  const login = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }

      const { data } = await axios.post(
        `${BASE_URL}api/patient/login/`,
        {
          email,
          password
        },
        config
      )

      toast.closeAll()
      props.navigation.navigate('Home')
    } catch (error) {
      if (error.response.status === 401) {
        showToast(
          {
            placement: 'bottom',
            duration: 5000,
            onCloseComplete: () => setCurrentToastType(''),
            render: ({ id }) => {
              return (
                <CustomToast
                  id={id}
                  backgroundColor="$error700"
                  actionType="error"
                  title="Login Failed"
                  description="Invalid email or password"
                  color="$textLight50"
                  buttonColor="white"
                  toast={toast}
                />
              )
            }
          },
          'invalid'
        )
      } else {
        showToast(
          {
            placement: 'bottom',
            duration: 5000,
            onCloseComplete: () => setCurrentToastType(''),
            render: ({ id }) => {
              return (
                <CustomToast
                  id={id}
                  backgroundColor="$error700"
                  actionType="error"
                  title="Login Failed"
                  description="Server error"
                  color="$textLight50"
                  buttonColor="white"
                  toast={toast}
                />
              )
            }
          },
          'server'
        )
      }
    }
  }

  const signUp = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }

      const { data } = await axios.post(
        `${BASE_URL}api/patient/`,
        {
          email,
          password
        },
        config
      )

      props.navigation.navigate('Home')
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
        <Image source={Logo} alt="HealHub Logo" style={styles.image} />
        <VStack gap={20} marginTop={30} width={'100%'} alignItems="center">
          <HStack width={'65%'}>
            <InputBox
              icon="mail"
              placeholder={'Email Address'}
              keyboardType={'email-address'}
              value={email}
              onChange={setEmail}
            />
          </HStack>
          <HStack width={'65%'}>
            <InputBox
              icon="lock"
              placeholder={'Password'}
              type={'password'}
              value={password}
              onChange={setPassword}
            />
          </HStack>
          <Button
            style={[styles.login, loginPressed && styles.loginPressed]}
            width={'65%'}
            onPress={login}
            onPressIn={() => setLoginPressed(true)}
            onPressOut={() => setLoginPressed(false)}
            isDisabled={!validInputs}
          >
            <Text fontSize={16} color="white" fontFamily="Poppins_700Bold">
              Log in
            </Text>
            <AntDesign name="login" size={24} color="white" />
          </Button>
          <Text underline="true" fontFamily="Poppins_400Regular" color="black">
            Forgot Password?
          </Text>
          <HStack gap={20}>
            <Text color="black">____________</Text>
            <Text marginTop={5} fontFamily="Poppins_700Bold" color="black">
              OR
            </Text>
            <Text color="black">____________</Text>
          </HStack>
          <Button
            style={[styles.signup, signupPressed && styles.signupPressed]}
            width={'65%'}
            onPressIn={() => setSignupPressed(true)}
            onPressOut={() => setSignupPressed(false)}
            onPress={signUp}
            isDisabled={!validInputs}
          >
            <Text fontSize={16} color="#005D79" fontFamily="Poppins_700Bold">
              Sign up
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

export default Login
