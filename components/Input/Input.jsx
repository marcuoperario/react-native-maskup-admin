import { View, Text, TextInput, TouchableHighlight, Pressable } from 'react-native'
import React, { useState, useEffect, useRef} from 'react'
import tw from 'twrnc'
import { globalStyles } from '../../globals/globals'

const Input = ( { placeholder, placeholderTextColor, keyboardType, value, onChangeText, tailwind, secureTextEntry} ) => {
  const [ focused, setFocused ] = useState(false)
  const [ pressed, setPressed ] = useState(false)
  const [ passwordVisible, setPasswordVisible ] = useState(secureTextEntry)
  const refsFocus = useRef(null)

  return (
    <>
      <TouchableHighlight
        activeOpacity = {0.6}
        underlayColor = "#2F4763"
        onPress = {() => {
          refsFocus.current.focus()
        }}
        style = {[ tw `flex-1 flex-row items-center justify-between rounded-xl border-2 border-transparent`, focused ? tw `border-2 border-white` : null, globalStyles.secondaryBG ]}
      >
        <>
          <View style = {[ tw `flex-1 flex flex-col p-5` ]}>
            <Text style = {[ tw `text-xs font-bold`, globalStyles.secondaryText ]}>
              {label}
            </Text>
            <View style = {[ tw `flex-1` ]}>
              <TextInput
                style = {[ tw `flex-1 text-sm text-white border-0`, tw `${ tailwind }` ]}
                placeholder = { placeholder }
                placeholderTextColor = { placeholderTextColor }
                keyboardType = { keyboardType }
                value = { value }
                onChangeText = { onChangeText } 
                secureTextEntry = { passwordVisible }
                onFocus = {() => setFocused(true)}
                onBlur = {() =>  setFocused(false)}
                ref = { refsFocus }
              />
            </View>
          </View>
          { inactiveRightIcon && activeRightIcon ?
            <Pressable
              style = {[ tw `pr-6`]}
              onPress = {() => {
                setPressed(!pressed)
                setPasswordVisible(!passwordVisible)
              }}
            >
              <>
                { pressed ? activeRightIcon : inactiveRightIcon }
              </>
            </Pressable>
            : null
          }
        </>
      </TouchableHighlight>
    </>
  )
}



export default Input;
