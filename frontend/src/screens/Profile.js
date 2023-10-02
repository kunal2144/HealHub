import React, { useContext, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { HStack, Text, VStack } from '@gluestack-ui/react'
import { Ionicons } from '@expo/vector-icons'
import PersonalInformation from '../components/PersonalInformation'
import FamilyInformation from '../components/FamilyInformation'
import { AuthContext } from '../components/AuthContext'

const Profile = () => {
  const { userData, setUserData } = useContext(AuthContext)
  const [isFree, setIsFree] = useState(true)
  return (
    <SafeAreaView style={styles.container}>
      <View height={'100%'} width={'95%'}>
        <View height={'95%'}>
          <ScrollView
            style={{ marginBottom: 10 }}
            automaticallyAdjustKeyboardInsets={true}
          >
            <VStack gap={15} marginTop={10} marginBottom={50}>
              <VStack gap={5}>
                <HStack gap={10}>
                  <Ionicons name="person-outline" size={24} color="black" />
                  <Text color="black" fontFamily="Poppins_700Bold" size="2xl">
                    Profile Management
                  </Text>
                </HStack>
                <View
                  style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 1
                  }}
                />
              </VStack>
              <PersonalInformation
                userData={userData}
                setUserData={setUserData}
                isFree={isFree}
                setIsFree={setIsFree}
              />
              <FamilyInformation
                userData={userData}
                setUserData={setUserData}
                isFree={isFree}
                setIsFree={setIsFree}
              />
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

export default Profile
