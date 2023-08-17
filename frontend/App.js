import 'react-native-gesture-handler'
import React from 'react'
import Navigator from './src/components/Navigator'
import { NavigationContainer } from '@react-navigation/native'
import { GluestackUIProvider, config } from '@gluestack-ui/react'
import {
  useFonts,
  Poppins_700Bold,
  Poppins_400Regular
} from '@expo-google-fonts/poppins'
// import courier font
import { RobotoMono_400Regular } from '@expo-google-fonts/roboto-mono'
import AppLoading from 'expo-app-loading'
import { LogBox } from 'react-native'

export default function App() {
  LogBox.ignoreAllLogs()

  let [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_400Regular,
    RobotoMono_400Regular
  })

  if (!fontsLoaded) {
    return <AppLoading />
  } else {
    return (
      <GluestackUIProvider config={config.theme}>
        <NavigationContainer>
          <Navigator />
        </NavigationContainer>
      </GluestackUIProvider>
    )
  }
}
