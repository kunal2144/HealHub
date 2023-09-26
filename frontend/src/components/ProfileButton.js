import { View } from 'react-native'
import React from 'react'
import PropTypes from 'prop-types'
import { Ionicons } from '@expo/vector-icons'

const ProfileButton = ({ focused }) => {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Ionicons
        name="person-outline"
        size={24}
        color={focused ? '#158AAD' : 'black'}
      />
    </View>
  )
}

ProfileButton.propTypes = {
  focused: PropTypes.bool.isRequired
}

export default ProfileButton
