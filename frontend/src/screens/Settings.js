import { Button, Text } from '@gluestack-ui/react'
import React, { useContext } from 'react'
import { SafeAreaView } from 'react-native'
import { logout } from '../../lib/logout'
import { AuthContext } from '../components/AuthContext'

const Settings = () => {
  const { setUserToken } = useContext(AuthContext)
  return (
    <SafeAreaView
      style={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}
    >
      <Text fontFamily="Poppins_700Bold" size="2xl">
        Settings Screen
      </Text>
      <Text fontFamily="Poppins_600SemiBold" size="lg" color="#158AAD">
        Coming Soon
      </Text>
      <Button marginTop={30} onPress={() => logout(setUserToken)}>
        <Text fontFamily="Poppins_600SemiBold" size="md" color="white">
          Log Out
        </Text>
      </Button>
    </SafeAreaView>
  )
}

export default Settings
