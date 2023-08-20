import React from 'react'
import {
  Toast,
  ToastDescription,
  ToastTitle,
  VStack
} from '@gluestack-ui/react'
import { AntDesign } from '@expo/vector-icons'
import PropTypes from 'prop-types'
import { Pressable } from 'react-native'

const CustomToast = (props) => {
  return (
    <Toast
      nativeId={props.id}
      action={props.actionType}
      variant="solid"
      backgroundColor={props.backgroundColor}
    >
      <VStack space="s">
        <ToastTitle color={props.color}>{props.title}</ToastTitle>
        <ToastDescription color={props.color}>
          {props.description}
        </ToastDescription>
      </VStack>
      <Pressable mt="1" onPress={() => props.toast.close(props.id)}>
        <AntDesign name="close" color={props.buttonColor} />
      </Pressable>
    </Toast>
  )
}

CustomToast.propTypes = {
  id: PropTypes.number.isRequired,
  actionType: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  color: PropTypes.string,
  buttonColor: PropTypes.string,
  toast: PropTypes.object.isRequired
}

export default CustomToast
