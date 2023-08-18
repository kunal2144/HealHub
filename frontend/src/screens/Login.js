import React, { useState } from 'react'
import Logo from '../assets/Logo.png'
import InputBox from '../components/InputBox'
import { View, Image, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { AntDesign } from '@expo/vector-icons'
import { VStack, HStack, Text, Button } from '@gluestack-ui/react'

const Login = (props) => {
  const [Email, setEmail] = useState('')
  const [Password, setPassword] = useState('')
  const [loginPressed, setLoginPressed] = useState(false)
  const [signupPressed, setSignupPressed] = useState(false)

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
              value={Email}
              onChange={setEmail}
            />
          </HStack>
          <HStack width={'65%'}>
            <InputBox
              icon="lock"
              placeholder={'Password'}
              type={'password'}
              value={Password}
              onChange={setPassword}
            />
          </HStack>
          <Button
            style={[styles.login, loginPressed && styles.loginPressed]}
            width={'65%'}
            onPress={() => props.navigation.navigate('Home')}
            onPressIn={() => setLoginPressed(true)}
            onPressOut={() => setLoginPressed(false)}
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
