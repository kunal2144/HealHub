import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import { Box, Button, HStack, Text, VStack } from '@gluestack-ui/react'
import { View, StyleSheet } from 'react-native'
import { PropTypes } from 'prop-types'
import { AntDesign } from '@expo/vector-icons'
import { ScrollView } from 'react-native-gesture-handler'
import global from '../styles'

const Disease = ({ navigation, route }) => {
  const { disease } = route.params
  return (
    <SafeAreaView style={styles.container}>
      <View height={'100%'} width={'95%'}>
        <ScrollView>
          <VStack gap={15} style={{ marginBottom: 20 }}>
            <HStack justifyContent="space-between" gap={10}>
              <Button
                backgroundColor="#158AAD"
                borderColor="black"
                borderWidth={1}
                borderRadius={18}
                height={50}
                justifyContent="center"
                alignItems="center"
                flex={1}
                onPress={() => navigation.navigate('Diseases', { navigation })}
                style={global.shadow}
              >
                <Text color="white" fontFamily="Poppins_400Regular" size="lg">
                  View All
                </Text>
              </Button>
              <Button
                backgroundColor="#158AAD"
                borderColor="black"
                borderWidth={1}
                borderRadius={18}
                height={50}
                justifyContent="center"
                alignItems="center"
                flex={1}
                gap={10}
                onPress={() => navigation.goBack()}
                style={global.shadow}
              >
                <AntDesign name="arrowleft" size={24} color="white" />
                <Text color="white" fontFamily="Poppins_400Regular" size="lg">
                  Back
                </Text>
              </Button>
            </HStack>
            <Box
              padding={20}
              width={'100%'}
              backgroundColor="#158AAD"
              borderColor="black"
              borderWidth={1}
              borderRadius={18}
              justifyContent="center"
              alignItems="center"
              style={global.shadow}
            >
              <Text color="white" fontFamily="Poppins_700Bold" size="3xl">
                {disease['Name'].toUpperCase()}
              </Text>
            </Box>
            <Box
              width={'100%'}
              backgroundColor="#158AAD"
              borderColor="black"
              borderWidth={1}
              borderRadius={18}
              justifyContent="center"
              alignItems="center"
              padding={10}
              style={global.shadow}
            >
              <Text color="white" fontFamily="Poppins_400Regular" size="lg">
                {disease['Description']}
              </Text>
            </Box>
            <Box
              width={'100%'}
              backgroundColor="#158AAD"
              borderColor="black"
              borderWidth={1}
              borderRadius={18}
              justifyContent="center"
              padding={10}
              style={global.shadow}
            >
              <Box
                borderRadius={15}
                borderColor="black"
                borderWidth={1}
                backgroundColor="#D0F4FF"
                width={'100%'}
                justifyContent="center"
                alignItems="center"
                padding={5}
                marginBottom={10}
              >
                <Text color="black" fontFamily="Poppins_600SemiBold" size="2xl">
                  Symptoms
                </Text>
              </Box>
              {disease['Symptoms'].split('\n').map((symptom) => (
                <HStack key={symptom} alignItems="flex-start">
                  <Text color="white" fontFamily="Poppins_700Bold" size="2xl">
                    •{' '}
                  </Text>
                  <Text
                    color="white"
                    fontFamily="Poppins_400Regular"
                    size="lg"
                    flexShrink={1}
                  >
                    {symptom.trim()}
                  </Text>
                </HStack>
              ))}
            </Box>
            <Box
              width={'100%'}
              backgroundColor="#158AAD"
              borderColor="black"
              borderWidth={1}
              borderRadius={18}
              justifyContent="center"
              padding={10}
              style={global.shadow}
            >
              <Box
                borderRadius={15}
                borderColor="black"
                borderWidth={1}
                backgroundColor="#D0F4FF"
                width={'100%'}
                justifyContent="center"
                alignItems="center"
                padding={5}
                marginBottom={10}
              >
                <Text color="black" fontFamily="Poppins_600SemiBold" size="2xl">
                  Recovery Methods
                </Text>
              </Box>
              {disease['RecoveryMethods'].split('\n').map((method) => (
                <HStack key={method}>
                  <Text color="white" fontFamily="Poppins_700Bold" size="2xl">
                    •{' '}
                  </Text>
                  <Text
                    color="white"
                    fontFamily="Poppins_400Regular"
                    size="lg"
                    flexShrink={1}
                  >
                    {method.trim()}
                  </Text>
                </HStack>
              ))}
            </Box>
          </VStack>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

Disease.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#D0F4FF',
    alignItems: 'center'
  },
  image: {
    width: 157,
    height: 157
  }
})

export default Disease
