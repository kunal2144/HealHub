import { Box, Button, HStack, Image, Text, VStack } from '@gluestack-ui/react'
import Physician from '../assets/physician.jpg'
import Orthopedician from '../assets/orthopedician.jpg'
import Dermatologist from '../assets/dermatologist.jpg'
import Sexologist from '../assets/sexologist.jpg'
import Pediatrician from '../assets/pediatrician.jpg'
import MentalHealth from '../assets/mentalhealth.jpg'
import global from '../styles'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'

const categories = [
  {
    image: Physician,
    name: 'Physician'
  },
  {
    image: Orthopedician,
    name: 'Orthopedician'
  },
  {
    image: Dermatologist,
    name: 'Dermatologist'
  },
  {
    image: Sexologist,
    name: 'Sexologist'
  },
  {
    image: Pediatrician,
    name: 'Pediatrician'
  },
  {
    image: MentalHealth,
    name: 'Mental Health'
  }
]

const CommonCategories = ({ navigation }) => {
  return (
    <Box
      borderRadius={20}
      backgroundColor="#158AAD"
      borderColor="black"
      borderWidth={1}
      style={global.shadow}
      padding={20}
      gap={20}
    >
      <Text color="white" fontFamily="Poppins_700Bold" size="lg">
        Choose from various specialists
      </Text>
      <HStack flexWrap="wrap" gap={10} justifyContent="space-between">
        {categories.map((category, index) => (
          <VStack gap={2} alignItems="center" key={index}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Doctors', {
                  type: category.name
                })
              }
            >
              <Image
                source={category.image}
                size="lg"
                borderColor="white"
                borderWidth={2}
                borderRadius={10}
              />
            </TouchableOpacity>
            <Text color="white" fontFamily="Poppins_400Regular" size="sm">
              {category.name}
            </Text>
          </VStack>
        ))}
      </HStack>
      <Button
        borderRadius={15}
        borderColor="black"
        borderWidth={1}
        backgroundColor="#D0F4FF"
        width={'100%'}
        paddingHorizontal={5}
        height={35}
        onPress={() => navigation.navigate('Specialists')}
        marginTop={-2}
      >
        <Text fontSize={16} fontFamily="Poppins_600SemiBold" color="black">
          View All
        </Text>
      </Button>
    </Box>
  )
}

export default CommonCategories
