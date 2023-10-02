import React, { useMemo, useState } from 'react'
import {
  Box,
  Button,
  HStack,
  Input,
  InputInput,
  Text,
  VStack,
  useToast
} from '@gluestack-ui/react'
import { Ionicons } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'
import { Feather } from '@expo/vector-icons'
import RadioGroup from 'react-native-radio-buttons-group'
import global from '../styles'
import axios from 'axios'
import { BASE_URL } from '@env'
import { saveUserData } from '../../lib/saveUserData'
import CustomToast from './CustomToast'
import PropTypes from 'prop-types'

const InputField = ({ label, editable, value, setValue, Icon }) => {
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
      <Input
        variant="underlined"
        size="sm"
        borderColor="white"
        isDisabled={!editable}
      >
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

const PersonalInformation = ({ userData, setUserData, isFree, setIsFree }) => {
  const personalInfoData = useMemo(() => {
    return {
      firstName: userData.firstName,
      lastName: userData.lastName,
      dob: userData.dob || 'N/A',
      phoneNumber: userData.phoneNumber || 'N/A',
      bloodGroup: userData.bloodGroup || 'N/A',
      gender: userData.gender || 'N/A'
    }
  }, [userData])
  const [personalInfo, setPersonalInfo] = useState(personalInfoData)
  const [isEditingPersonal, setIsEditingPersonal] = useState(false)

  const toast = useToast()
  const showToast = (title, description) => {
    toast.show(
      {
        placement: 'top',
        duration: 5000,
        render: ({ id }) => {
          return (
            <CustomToast
              id={id}
              backgroundColor="$error700"
              actionType="error"
              title={title}
              description={description}
              color="$textLight50"
              buttonColor="white"
              toast={toast}
            />
          )
        }
      },
      'invalid'
    )
  }

  const radioButtons = useMemo(() => {
    const commonVals = {
      borderColor: 'white',
      color: 'white',
      disabled: !isEditingPersonal,
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
  }, [isEditingPersonal])

  const handleSave = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userData.token}`
        }
      }
      const body = JSON.stringify({
        first_name: personalInfo.firstName,
        last_name: personalInfo.lastName,
        date_of_birth: personalInfo.dob,
        phone_no: personalInfo.phoneNumber,
        gender: personalInfo.gender,
        blood_group: personalInfo.bloodGroup
      })
      const { data } = await axios.post(
        `${BASE_URL}api/patient/update-profile`,
        body,
        config
      )
      saveUserData(data)
      setUserData(data)
    } catch (error) {
      if (error.response.status === 500) {
        showToast('Failed to update profile', 'Please try again later')
      }
      setPersonalInfo(personalInfoData)
      console.log(error)
    }
  }

  const validInfo = () => {
    const firstNameRegex = /^[A-Z]{3,}$/i
    const lastNameRegex = /^[A-Z]{3,}$/i
    const dobRegex = /^\d{4}-\d{2}-\d{2}$/
    const phoneNumberRegex = /^\d{10}$/
    const bloodGroupRegex = /^(A|B|AB|O)[+-]$/i

    if (!firstNameRegex.test(personalInfo.firstName)) {
      showToast('Invalid First Name', 'Enter a valid first name')
      return false
    }
    if (!lastNameRegex.test(personalInfo.lastName)) {
      showToast('Invalid Last Name', 'Enter a valid last name')
      return false
    }
    if (!dobRegex.test(personalInfo.dob)) {
      showToast('Invalid Date of Birth', 'Enter a valid date of birth')
      return false
    }
    if (!phoneNumberRegex.test(personalInfo.phoneNumber)) {
      showToast('Invalid Phone Number', 'Enter a valid phone number')
      return false
    }
    if (!bloodGroupRegex.test(personalInfo.bloodGroup)) {
      showToast('Invalid Blood Group', 'Enter a valid blood group')
      return false
    }
    if (!['male', 'female', 'other'].includes(personalInfo.gender)) {
      showToast('Invalid Gender', 'Select a gender')
      return false
    }

    return true
  }

  const inputFields = {
    firstName: {
      Icon: <Ionicons name="person-outline" size={24} color="white" />,
      label: 'First Name',
      value: personalInfo.firstName,
      setValue: (value) => {
        setPersonalInfo({
          ...personalInfo,
          firstName: value
        })
      }
    },
    lastName: {
      Icon: <Ionicons name="person-outline" size={24} color="white" />,
      label: 'Last Name',
      value: personalInfo.lastName,
      setValue: (value) => {
        setPersonalInfo({
          ...personalInfo,
          lastName: value
        })
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
      value: personalInfo.dob,
      setValue: (value) => {
        setPersonalInfo({
          ...personalInfo,
          dob: value
        })
      }
    },
    phoneNumber: {
      Icon: <AntDesign name="phone" size={24} color="white" />,
      label: 'Phone Number',
      value: personalInfo.phoneNumber,
      setValue: (value) => {
        setPersonalInfo({
          ...personalInfo,
          phoneNumber: value
        })
      }
    },
    bloodGroup: {
      Icon: <Feather name="droplet" size={24} color="white" />,
      label: 'Blood Group',
      value: personalInfo.bloodGroup,
      setValue: (value) => {
        setPersonalInfo({
          ...personalInfo,
          bloodGroup: value
        })
      }
    }
  }

  return (
    <Box
      borderRadius={20}
      backgroundColor="#158AAD"
      padding={18}
      borderColor="black"
      borderWidth={1}
      style={global.shadow}
    >
      <VStack alignItems="center" gap={10}>
        <Text color="white" fontFamily="Poppins_600SemiBold" size="lg">
          Personal Information
        </Text>
        {Object.keys(inputFields).map((key) => (
          <InputField
            key={key}
            editable={isEditingPersonal}
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
              setPersonalInfo({
                ...personalInfo,
                gender: radioButtons.find((e) => e.id === selectedId).value
              })
            }}
            selectedId={
              personalInfo.gender === 'N/A'
                ? '0'
                : radioButtons.find((e) => e.value === personalInfo.gender).id
            }
            layout="row"
            containerStyle={{
              marginHorizontal: -10,
              justifyContent: 'space-between'
            }}
          />
        </VStack>
        {isEditingPersonal ? (
          <HStack gap={10} justifyContent="space-between">
            <Button
              borderRadius={15}
              borderColor="black"
              borderWidth={1}
              width={'50%'}
              backgroundColor="#D0F4FF"
              paddingHorizontal={5}
              height={35}
              gap={5}
              onPress={() => {
                setIsEditingPersonal(false)
                setIsFree(true)
                setPersonalInfo(personalInfoData)
              }}
            >
              <Feather name="x" size={20} color="black" />
              <Text
                fontSize={16}
                fontFamily="Poppins_600SemiBold"
                color="black"
              >
                Cancel
              </Text>
            </Button>
            <Button
              borderRadius={15}
              borderColor="black"
              borderWidth={1}
              width={'50%'}
              backgroundColor="#D0F4FF"
              paddingHorizontal={5}
              height={35}
              gap={5}
              onPress={() => {
                setIsEditingPersonal(false)
                setIsFree(true)
                if (validInfo()) handleSave()
              }}
            >
              <Feather name="check" size={20} color="black" />
              <Text
                fontSize={16}
                fontFamily="Poppins_600SemiBold"
                color="black"
              >
                Save
              </Text>
            </Button>
          </HStack>
        ) : (
          <Button
            borderRadius={15}
            borderColor="black"
            borderWidth={1}
            backgroundColor="#D0F4FF"
            width={'100%'}
            paddingHorizontal={5}
            height={35}
            gap={10}
            onPress={() => {
              setIsEditingPersonal(true)
              setIsFree(false)
            }}
            isDisabled={!isFree}
          >
            <Feather name="edit" size={20} color="black" />
            <Text fontSize={16} fontFamily="Poppins_600SemiBold" color="black">
              Edit
            </Text>
          </Button>
        )}
      </VStack>
    </Box>
  )
}

PersonalInformation.propTypes = {
  userData: PropTypes.object,
  setUserData: PropTypes.func,
  isFree: PropTypes.bool,
  setIsFree: PropTypes.func
}

export default PersonalInformation
