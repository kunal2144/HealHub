import React, { useContext, useEffect, useState } from 'react'
import {
  Avatar,
  AvatarFallbackText,
  Box,
  HStack,
  Text,
  VStack
} from '@gluestack-ui/react'
import { AuthContext } from '../components/AuthContext'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet, View, ScrollView } from 'react-native'
import { BASE_URL } from '@env'
import axios from 'axios'
import global from '../styles'
import { UpcomingConsultations } from '../components/UpcomingConsultations'
import CommonCategories from '../components/CommonCategories'
import DiseaseCard from '../components/DiseaseCard'
import BloodGroupCard from '../components/BloodGroupCard'

const Home = ({ navigation }) => {
  const { userData, userToken, setDiseases, consultations, setConsultations } =
    useContext(AuthContext)
  const [disease, setDisease] = useState(null)

  useEffect(() => {
    async function getConsultations() {
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
    }

    const getDiseases = async () => {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        }

        const response = await axios.get(`${BASE_URL}api/disease`, {}, config)

        let now = new Date()
        let start = new Date(now.getFullYear(), 0, 0)
        let diff = now - start
        let oneDay = 1000 * 60 * 60 * 24
        let rowToRetrieve = Math.floor(diff / oneDay) % 21

        setDisease(response.data[rowToRetrieve])
        setDiseases(response.data)
      } catch (error) {
        console.log(error)
      }
    }

    getConsultations()
    getDiseases()
  }, [])

  useEffect(() => {}, [])

  if (disease === null || consultations === null) return null

  return (
    <SafeAreaView style={styles.container}>
      <View height={'100%'} width={'95%'}>
        <View height={'95%'}>
          <ScrollView style={{ marginBottom: 10 }}>
            <VStack gap={15} marginBottom={50}>
              <Box
                height={80}
                width={'100%'}
                backgroundColor="white"
                borderColor="#158AAD"
                borderWidth={1}
                borderRadius={18}
                style={global.shadow}
              >
                <HStack
                  justifyContent="center"
                  alignItems="center"
                  height={'100%'}
                  gap={30}
                >
                  <Box>
                    <Text
                      fontFamily="Poppins_700Bold"
                      color={'black'}
                      lineHeight={26}
                      fontSize={20}
                    >
                      Good morning{' '}
                      {userData.firstName.length > 7 ? '' : userData.firstName},
                    </Text>
                    <Text fontFamily="Poppins_400Regular">
                      How are you doing today?
                    </Text>
                  </Box>
                  <Avatar>
                    <AvatarFallbackText>
                      {`${userData.firstName} ${userData.lastName}`}
                    </AvatarFallbackText>
                  </Avatar>
                </HStack>
              </Box>
              <HStack gap={10} justifyContent="space-between">
                <BloodGroupCard navigation={navigation} />
                <DiseaseCard navigation={navigation} disease={disease} />
              </HStack>
              <UpcomingConsultations navigation={navigation} />
              <CommonCategories navigation={navigation} />
            </VStack>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#D0F4FF',
    alignItems: 'center'
  }
})

export default Home
