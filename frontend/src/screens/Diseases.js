import React, { useContext, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import DiseaseCard from '../components/DiseaseCard'
import PropTypes from 'prop-types'
import { AuthContext } from '../components/AuthContext'
import Search from '../components/Search'

const Diseases = ({ navigation }) => {
  const { diseases } = useContext(AuthContext)
  const [displayedData, setDisplayedData] = useState(diseases)

  return (
    <SafeAreaView style={styles.container}>
      <View height={'100%'} width={'95%'}>
        <View height={'100%'}>
          <Search
            setDisplayedData={setDisplayedData}
            filter={(text) => {
              return diseases.filter((item) => {
                const item_data = `${item.Name.toUpperCase()})`
                const text_data = text.toUpperCase()
                return item_data.indexOf(text_data) > -1
              })
            }}
          />
          <ScrollView style={{ marginBottom: 10 }}>
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
