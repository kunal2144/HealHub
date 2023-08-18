import 'react-native-gesture-handler'
import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { GluestackUIProvider, config } from '@gluestack-ui/react'
import { Poppins_700Bold, Poppins_400Regular } from '@expo-google-fonts/poppins'
import { RobotoMono_400Regular } from '@expo-google-fonts/roboto-mono'
import { LogBox } from 'react-native'
import Navigator from './src/components/Navigator'
import * as SplashScreen from 'expo-splash-screen'
import * as Font from 'expo-font'

export default function App() {
  LogBox.ignoreAllLogs()

  const [fontsLoaded, setFontsLoaded] = useState(false)

  useEffect(() => {
    async function loadFonts() {
      await SplashScreen.preventAutoHideAsync()
      await Font.loadAsync({
        Poppins_700Bold,
        Poppins_400Regular,
        RobotoMono_400Regular
      })
      setFontsLoaded(true)
      SplashScreen.hideAsync()
    }

    loadFonts()
  }, [])

  if (!fontsLoaded) {
    return null
  }

  return (
    <GluestackUIProvider config={config.theme}>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </GluestackUIProvider>
  )
}
