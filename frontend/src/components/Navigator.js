import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Login from '../screens/Login'
import Home from '../screens/Home'

const Stack = createStackNavigator()
const forFade = ({ current }) => ({
  cardStyle: {
    opacity: current.progress
  }
})

export function LoginNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false
      }}
      initialRouteName="Login"
    >
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ cardStyleInterpolator: forFade }}
      />
    </Stack.Navigator>
  )
}

export function HomeNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false
      }}
      initialRouteName="Home"
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ cardStyleInterpolator: forFade }}
      />
    </Stack.Navigator>
  )
}
