import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Splash from '../screens/Splash'
import Login from '../screens/Login'

const Stack = createStackNavigator()
const forFade = ({ current }) => ({
  cardStyle: {
    opacity: current.progress
  }
})

export default function Navigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false
      }}
      initialRouteName="Splash"
    >
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ cardStyleInterpolator: forFade }}
      />
    </Stack.Navigator>
  )
}
