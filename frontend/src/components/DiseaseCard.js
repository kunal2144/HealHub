import { Box, Button, Text, VStack } from '@gluestack-ui/react'
import global from '../styles'
import React from 'react'
import PropTypes from 'prop-types'

const DiseaseCard = ({ navigation, disease }) => {
  return (
    <Box
      width={'40%'}
      height={250}
      borderRadius={20}
      backgroundColor="#158AAD"
      flexGrow={1}
      padding={18}
      borderColor="black"
      borderWidth={1}
      style={global.shadow}
    >
      <VStack height={'100%'} justifyContent="space-between">
        <Text
          color="#ffffff"
          fontFamily="Poppins_600SemiBold"
          fontSize={22}
          lineHeight={24}
          ellipsizeMode="tail"
          numberOfLines={1}
        >
          {disease['Name']}
        </Text>
        <Text
          fontFamily="Poppins_600SemiBold"
          fontSize={16}
          color="#ffffff"
          numberOfLines={5}
        >
          {disease['Description']}
        </Text>
        <Button
          borderRadius={15}
          borderColor="black"
          borderWidth={1}
          backgroundColor="#D0F4FF"
          width={'100%'}
          paddingHorizontal={5}
          height={35}
          onPress={() =>
            navigation.push('Disease', {
              disease
            })
          }
        >
          <Text fontSize={16} fontFamily="Poppins_600SemiBold" color="black">
            Read More
          </Text>
        </Button>
      </VStack>
    </Box>
  )
}

DiseaseCard.propTypes = {
  navigation: PropTypes.object.isRequired,
  disease: PropTypes.object.isRequired
}

export default DiseaseCard
