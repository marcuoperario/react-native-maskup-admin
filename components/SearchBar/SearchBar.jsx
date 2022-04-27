// import { View, TextInput, Pressable, Text } from 'react-native'
// import React, { useState, useRef } from 'react'
// import tw from "twrnc"
// import { globalStyles } from '../../globals/globals'
// import { FontAwesome, Ionicons } from '@expo/vector-icons'

// const SearchBar = ({ placeholder, onChangeText, placeholderTextColor, value, onKeyPress, onBlur }) => {
//   const [ focused, setFocused ] = useState(false)
//   const refsFocus = useRef(null)
//   return (
//     <Pressable 
//       onPress = {() => {
//         refsFocus.current.focus()
//       }}
//       style = {[ tw `flex flex-row rounded-xl p-4 items-center justify-around border-2 border-transparent`, focused ? tw `border-2 border-white` : null, globalStyles.quarternaryBG ]}
//     >
//       <View style = {[ tw `mx-1` ]}>
//         <Ionicons 
//           name = "md-search-sharp" 
//           size = { 24 } 
//           color = "#60666D" 
//           onPress = {() => {
//             refsFocus.current.focus()
//           }}
//         />
//       </View>
//       <View style = {[ tw `mx-2 flex-1` ]}>
//         <TextInput 
//           onChangeText = { onChangeText }
//           value = { value }
//           keyboardType = "default"
//           placeholder = { placeholder }
//           placeholderTextColor = { placeholderTextColor }
//           style = {[ tw `text-base font-semibold border-0 `, globalStyles.secondaryText ]}
//           onKeyPress = { onKeyPress }
//           onFocus = {() => setFocused(true)}
//           onBlur = {() =>  { 
//             setFocused(false)
//             { onBlur }
//           }}
          
//           ref = { refsFocus }
//         />
//       </View>
//       {/* <Pressable 
//         style = {[ tw `mx-2 rounded-full p-3`, { 
//           backgroundColor: "#54608A"
//         }]}
//         onPress = { buttonOnPress }
//       >
//         <Text style = {[ tw `mx-1 font-semibold`, globalStyles.primaryText ]}>
//           SEARCH
//         </Text>
//       </Pressable> */}
//     </Pressable>
//   )
// }

// export default SearchBar