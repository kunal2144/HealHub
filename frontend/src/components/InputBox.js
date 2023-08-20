import React, { useState } from 'react'
import { Box, Input, InputIcon, InputInput } from '@gluestack-ui/react'
import { AntDesign, Entypo } from '@expo/vector-icons'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

const InputBox = (props) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <Input style={styles.input}>
      <Box style={styles.icon}>
        <AntDesign name={props.icon} size={20} color="white" />
      </Box>
      <InputInput
        placeholder={props.placeholder ? props.placeholder : ''}
        placeholderTextColor="#A0A6A1"
        color="#3a3a3a"
        autoCapitalize="none"
        spellCheck={false}
        keyboardType={props.keyboardType ? props.keyboardType : 'default'}
        type={
          props.type == 'password'
            ? showPassword
              ? 'text'
              : 'password'
            : props.type
            ? props.type
            : 'text'
        }
        autoFocus={false}
        autoCorrect={false}
        onChangeText={(value) => props.onChange(value)}
        value={props.value}
      />
      {props.type == 'password' && (
        <InputIcon
          onPress={() => setShowPassword((value) => !value)}
          marginRight={10}
        >
          <Entypo
            name={showPassword ? 'eye' : 'eye-with-line'}
            size={20}
            color="#158AAD"
          />
        </InputIcon>
      )}
    </Input>
  )
}

InputBox.propTypes = {
  icon: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  keyboardType: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 45,
    backgroundColor: '#EAFFEC',
    borderRadius: 10,
    borderWidth: 0
  },
  icon: {
    backgroundColor: '#158AAD',
    width: '17%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  }
})

export default InputBox
