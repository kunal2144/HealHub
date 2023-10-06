import { Text, HStack, VStack } from '@gluestack-ui/react'
import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign } from '@expo/vector-icons'
import CommonCategories from '../components/CommonCategories'
import { PreviousConsultations } from '../components/PreviousConsultations'
import PropTypes from 'prop-types'
import { UpcomingConsultations } from '../components/UpcomingConsultations'

const Consultations = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View height={'100%'} width={'95%'}>
        <View height={'95%'}>
          <ScrollView style={{ marginBottom: 10 }}>
            <VStack gap={15} marginTop={10} marginBottom={50}>
              <VStack gap={5}>
                <HStack gap={10} alignItems="center">
                  <AntDesign name="calendar" size={24} color={'black'} />
                  <Text color="black" fontFamily="Poppins_700Bold" size="2xl">
                    Consultations
                  </Text>
                </HStack>
                <View
                  style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 1
                  }}
                />
              </VStack>
              <CommonCategories navigation={navigation} />
              <UpcomingConsultations navigation={navigation} basic={true} />
              <PreviousConsultations navigation={navigation} />
            </VStack>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  )
}

Consultations.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#D0F4FF',
    alignItems: 'center'
  }
})

export default Consultations
