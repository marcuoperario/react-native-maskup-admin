import { View, Text } from 'react-native'
import React from 'react'
import tw from 'twrnc'

const Footer = ({ twContainer, twText }) => {
  return (
    <>
      <View style = {[ tw `m-10 ${twContainer}` ]}>
        <Text style = {[ tw `text-center ${twText}` ]}>
          © 2022 HighDef Supply and Serivces Corp. All rights Reserved.
        </Text>
      </View>
    </>
  )
}

export default Footer