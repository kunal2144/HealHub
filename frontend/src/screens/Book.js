import { Box, Button, HStack, Image, Text, VStack } from '@gluestack-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { Dropdown } from 'react-native-element-dropdown'
import { ScrollView, StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import global from '../styles'
import { AuthContext } from '../components/AuthContext'
import axios from 'axios'
import { BASE_URL } from '@env'
import DateTimePickerModal from 'react-native-modal-datetime-picker'

const Book = ({ navigation, route }) => {
  const { doctor, category, image } = route.params
  const { userData, setConsultations, userToken } = useContext(AuthContext)
  const [data, setData] = useState([])
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false)
  const [patient, setPatient] = useState('self')
  const [date, setDate] = useState(new Date())
  const [time, setTime] = useState(new Date())
  const [isFocus, setIsFocus] = useState(false)
  const [canBook, setCanBook] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const members = await axios.post(
          `${BASE_URL}api/patient/get-members`,
          {},
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${userData.token}`
            }
          }
        )

        let updatedData = members.data.map((member) => {
          return {
            label: `${member.first_name} ${member.last_name}`,
            value: member._id
          }
        })

        updatedData.push({
          label: `${userData.firstName} ${userData.lastName}`,
          value: 'self'
        })

        setData(updatedData)
      } catch (error) {
        console.log(error)
      }
    }
    if (userData.familyMembers) fetchData()
  }, [userData.familyMembers])

  async function getConsultations() {
    setCanBook(false)
    try {
      const consultationsConfig = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`
        }
      }

      const response = await axios.post(
        `${BASE_URL}api/consultation/get-consultations`,
        {},
        consultationsConfig
      )

      setConsultations(response.data)
    } catch (error) {
      console.log(error)
    }
    setCanBook(true)
  }

  const bookConsultation = async () => {
    if (date < new Date()) {
      alert('Please choose a valid date and time')
      return
    }

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userData.token}`
        }
      }
      await axios.post(
        `${BASE_URL}api/consultation/book-consultation`,
        {
          category: category,
          user: patient,
          start_datetime: date,
          doctor_id: doctor._id
        },
        config
      )
      await getConsultations()
      alert('Consultation booked successfully')
      navigation.navigate('Consultations')
    } catch (error) {
      console.log(error)
    }
  }

  const getIST = (date) => {
    let time = date
      .toLocaleString(undefined, { timeZone: 'Asia/Calcutta' })
      .split(', ')[1]
      .split(':')

    return `${time[0]}:${time[1]} ${time[2].slice(-2)}`
  }

  return (
    <SafeAreaView style={styles.container}>
      <View height={'100%'} width={'95%'}>
        <View>
          <ScrollView style={{ marginBottom: 10 }}>
            <VStack gap={15} marginTop={10} marginBottom={50}>
              <VStack gap={5}>
                <HStack gap={10} alignItems="center">
                  <AntDesign name="calendar" size={24} color={'black'} />
                  <Text color="black" fontFamily="Poppins_700Bold" size="2xl">
                    Book your Consultation
                  </Text>
                </HStack>
                <View
                  style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 1
                  }}
                />
              </VStack>
              <Image
                source={image}
                size="2xl"
                alignSelf="center"
                borderRadius={20}
                marginTop={30}
                borderColor={'white'}
                borderWidth={2}
              />
              <Box
                borderRadius={20}
                backgroundColor="#158AAD"
                borderColor="black"
                borderWidth={1}
                style={global.shadow}
                padding={20}
              >
                <Box>
                  <Text
                    color="white"
                    fontFamily={'Poppins_700Bold'}
                    fontSize={18}
                  >
                    {doctor.name}
                  </Text>
                  <Text color="white">{doctor.degrees.join(', ')}</Text>
                  <Text color="white">{doctor.type}</Text>
                  <HStack justifyContent="space-between">
                    <Text color="white" bold="true">
                      {'₹' + doctor.fees}
                    </Text>
                    <Text color="white">
                      {new Date().getFullYear() - doctor.year + ' years'}
                    </Text>
                  </HStack>
                </Box>
              </Box>
              <Box
                borderRadius={20}
                backgroundColor="#158AAD"
                borderColor="black"
                borderWidth={1}
                style={global.shadow}
                padding={10}
              >
                <VStack gap={10}>
                  <Dropdown
                    style={[
                      styles.dropdown,
                      isFocus && { borderColor: 'blue' }
                    ]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    iconStyle={styles.iconStyle}
                    data={data}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    value={patient}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={(item) => {
                      setPatient(item.value)
                      setIsFocus(false)
                    }}
                    renderLeftIcon={() => (
                      <Ionicons
                        name="person-outline"
                        size={20}
                        color={isFocus ? 'blue' : 'black'}
                        style={{ marginRight: 5 }}
                      />
                    )}
                  />

                  <Text color="white" fontFamily="Poppins_700Bold">
                    Choose a date and time
                  </Text>
                  <Text color="white" fontFamily="Poppins_400Regular">
                    {date.toDateString()}, {getIST(time)}
                  </Text>

                  <HStack gap={10}>
                    <Button
                      borderRadius={15}
                      borderColor="black"
                      borderWidth={1}
                      flex={1}
                      backgroundColor="#D0F4FF"
                      paddingHorizontal={5}
                      height={35}
                      gap={5}
                      onPress={() => {
                        setDatePickerVisibility(true)
                      }}
                    >
                      <Text
                        fontSize={16}
                        fontFamily="Poppins_600SemiBold"
                        color="black"
                      >
                        Change Date
                      </Text>
                    </Button>
                    <Button
                      borderRadius={15}
                      borderColor="black"
                      borderWidth={1}
                      flex={1}
                      backgroundColor="#D0F4FF"
                      paddingHorizontal={5}
                      height={35}
                      gap={5}
                      onPress={() => {
                        setTimePickerVisibility(true)
                      }}
                    >
                      <Text
                        fontSize={16}
                        fontFamily="Poppins_600SemiBold"
                        color="black"
                      >
                        Change Time
                      </Text>
                    </Button>
                  </HStack>
                  <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    minimumDate={new Date()}
                    maximumDate={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)}
                    onConfirm={(date) => {
                      setDate(date)
                      setDatePickerVisibility(false)
                    }}
                    onCancel={() => {
                      setDatePickerVisibility(false)
                    }}
                  />
                  <DateTimePickerModal
                    isVisible={isTimePickerVisible}
                    mode="time"
                    minimumDate={new Date()}
                    maximumDate={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)}
                    onConfirm={(time) => {
                      setTime(time)
                      setTimePickerVisibility(false)
                    }}
                    onCancel={() => {
                      setTimePickerVisibility(false)
                    }}
                  />
                  <Button
                    borderRadius={15}
                    borderColor="black"
                    borderWidth={1}
                    backgroundColor="#D0F4FF"
                    paddingHorizontal={5}
                    height={35}
                    bottom={0}
                    disabled={!canBook}
                    onPress={bookConsultation}
                  >
                    <Text
                      fontSize={16}
                      fontFamily="Poppins_600SemiBold"
                      color="black"
                    >
                      Book
                    </Text>
                  </Button>
                </VStack>
              </Box>
            </VStack>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  )
}

Book.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#D0F4FF',
    alignItems: 'center'
  },
  dropdown: {
    backgroundColor: '#D0F4FF',
    height: 50,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 8
  },
  icon: {
    marginRight: 5
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14
  },
  placeholderStyle: {
    fontFamily: 'Poppins_400Regular',
    lineHeight: 40,
    fontSize: 16
  },
  selectedTextStyle: {
    fontFamily: 'Poppins_400Regular',
    lineHeight: 40,
    fontSize: 16
  },
  iconStyle: {
    width: 20,
    height: 20
  }
})

export default Book
