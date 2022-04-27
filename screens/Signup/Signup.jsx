// import { View, Text, SafeAreaView, Alert, KeyboardAvoidingView, ScrollView, ImageBackground } from 'react-native';
// import tw from 'twrnc';
// import React, { useState, useEffect } from 'react';
// import { globalStyles } from "../../globals/globals";
// import Button from '../../components/Button/Button';
// import { useNavigation } from "@react-navigation/native";
// import Input from '../../components/Input/Input';

// const Signup = () => {
//     const navigation = useNavigation();
//     const [ firstName, setFirstName ] = useState('');
//     const [ lastName, setLastName ] = useState('');
//     const [ emailAddress, setEmailAddress ] = useState ('');
//     const [ password, setPassword ] = useState('');
//     const [ confirmPassword, setConfirmPassword ] = useState('');
//     const [error, setError] = useState({ 
//       status: false, msg: "" 
//     });

//     const handleSubmit = () =>{
//       setError({ status: false, msg: "" })
//       const formValidation = () =>{

//       };

//       const formSubmit = () =>{
          
//       };

//       formSubmit();
//       navigation.replace("Signin")
//     };
//     return (
//         <>
//           <SafeAreaView style = {[ tw ``, globalStyles.blueBgColor ]}>
//             <View style = {[ tw ``]}> 
//               <View style = {[ tw `p-8` ]}>
//                 <View>
//                     {/* <Ionicons 
//                         style = {[ tw `text-3xl font-bold text-white` ]} 
//                         onPress = {() => { 
//                             navigation.navigate("Signin") 
//                         }}
//                         name = "arrow-back" 
//                         color="white" 
//                     /> */}
//                     <Text style = {[ tw `mt-2 text-2xl font-bold text-white` ]}>
//                         Sign up
//                     </Text>
//                 </View>
//               </View>
//             </View>
//             <View style = {[tw `h-full bg-white rounded-3xl`]}>
//               <KeyboardAvoidingView behavior = "padding">
//                 <ScrollView>
//                   <View style = {[ tw `p-8` ]}>
//                     <View style = {[ tw `my-2` ]}>
//                       <View style = {[ tw `flex-row items-center my-3` ]}>
//                         <View style = {[ tw `w-1/2` ]}>
//                           <Text style = {[ tw `text-base font-bold text-black`]}>
//                             First Name
//                           </Text>
//                           <Input 
//                             tailwind = "text-sm text-black rounded-xl p-5"
//                             backgroundColor = "#F7F8FB"
//                             placeholderTextColor = "lightgray"
//                             placeholder = "John"
//                             keyboardType = "default"
//                             value = { firstName }
//                             errorHandling = { error }
//                             onChangeText = { value => setFirstName(value) }
//                           />
//                         </View>
//                         <View style = {[ tw `w-1/2 mx-1` ]}>
//                           <Text style = {[ tw `text-base font-bold text-black`]}>
//                             Last Name
//                           </Text>
//                           <Input
//                             tailwind = "text-sm text-black rounded-xl p-5"
//                             backgroundColor = "#F7F8FB"
//                             placeholderTextColor = "lightgray"
//                             placeholder = "Doe"
//                             keyboardType = "default"
//                             value = { lastName }
//                             onChangeText = { value => setLastName(value) }
//                           />
//                         </View>
//                       </View>
//                       <View style = {[ tw `my-2` ]}>
//                         <Text style = {[ tw `text-base font-bold text-black`]}>
//                           Email Address
//                         </Text>
//                         <Input
//                           tailwind = "text-sm text-black rounded-xl p-5"
//                           backgroundColor = "#F7F8FB"
//                           placeholderTextColor = "lightgray"
//                           placeholder = "name@email.com"
//                           keyboardType = "email-address"
//                           value = { emailAddress }
//                           onChangeText = { value => setEmailAddress(value) }
//                           errorMessage = "asdsd"
//                         />
//                       </View>
//                       <View style = {[ tw `my-2` ]}>
//                         <Text style = {[ tw `text-base font-bold text-black`]}>
//                             Password
//                         </Text>
//                         <Input
//                           tailwind = "text-sm text-black rounded-xl p-5"
//                           backgroundColor = "#F7F8FB"
//                           placeholderTextColor = "lightgray"
//                           placeholder = "********"
//                           keyboardType = "default"
//                           secureTextEntry = { true }
//                           value = { password }
//                           onChangeText = { value => setPassword(value) }
//                         />
//                       </View>
//                       <View style = {[ tw `my-2` ]}>
//                         <Text style = {[ tw `text-base font-bold text-black`]}>
//                             Confirm Password
//                         </Text>
//                         <Input
//                           tailwind = "text-sm text-black rounded-xl p-5"
//                           backgroundColor = "#F7F8FB"
//                           placeholderTextColor = "lightgray"
//                           placeholder = "********"
//                           keyboardType = "default"
//                           secureTextEntry = { true }
//                           value = { confirmPassword }
//                           onChangeText = { value => setConfirmPassword(value) }
//                         />
//                       </View>
//                       <View style = {[ tw `my-2` ]}>
//                         <Button 
//                             placeholder = "Sign up" 
//                             bgColor = "#063CC6" 
//                             placeholderTextColor = "white" 
//                             borderColor = "transparent"
//                             onPress = {() =>{
//                               handleSubmit()
//                             }}
//                         />
//                       </View>
//                       <View style = {[ tw `flex-row justify-center m-5` ]}>
//                         <Text style = {[ tw `text-gray-300 font-bold text-center` ]}>
//                             Already have an account?
//                         </Text>
//                         <Text 
//                             onPress = {() => { 
//                                 navigation.navigate("Signin") 
//                             }}
//                             style = {[ tw `text-blue-600 font-bold text-center ml-1` ]}
//                         >
//                             Sign in
//                         </Text>
//                       </View>
//                     </View>
//                   </View>
//                 </ScrollView>
//               </KeyboardAvoidingView>
//             </View>
//           </SafeAreaView>
//         </>
//   )
// }

// export default Signup

