import { Text } from '@gluestack-ui/react'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Diseases = () => {
  return (
    <SafeAreaView
      style={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}
    >
      <Text fontFamily="Poppins_700Bold" size="2xl">
        Diseases Screen
      </Text>
      <Text fontFamily="Poppins_600SemiBold" size="lg" color="#158AAD">
        Coming Soon
      </Text>
    </SafeAreaView>
  )
}

export default Diseases
