import { VStack } from '@gluestack-ui/react'
import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SearchBar } from 'react-native-elements'
import axios from 'axios'
import { BASE_URL } from '@env'
import DiseaseCard from '../components/DiseaseCard'
import PropTypes from 'prop-types'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Diseases = ({ route }) => {
  const { navigation } = route.params
  const [searchValue, setSearchValue] = useState('')
  const [displayedData, setDisplayedData] = useState([])
  const [data, setData] = useState([])

  useEffect(() => {
    const getDiseases = async () => {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        }

        const response = await axios.get(`${BASE_URL}api/disease`, {}, config)

        setData(response.data)
        setDisplayedData(response.data)
        await AsyncStorage.setItem('Diseases', JSON.stringify(response.data))
      } catch (error) {
        console.log(error)
      }
    }

    const getDiseasesFromStorage = async () => {
      try {
        const diseases = await AsyncStorage.getItem('Diseases')
        if (diseases) {
          setData(JSON.parse(diseases))
          setDisplayedData(JSON.parse(diseases))
        } else {
          getDiseases()
        }
      } catch (error) {
        console.log(error)
      }
    }

    getDiseasesFromStorage()
  }, [])

  const searchFunction = (text) => {
    const updatedData = data.filter((item) => {
      const item_data = `${item.Name.toUpperCase()})`
      const text_data = text.toUpperCase()
      return item_data.indexOf(text_data) > -1
    })
    setDisplayedData(updatedData)
    setSearchValue(text)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View height={'100%'} width={'95%'}>
        <View height={'100%'}>
          <ScrollView style={{ marginBottom: 10 }}>
            <VStack gap={15} marginBottom={20}>
              <SearchBar
                placeholder="Search Here..."
                lightTheme
                round
                value={searchValue}
                onChangeText={(text) => searchFunction(text)}
                autoCorrect={false}
              />
            </VStack>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
              {displayedData.map((item) => (
                <DiseaseCard
                  key={item.ID}
                  disease={item}
                  navigation={navigation}
                />
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  )
}

Diseases.propTypes = {
  route: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#D0F4FF',
    alignItems: 'center'
  }
})

export default Diseases
