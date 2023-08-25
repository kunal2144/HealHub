import 'react-native-gesture-handler'
import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { GluestackUIProvider, config } from '@gluestack-ui/react'
import { Poppins_700Bold, Poppins_400Regular } from '@expo-google-fonts/poppins'
import { RobotoMono_400Regular } from '@expo-google-fonts/roboto-mono'
import { LogBox } from 'react-native'
import { LoginNavigator, HomeNavigator } from './src/components/Navigator'
import * as SplashScreen from 'expo-splash-screen'
import * as Font from 'expo-font'
import * as SecureStore from 'expo-secure-store'
import { AuthContext } from './src/components/AuthContext'
import axios from 'axios'
import { BASE_URL } from '@env'
import { SafeAreaProvider } from 'react-native-safe-area-context'

export default function App() {
  LogBox.ignoreAllLogs()

  const [fontsLoaded, setFontsLoaded] = useState(false)
  const [userToken, setUserToken] = useState(null)
  const [loggedIn, setLoggedIn] = useState(null)

  useEffect(() => {
    const _retriveData = async () => {
      try {
        let token = await SecureStore.getItemAsync('JWT_TOKEN')
        setUserToken(token)
        if (token) {
          const {
            data: { valid }
          } = await axios.post(`${BASE_URL}api/user/verify-token`, {
            token
          })

          if (valid) {
            setLoggedIn(true)
          } else {
            setLoggedIn(false)
          }
        } else {
          setLoggedIn(false)
        }
      } catch (error) {
        console.log(error)
      }
    }

    _retriveData()
  }, [userToken])

  useEffect(() => {
    const loadFonts = async () => {
      await SplashScreen.preventAutoHideAsync()
      await Font.loadAsync({
        Poppins_700Bold,
        Poppins_400Regular,
        RobotoMono_400Regular
      })
      setFontsLoaded(true)
    }

    loadFonts()
  }, [])

  if (!fontsLoaded || loggedIn === null) {
    return null
  } else {
    setTimeout(async () => {
      await SplashScreen.hideAsync()
    }, 1000)
  }

  return (
    <SafeAreaProvider>
      <AuthContext.Provider value={{ userToken, setUserToken }}>
        <GluestackUIProvider config={config.theme}>
          <NavigationContainer>
            {loggedIn && userToken ? <HomeNavigator /> : <LoginNavigator />}
          </NavigationContainer>
        </GluestackUIProvider>
      </AuthContext.Provider>
    </SafeAreaProvider>
  )
}
