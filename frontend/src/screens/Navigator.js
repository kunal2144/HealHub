import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Login from './Login'
import Home from './Home'
import SignUp from './SignUp'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeButton from '../components/HomeButton'
import PrescriptionsButton from '../components/PrescriptionsButton'
import ConsultationsButton from '../components/ConsultationsButton'
import ProfileButton from '../components/ProfileButton'
import Prescriptions from './Prescriptions'
import Consultations from './Consultations'
import Profile from './Profile'
import Disease from './Disease'
import Diseases from './Diseases'
import Specialists from './Specialists'
import Settings from './Settings'
import SettingsButton from '../components/SettingsButton'
import Book from './Book'
import Doctors from './Doctors'

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
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({ focused }) => <SettingsButton focused={focused} />
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
      <Stack.Screen name="Book" component={Book} />
      <Stack.Screen name="Specialists" component={Specialists} />
      <Stack.Screen name="Doctors" component={Doctors} />
    </Stack.Navigator>
  )
}
