import { View } from 'react-native'
import React from 'react'
import PropTypes from 'prop-types'
import { AntDesign } from '@expo/vector-icons'

const PrescriptionsButton = ({ focused }) => {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <AntDesign
        name="filetext1"
        size={24}
        color={focused ? '#158AAD' : 'black'}
      />
    </View>
  )
}

PrescriptionsButton.propTypes = {
  focused: PropTypes.bool.isRequired
}

export default PrescriptionsButton
