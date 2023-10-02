import React, { useEffect, useState } from 'react'
import { Box, Button, HStack, Text, VStack } from '@gluestack-ui/react'
import { AntDesign, Feather } from '@expo/vector-icons'
import global from '../styles'
import PropTypes from 'prop-types'
import FamilyMemberInformation from './FamilyMemberInformation'
import axios from 'axios'
import { BASE_URL } from '@env'

const FamilyInformation = ({ userData, setUserData, isFree, setIsFree }) => {
  const [isAddingMember, setIsAddingMember] = useState(false)
  const [editingMember, setEditingMember] = useState(null)
  const [memberData, setMemberData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const members = await axios.post(
        `${BASE_URL}api/patient/get-members`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userData.token}`
          }
        }
      )

      const updatedMembers = members.data.reduce((res, member) => {
        res[member._id] = {
          firstName: member.first_name,
          lastName: member.last_name,
          dob: member.date_of_birth,
          gender: member.gender,
          bloodGroup: member.blood_group
        }
        return res
      }, {})

      setMemberData(updatedMembers)
    }
    if (userData.familyMembers) fetchData()
  }, [userData.familyMembers])

  const addMember = async () => {
    try {
      const member = await axios.post(
        `${BASE_URL}api/patient/add-member`,
        {
          first_name: memberData['new'].firstName,
          last_name: memberData['new'].lastName,
          gender: memberData['new'].gender,
          date_of_birth: memberData['new'].dob,
          blood_group: memberData['new'].bloodGroup
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userData.token}`
          }
        }
      )

      setUserData((user) => ({
        ...user,
        familyMembers: [...user.familyMembers, member.data._id]
      }))
      setMemberData((members) => {
        let updatedMembers = {
          ...members,
          [member.data._id]: members['new']
        }
        delete updatedMembers['new']
        console.log(updatedMembers)
        return updatedMembers
      })
    } catch (error) {
      console.log(error)
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
          Family Information
        </Text>
        <VStack gap={10} width={'100%'}>
          {isAddingMember ? (
            <>
              <VStack gap={10} width={'100%'}>
                <FamilyMemberInformation
                  id={'new'}
                  memberData={memberData['new']}
                  setMemberData={setMemberData}
                />
              </VStack>
              <HStack gap={10} justifyContent="space-between">
                <Button
                  borderRadius={15}
                  borderColor="black"
                  borderWidth={1}
                  flex={1}
                  backgroundColor="#D0F4FF"
                  paddingHorizontal={5}
                  height={35}
                  gap={5}
                  onPress={() => {
                    setIsAddingMember(false)
                    setIsFree(true)
                    delete memberData['new']
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
                  flex={1}
                  backgroundColor="#D0F4FF"
                  paddingHorizontal={5}
                  height={35}
                  gap={5}
                  onPress={() => {
                    setIsAddingMember(false)
                    setIsFree(true)
                    addMember()
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
            </>
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
                setIsAddingMember(true)
                setIsFree(false)
              }}
              isDisabled={!isFree}
            >
              <AntDesign name="plussquare" size={20} color="black" />
              <Text
                fontSize={16}
                fontFamily="Poppins_600SemiBold"
                color="black"
              >
                Add Member
              </Text>
            </Button>
          )}
          {editingMember != null && (
            <VStack key={editingMember} gap={10}>
              <FamilyMemberInformation
                id={editingMember}
                memberData={memberData[editingMember]}
                setMemberData={setMemberData}
              />
              <HStack gap={10} justifyContent="space-between">
                <Button
                  borderRadius={15}
                  borderColor="black"
                  borderWidth={1}
                  flex={1}
                  backgroundColor="#D0F4FF"
                  paddingHorizontal={5}
                  height={35}
                  gap={5}
                  onPress={() => {
                    setEditingMember(null)
                    setIsFree(true)
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
                  flex={1}
                  backgroundColor="#D0F4FF"
                  paddingHorizontal={5}
                  height={35}
                  gap={5}
                  onPress={() => {
                    setEditingMember(null)
                    setIsFree(true)
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
            </VStack>
          )}
          {Object.keys(memberData).map(
            (id) =>
              editingMember != id &&
              id != 'new' && (
                <Box
                  key={id}
                  borderRadius={20}
                  backgroundColor="#D0F4FF"
                  borderColor="black"
                  borderWidth={1}
                  padding={10}
                >
                  <HStack
                    justifyContent="space-between"
                    alignItems="center"
                    gap={10}
                  >
                    <Text
                      color="black"
                      fontFamily="Poppins_700Bold"
                      flex={1}
                      marginLeft={10}
                      ellipsizeMode="tail"
                      numberOfLines={1}
                    >
                      {memberData[id].firstName} {memberData[id].lastName}
                    </Text>
                    <Button
                      backgroundColor="#D0F4FF"
                      height={35}
                      isDisabled={!isFree}
                      onPress={() => {
                        setEditingMember(id)
                        setIsFree(false)
                      }}
                    >
                      <Feather name="edit" size={20} color="black" />
                    </Button>
                    <Box
                      height={'100%'}
                      width={1}
                      backgroundColor="black"
                    ></Box>
                    <Button
                      backgroundColor="#D0F4FF"
                      height={35}
                      isDisabled={!isFree}
                      onPress={() => {}}
                    >
                      <Feather name="trash" size={20} color="black" />
                    </Button>
                  </HStack>
                </Box>
              )
          )}
        </VStack>
      </VStack>
    </Box>
  )
}

FamilyInformation.propTypes = {
  userData: PropTypes.object,
  setUserData: PropTypes.func,
  isFree: PropTypes.bool,
  setIsFree: PropTypes.func
}

export default FamilyInformation
