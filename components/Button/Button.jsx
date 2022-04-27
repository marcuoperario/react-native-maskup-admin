import { View, Text, Pressable, StyleSheet } from 'react-native'
import React, { useEffect, useRef } from 'react'
import tw from 'twrnc'

const Button = ( { placeholder, bgColor, placeholderTextColor, borderColor, onPress } ) => {
    const handleButtonPress = () => {
        onPress()
    }

  return (
        <Pressable 
            style = {[
                tw `flex-1 flex-row justify-center items-center rounded-xl p-4 border-2`, { 
                    backgroundColor: bgColor, 
                    borderColor: borderColor, 
                }
            ]} 
            onPress = { handleButtonPress }>
            <View>
                <Text style = {[ tw `text-xl font-bold text-center`, { 
                    color: placeholderTextColor
                }]}>
                    { placeholder }
                </Text>
            </View>
        </Pressable>
  )
}

export default Button