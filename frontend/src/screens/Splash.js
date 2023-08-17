import { View, Image, Text, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useEffect } from 'react'
import Logo from '../assets/Logo.png'

const Splash = (props) => {
  useEffect(() => {
    let timer = setTimeout(() => props.navigation.navigate('Login'), 3000)
    return () => clearTimeout(timer)
  })

  return (
    <LinearGradient colors={['#2B87A2', '#79E083']}>
      <View style={styles.container}>
        <Image source={Logo} alt="HealHub Logo" style={styles.image} />
        <Text style={styles.title}>HealHub</Text>
        <Text style={styles.tagline}>Wellness Simplified</Text>
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
  title: {
    fontSize: 40,
    fontFamily: 'Poppins_700Bold',
    color: '#0E4A5C'
  },
  tagline: {
    marginTop: -10,
    fontSize: 16,
    fontFamily: 'Poppins_700Bold',
    color: 'white'
  }
})

export default Splash
