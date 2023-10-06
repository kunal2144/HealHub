import { Input, InputInput, VStack } from '@gluestack-ui/react'
import React, { useContext, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import DiseaseCard from '../components/DiseaseCard'
import PropTypes from 'prop-types'
import { AntDesign } from '@expo/vector-icons'
import global from '../styles'
import { AuthContext } from '../components/AuthContext'

const Diseases = ({ navigation }) => {
  const { diseases } = useContext(AuthContext)
  const [searchValue, setSearchValue] = useState('')
  const [displayedData, setDisplayedData] = useState(diseases)

  const searchFunction = (text) => {
    const updatedData = diseases.filter((item) => {
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
          <Input
            variant="rounded"
            borderColor="#7E7E7E"
            alignItems="center"
            backgroundColor={'white'}
            paddingHorizontal={20}
            size="lg"
            style={global.shadow}
            marginBottom={10}
          >
            <AntDesign name="search1" size={24} color="#7E7E7E" />
            <InputInput
              placeholder="Search..."
              placeholderTextColor={'#7E7E7E'}
              color="#7E7E7E"
              fontFamily="Poppins_600SemiBold"
              fontSize={16}
              value={searchValue}
              onChangeText={(text) => searchFunction(text)}
              autoCorrect={false}
            />
          </Input>
          <ScrollView style={{ marginBottom: 10 }}>
            <VStack gap={15} marginBottom={20}></VStack>
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
