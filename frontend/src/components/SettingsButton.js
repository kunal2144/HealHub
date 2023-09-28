import { View } from 'react-native'
import React from 'react'
import PropTypes from 'prop-types'
import { AntDesign } from '@expo/vector-icons'

const SettingsButton = ({ focused }) => {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <AntDesign
        name="setting"
        size={24}
        color={focused ? '#158AAD' : 'black'}
      />
    </View>
  )
}

SettingsButton.propTypes = {
  focused: PropTypes.bool.isRequired
}

export default SettingsButton
