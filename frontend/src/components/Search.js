import React, { useState } from 'react'
import { AntDesign } from '@expo/vector-icons'
import { Input, InputInput } from '@gluestack-ui/react'
import PropTypes from 'prop-types'
import global from '../styles'

const Search = ({ setDisplayedData, filter }) => {
  const [searchValue, setSearchValue] = useState('')

  const searchFunction = (text) => {
    const updatedData = filter(text)
    setDisplayedData(updatedData)
  }

  return (
    <Input
      variant="rounded"
      borderColor="#7E7E7E"
      alignItems="center"
      backgroundColor={'white'}
      paddingHorizontal={20}
      size="lg"
      style={global.shadow}
      marginBottom={15}
    >
      <AntDesign name="search1" size={24} color="#7E7E7E" />
      <InputInput
        placeholder="Search..."
        placeholderTextColor={'#7E7E7E'}
        color="#7E7E7E"
        fontFamily="Poppins_600SemiBold"
        fontSize={16}
        value={searchValue}
        onChangeText={(text) => {
          setSearchValue(text)
          searchFunction(text)
        }}
        autoCorrect={false}
      />
    </Input>
  )
}

Search.propTypes = {
  setDisplayedData: PropTypes.func.isRequired,
  filter: PropTypes.func.isRequired
}

export default Search
