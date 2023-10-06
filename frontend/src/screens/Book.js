import {
  Box,
  Button,
  HStack,
  Image,
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
  Text,
  VStack
} from '@gluestack-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { AntDesign } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import global from '../styles'
import { AuthContext } from '../components/AuthContext'
import axios from 'axios'
import { BASE_URL } from '@env'
import DateTimePickerModal from 'react-native-modal-datetime-picker'

const Book = ({ navigation, route }) => {
  const { category, image } = route.params
  const { userData, setConsultations } = useContext(AuthContext)
  const [memberData, setMemberData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
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

      let updatedMembers = members.data.reduce((res, member) => {
        res[member._id] = {
          firstName: member.first_name,
          lastName: member.last_name
        }
        return res
      }, {})

      updatedMembers['self'] = {
        firstName: userData.firstName,
        lastName: userData.lastName
      }

      setMemberData(updatedMembers)
    }
    if (userData.familyMembers) fetchData()
  }, [userData.familyMembers])

  const bookConsultation = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userData.token}`
        }
      }

      const response = await axios.post(
        `${BASE_URL}api/consultation/book-consultation`,
        {
          category: category,
          user: patient,
          start_datetime: date
        },
        config
      )

      setConsultations((prev) => {
        return {
          ...prev,
          upcoming: [...prev.upcoming, response.data]
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false)
  const [patient, setPatient] = useState(userData._id)
  const [date, setDate] = useState(new Date())
  const [time, setTime] = useState(new Date())

  const getIST = (date) => {
    let time = date
      .toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
      .split(', ')[1]
      .split(':')

    return `${time[0]}:${time[1]} ${time[2].split(' ')[1]}`
  }

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
                paddingVertical={10}
              >
                <Text
                  color="white"
                  fontFamily="Poppins_700Bold"
                  size="lg"
                  alignSelf="center"
                >
                  Catergory: {category}
                </Text>
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
                  <Text color="white" fontFamily="Poppins_400Regular">
                    Select Patient
                  </Text>
                  <Select
                    selectedValue={patient}
                    onValueChange={(val) => setPatient(val)}
                  >
                    <SelectTrigger
                      variant="outline"
                      size="md"
                      paddingHorizontal={10}
                    >
                      <SelectInput
                        placeholder="Select option"
                        placeholderTextColor={'white'}
                        color={'white'}
                      />
                      <AntDesign name="caretdown" size={24} color="white" />
                    </SelectTrigger>
                    <SelectPortal>
                      <SelectBackdrop />
                      <SelectContent>
                        <SelectDragIndicatorWrapper>
                          <SelectDragIndicator />
                        </SelectDragIndicatorWrapper>
                        {Object.keys(memberData).map((id) => (
                          <SelectItem
                            key={id}
                            value={id}
                            label={`${memberData[id].firstName} ${memberData[id].lastName}`}
                          />
                        ))}
                      </SelectContent>
                    </SelectPortal>
                  </Select>
                  <Text color="white" fontFamily="Poppins_400Regular">
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
                    onPress={() => {
                      bookConsultation()
                      navigation.navigate('Consultations')
                    }}
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
  }
})

export default Book
