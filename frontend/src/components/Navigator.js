import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Login from '../screens/Login'
import Home from '../screens/Home'
import SignUp from '../screens/SignUp'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeButton from './HomeButton'
import PrescriptionsButton from './PrescriptionsButton'
import ConsultationsButton from './ConsultationsButton'
import ProfileButton from './ProfileButton'
import Prescriptions from '../screens/Prescriptions'
import Consultations from '../screens/Consultations'
import Profile from '../screens/Profile'
import Disease from '../screens/Disease'
import Diseases from '../screens/Diseases'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()
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

export function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 25,
          left: '2.5%',
          right: '2.5%',
          borderRadius: 18,
          backgroundColor: '#F4F4F4',
          height: 70,
          shadowColor: 'black',
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.25,
          shadowRadius: 3.5,
          elevation: 5,
          paddingBottom: -30
        }
      }}
      initialRouteName="Home"
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => <HomeButton focused={focused} />
        }}
      />
      <Tab.Screen
        name="Prescriptions"
        component={Prescriptions}
        options={{
          tabBarIcon: ({ focused }) => <PrescriptionsButton focused={focused} />
        }}
      />
      <Tab.Screen
        name="Consultations"
        component={Consultations}
        options={{
          tabBarIcon: ({ focused }) => <ConsultationsButton focused={focused} />
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => <ProfileButton focused={focused} />
        }}
      />
    </Tab.Navigator>
  )
}

export function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
      initialRouteName="Tab"
    >
      <Stack.Screen
        name="BottomTabs"
        component={BottomTabs}
        options={{ cardStyleInterpolator: forFade }}
      />
      <Stack.Screen name="Disease" component={Disease} />
      <Stack.Screen name="Diseases" component={Diseases} />
    </Stack.Navigator>
  )
}
