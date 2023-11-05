import React from 'react'
import { HStack, Image, Text, VStack } from '@gluestack-ui/react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import Physician from '../assets/physician.jpg'
import Orthopedician from '../assets/orthopedician.jpg'
import Dermatologist from '../assets/dermatologist.jpg'
import Sexologist from '../assets/sexologist.jpg'
import Pediatrician from '../assets/pediatrician.jpg'
import MentalHealth from '../assets/mentalhealth.jpg'
import Search from '../components/Search'

const Specialists = ({ navigation }) => {
  const specialists = [
    {
      image: Physician,
      name: 'Physician'
    },
    {
      image: Orthopedician,
      name: 'Orthopedician'
    },
    {
      image: Dermatologist,
      name: 'Dermatologist'
    },
    {
      image: Sexologist,
      name: 'Sexologist'
    },
    {
      image: Pediatrician,
      name: 'Pediatrician'
    },
    {
      image: MentalHealth,
      name: 'Mental Health'
    }
  ]

  const data = specialists.concat(specialists.concat(specialists))

  const [displayedData, setDisplayedData] = React.useState(data)

  return (
    <SafeAreaView style={styles.container}>
      <View height={'100%'} width={'95%'}>
        <View height={'100%'}>
          <VStack gap={5} marginTop={10} marginBottom={10}>
            <HStack gap={10} alignItems="center">
              <MaterialCommunityIcons name="doctor" size={24} color={'black'} />
              <Text color="black" fontFamily="Poppins_700Bold" size="2xl">
                Choose a type
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
              return data.filter((specialist) => {
                return specialist.name
                  .toLowerCase()
                  .includes(value.toLowerCase())
              })
            }}
          />
          <ScrollView
            style={{ marginBottom: 10 }}
            contentContainerStyle={{ alignItems: 'center' }}
          >
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                columnGap: 35,
                rowGap: 20,
                justifyContent: 'center'
              }}
            >
              {displayedData.map((category, index) => (
                <VStack gap={2} alignItems="center" key={index}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('Doctors', {
                        type: category.name
                      })
                    }
                  >
                    <View>
                      <Image
                        source={category.image}
                        size="lg"
                        borderRadius={10}
                        borderColor={'black'}
                        borderWidth={1}
                      />
                    </View>
                  </TouchableOpacity>
                  <Text color="black" fontFamily="Poppins_400Regular" size="sm">
                    {category.name}
                  </Text>
                </VStack>
              ))}
            </View>
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

export default Specialists
