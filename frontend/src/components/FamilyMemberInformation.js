import React, { useMemo } from 'react'
import { Input, VStack, Text, InputInput } from '@gluestack-ui/react'
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'

import PropTypes from 'prop-types'
import { RadioGroup } from 'react-native-radio-buttons-group'

const InputField = ({ label, value, setValue, Icon }) => {
  return (
    <VStack width={'100%'}>
      <Text
        color="white"
        fontFamily="Poppins_400Regular"
        size="sm"
        alignSelf="flex-start"
      >
        {label}
      </Text>
      <Input variant="underlined" size="sm" borderColor="white">
        <InputInput
          value={value}
          onChange={(e) => {
            setValue(e.nativeEvent.text)
          }}
          placeholderTextColor={'white'}
          color="white"
          fontFamily="Poppins_600SemiBold"
          fontSize={16}
        />
        {Icon}
      </Input>
    </VStack>
  )
}

InputField.propTypes = {
  editable: PropTypes.bool,
  value: PropTypes.string,
  setValue: PropTypes.func,
  Icon: PropTypes.element,
  label: PropTypes.string
}

const FamilyMemberInformation = ({ id, memberData = {}, setMemberData }) => {
  const inputFields = {
    firstName: {
      Icon: <Ionicons name="person-outline" size={24} color="white" />,
      label: 'First Name',
      value: memberData.firstName,
      setValue: (value) => {
        setMemberData((member) => ({
          ...member,
          [id]: {
            ...memberData,
            firstName: value
          }
        }))
      }
    },
    lastName: {
      Icon: <Ionicons name="person-outline" size={24} color="white" />,
      label: 'Last Name',
      value: memberData.lastName,
      setValue: (value) => {
        setMemberData((member) => ({
          ...member,
          [id]: {
            ...memberData,
            lastName: value
          }
        }))
      }
    },
    dob: {
      Icon: (
        <MaterialCommunityIcons
          name="cake-variant-outline"
          size={24}
          color="white"
        />
      ),
      label: 'Date of Birth',
      value: memberData.dob,
      setValue: (value) => {
        setMemberData((member) => ({
          ...member,
          [id]: {
            ...memberData,
            dob: value
          }
        }))
      }
    },
    bloodGroup: {
      Icon: <Feather name="droplet" size={24} color="white" />,
      label: 'Blood Group',
      value: memberData.bloodGroup,
      setValue: (value) => {
        setMemberData((member) => ({
          ...member,
          [id]: {
            ...memberData,
            bloodGroup: value
          }
        }))
      }
    }
  }

  const radioButtons = useMemo(() => {
    const commonVals = {
      borderColor: 'white',
      color: 'white',
      labelStyle: {
        color: 'white',
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 16
      }
    }
    return [
      {
        id: '1',
        label: 'Male',
        value: 'male',
        ...commonVals
      },
      {
        id: '2',
        label: 'Female',
        value: 'female',
        ...commonVals
      },
      {
        id: '3',
        label: 'Other',
        value: 'other',
        ...commonVals
      }
    ]
  }, [])

  return (
    <>
      {Object.keys(inputFields).map((key) => (
        <InputField
          key={key}
          label={inputFields[key].label}
          value={inputFields[key].value}
          setValue={inputFields[key].setValue}
          Icon={inputFields[key].Icon}
        />
      ))}
      <VStack width={'100%'} gap={5}>
        <Text
          color="white"
          fontFamily="Poppins_400Regular"
          size="sm"
          alignSelf="flex-start"
        >
          Gender
        </Text>
        <RadioGroup
          radioButtons={radioButtons}
          onPress={(selectedId) => {
            setMemberData((member) => ({
              ...member,
              [id]: {
                ...memberData,
                gender: radioButtons.find((e) => e.id === selectedId).value
              }
            }))
          }}
          selectedId={
            memberData.gender === 'N/A' || memberData.gender === undefined
              ? '0'
              : radioButtons.find((e) => e.value === memberData.gender).id
          }
          layout="row"
          containerStyle={{
            marginHorizontal: -10,
            justifyContent: 'space-between'
          }}
        />
      </VStack>
    </>
  )
}

FamilyMemberInformation.propTypes = {
  id: PropTypes.string,
  memberData: PropTypes.object,
  setMemberData: PropTypes.func
}

export default FamilyMemberInformation
