import { View } from 'react-native'
import React from 'react'
import PropTypes from 'prop-types'
import { AntDesign } from '@expo/vector-icons'

const ConsultationsButton = ({ focused }) => {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <AntDesign
        name="calendar"
        size={24}
        color={focused ? '#158AAD' : 'black'}
      />
    </View>
  )
}

ConsultationsButton.propTypes = {
  focused: PropTypes.bool.isRequired
}

export default ConsultationsButton
