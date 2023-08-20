import React, { useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Button, ButtonText } from '@gluestack-ui/react'
import { AuthContext } from '../components/AuthContext'
import * as SecureStore from 'expo-secure-store'

const Home = () => {
  const { setUserToken } = useContext(AuthContext)

  const logout = async () => {
    await SecureStore.deleteItemAsync('JWT_TOKEN')
    setUserToken(null)
  }

  return (
    <LinearGradient colors={['#2B87A2', '#79E083']}>
      <View style={styles.container}>
        <Button onPress={logout}>
          <ButtonText>Log Out</ButtonText>
        </Button>
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
