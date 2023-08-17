import { View, Image, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import Logo from '../assets/Logo.png'
import { AntDesign } from '@expo/vector-icons'
import React from 'react'
import { VStack, HStack, Box, Text } from '@gluestack-ui/react'
import InputBox from '../components/InputBox'

const Login = () => {
  return (
    <LinearGradient colors={['#2B87A2', '#79E083']}>
      <View style={styles.container}>
        <Image source={Logo} alt="HealHub Logo" style={styles.image} />
        <VStack gap={'20%'} marginTop={30} width={'100%'} alignItems="center">
          <HStack width={'65%'}>
            <InputBox
              icon="mail"
              placeholder={'Email Address'}
              keyboardType={'email-address'}
            />
          </HStack>
          <HStack width={'65%'}>
            <InputBox
              icon="lock"
              placeholder={'Password'}
              keyboardType={'password'}
              type={'password'}
            />
          </HStack>
          <Box style={styles.login} width={'65%'}>
            <Text fontSize={16} color="white" fontFamily="Poppins_700Bold">
              Log in
            </Text>
            <AntDesign name="login" size={24} color="white" />
          </Box>
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
          <Box style={styles.signup} width={'65%'}>
            <Text fontSize={16} color="#005D79" fontFamily="Poppins_700Bold">
              Sign up
            </Text>
            <AntDesign name="login" size={24} color="#005D79" />
          </Box>
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
    backgroundColor: '#158AAD',
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  signup: {
    flexDirection: 'row',
    gap: 10,
    backgroundColor: 'transparent',
    borderRadius: 10,
    borderColor: '#005D79',
    borderWidth: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default Login
