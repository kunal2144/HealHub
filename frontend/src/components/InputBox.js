import React from 'react'
import { Box, Input, InputInput } from '@gluestack-ui/react'
import { AntDesign } from '@expo/vector-icons'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

const InputBox = (props) => {
  return (
    <Input style={styles.input}>
      <Box style={styles.icon}>
        <AntDesign name={props.icon} size={20} color="white" />
      </Box>
      <InputInput
        placeholder={props.placeholder ? props.placeholder : ''}
        fontFamily={'Courier'}
        placeholderTextColor="#A0A6A1"
        color="#3a3a3a"
        autoCapitalize="none"
        spellCheck={false}
        keyboardType={props.keyboardType ? props.keyboardType : 'default'}
        type={props.type ? props.type : 'text'}
        autoFocus={false}
        autoCorrect={false}
      />
    </Input>
  )
}

InputBox.propTypes = {
  icon: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  keyboardType: PropTypes.string,
  type: PropTypes.string
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
