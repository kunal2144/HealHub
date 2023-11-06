import { Box, HStack, Image, Text, VStack } from '@gluestack-ui/react'
import React, { useEffect } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import Search from '../components/Search'
import { ScrollView } from 'react-native-gesture-handler'
import axios from 'axios'
import { BASE_URL } from '@env'
import PropTypes from 'prop-types'
import global from '../styles'
import Doctor from '../assets/stock-doctor.jpeg'

const Doctors = ({ route, navigation }) => {
  const { type } = route.params
  const [doctors, setDoctors] = React.useState(null)
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
            setDisplayedData={setDisplayedData}
            filter={(value) => {
              return doctors.filter((doctor) => {
                return doctor.name.toLowerCase().includes(value.toLowerCase())
              })
            }}
          />
          <View>
            <ScrollView
              contentContainerStyle={{
                alignItems: 'center'
              }}
            >
              <VStack gap={20} width={'100%'} marginBottom={150}>
                {displayedData.map((doctor) => (
                  <TouchableOpacity
                    key={doctor._id}
                    onPress={() =>
                      navigation.navigate('Book', {
                        doctor,
                        category: type,
                        image: Doctor
                      })
                    }
                  >
                    <Box
                      width={'100%'}
                      backgroundColor="white"
                      borderColor="#158AAD"
                      borderWidth={1}
                      borderRadius={18}
                      padding={20}
                      style={global.shadow}
                    >
                      <HStack
                        justifyContent="flex-start"
                        alignItems="center"
                        gap={30}
                        width={'100%'}
                      >
                        <Box
                          backgroundColor={'white'}
                          borderRadius={10}
                          style={global.shadow}
                        >
                          <Image source={Doctor} size="lg" borderRadius={10} />
                        </Box>
                        <Box flexGrow={1}>
                          <Text fontFamily={'Poppins_700Bold'} fontSize={18}>
                            {doctor.name}
                          </Text>
                          <Text>{doctor.degrees.join(', ')}</Text>
                          <Text>{doctor.type}</Text>
                          <HStack justifyContent="space-between">
                            <Text bold="true">{'₹' + doctor.fees}</Text>
                            <Text>
                              {new Date().getFullYear() -
                                doctor.year +
                                ' years exp'}
                            </Text>
                          </HStack>
                        </Box>
                      </HStack>
                    </Box>
                  </TouchableOpacity>
                ))}
              </VStack>
            </ScrollView>
          </View>
          {doctors && doctors.length === 0 && (
            <Box marginTop={200} alignItems="center" justifyContent="center">
              <Text fontFamily="Poppins_700Bold" size="2xl">
                Oops, you caught us!
              </Text>
              <Text fontFamily="Poppins_600SemiBold" size="lg" color="#158AAD">
                No Doctors Available :/
              </Text>
            </Box>
          )}
        </View>
      </View>
    </SafeAreaView>
  )
}

Doctors.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#D0F4FF',
    alignItems: 'center'
  }
})

export default Doctors
