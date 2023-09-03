import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Login from '../screens/Login'
import Home from '../screens/Home'
import SignUp from '../screens/SignUp'

const Stack = createStackNavigator()
const forFade = ({ current }) => ({
  cardStyle: {
    opacity: current.progress
  }
})

export function AuthStack() {
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
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ cardStyleInterpolator: forFade }}
      />
    </Stack.Navigator>
  )
}

export function AppStack() {
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
