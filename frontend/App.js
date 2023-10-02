import 'react-native-gesture-handler'
import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { GluestackUIProvider, config } from '@gluestack-ui/react'
import {
  Poppins_700Bold,
  Poppins_400Regular,
  Poppins_600SemiBold
} from '@expo-google-fonts/poppins'
import { RobotoMono_400Regular } from '@expo-google-fonts/roboto-mono'
import { LogBox } from 'react-native'
import { AuthStack, AppStack } from './src/components/Navigator'
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
  const [userData, setUserData] = useState(null)
  const [loggedIn, setLoggedIn] = useState(null)

  useEffect(() => {
    const _retriveData = async () => {
      try {
        let token = await SecureStore.getItemAsync('JWT_TOKEN')
        let data = JSON.parse(await SecureStore.getItemAsync('USER_DATA'))
        setUserToken(token)
        setUserData(data)
        if (token) {
          const { data } = await axios.post(
            `${BASE_URL}api/user/verify-token`,
            {
              token
            }
          )

          if (!data.error) {
            setLoggedIn(true)
            setUserData(data)
          } else {
            setLoggedIn(false)
          }
        } else {
          setLoggedIn(false)
        }
      } catch (error) {
        setLoggedIn(false)
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
        Poppins_600SemiBold,
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
      <AuthContext.Provider
        value={{ userToken, setUserToken, userData, setUserData }}
      >
        <GluestackUIProvider config={config.theme}>
          <NavigationContainer>
            {loggedIn && userToken ? <AppStack /> : <AuthStack />}
          </NavigationContainer>
        </GluestackUIProvider>
      </AuthContext.Provider>
    </SafeAreaProvider>
  )
}
