import { HStack, Text, VStack } from '@gluestack-ui/react'
import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import Search from '../components/Search'
import { ScrollView } from 'react-native-gesture-handler'
import axios from 'axios'
import { BASE_URL } from '@env'
import PropTypes from 'prop-types'

const Doctors = ({ type, image }) => {
  const [doctors, setDoctors] = React.useState([])
  const [displayedData, setDisplayedData] = React.useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(BASE_URL + `api/doctor/${type}`)
        setDoctors(response.data)
        setDisplayedData(response.data)
      } catch (error) {
        console.log(error.response.data.message)
      }
    }

    fetchData()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <View height={'100%'} width={'95%'}>
        <View height={'100%'}>
          <VStack gap={5} marginTop={10} marginBottom={10}>
            <HStack gap={10} alignItems="center">
              <MaterialCommunityIcons name="doctor" size={24} color={'black'} />
              <Text color="black" fontFamily="Poppins_700Bold" size="2xl">
                Choose your doctor
              </Text>
            </HStack>
            <View
              style={{
                borderBottomColor: 'black',
                borderBottomWidth: 1
              }}
            />
          </VStack>
          <Search
          // setDisplayedData={setDisplayedData}
          // filter={(value) => {
          //   return data.filter((specialist) => {
          //     return specialist.name
          //       .toLowerCase()
          //       .includes(value.toLowerCase())
          //   })
          // }}
          />
          <ScrollView
            style={{ marginBottom: 10 }}
            contentContainerStyle={{ alignItems: 'center' }}
          ></ScrollView>
        </View>
      </View>
    </SafeAreaView>
  )
}

Doctors.propTypes = {
  type: PropTypes.string.isRequired,
  image: PropTypes.any.isRequired
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#D0F4FF',
    alignItems: 'center'
  }
})

export default Doctors
