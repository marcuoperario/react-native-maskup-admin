import { View, Text, Alert, SafeAreaView, KeyboardAvoidingView, ScrollView, Image } from 'react-native'
import React from 'react'
import { globalStyles } from '../../globals/globals'
import tw from 'twrnc'
import Button from '../../components/Button/Button'
import SigninInput from '../../components/Signin/Input/Input'
import { signInWithEmailAndPassword } from "firebase/auth"
import { Feather } from '@expo/vector-icons'
import { Formik } from "formik"
import * as Yup from 'yup'
import { auth } from '../../config/firebase'

const INITIAL_FORM_STATE = {
    emailAddress:'',
    password:'',
}

const FORM_VALIDATION = Yup.object().shape({
    emailAddress: Yup.string().email('Invalid Email Address.').required('Email Address is required.'),
    password: Yup.string().required('Password is required.'),
})

const Signin = () => {
    const handleSubmit = (emailAddress, password) => {
        signInWithEmailAndPassword(auth, emailAddress, password)
        .catch(errorMessage => {
            switch (errorMessage.code) {
                case "auth/invalid-email":
                    if (emailAddress !== "") {
                        Alert.alert("Invalid email address.")
                    }
                    break
                case "auth/user-disabled":
                    Alert.alert("Your account has been deactivated.")
                    break
                case "auth/user-not-found":
                    Alert.alert("Email is not registered.")
                    break
                case "auth/wrong-password":
                    if (password !== "") {
                        Alert.alert("Incorrect password.")
                    }
                    break;
                default:
                    break;
            }
        })
    }  

  return (
    <>
        <Formik
            initialValues = { INITIAL_FORM_STATE }
            validateOnMount = { true }
            validationSchema = { FORM_VALIDATION }
        >
            {({ handleChange, values, errors }) => (
                <SafeAreaView style = {[ tw `flex-1`, globalStyles.primaryBG ]}>
                    <KeyboardAvoidingView style = {[ tw `flex-1` ]}>
                        <ScrollView style = {[ tw `flex-1` ]}>
                            <View style = {[ tw `p-8` ]}>
                                <View style = {[ tw `my-10 items-center justify-center` ]}>
                                    <Image 
                                        source = { require("../../assets/images/AppLogo(no-bg).png") }
                                        style = {[ globalStyles.appLogo] }
                                        resizeMode = "contain"
                                    />
                                    <Text style = {[ tw `text-2xl font-bold text-white`]}>
                                        ADMIN APP
                                    </Text>
                                </View>
                                <View>
                                    <View style = {[ tw `my-1`]}>
                                        <SigninInput
                                            label = "EMAIL ADDRESS"
                                            placeholderTextColor = "#7988A2"
                                            placeholder = "name@email.com"
                                            keyboardType = "email-address"
                                            value = { values.emailAddress }
                                            onChangeText = { handleChange("emailAddress" )}
                                        />
                                    </View>
                                    <View style = {[ tw `my-1` ]}>
                                        <SigninInput
                                            label = "PASSWORD"
                                            placeholderTextColor = "#7988A2"
                                            placeholder = "********"
                                            keyboardType = "default"
                                            secureTextEntry = { true }
                                            value = { values.password }
                                            onChangeText = { 
                                                handleChange("password") 
                                            }
                                            inactiveRightIcon = { 
                                                <Feather name = "eye" size = { 24 } color = "#B2C6D5" />
                                            }
                                            activeRightIcon = { 
                                                <Feather name="eye-off" size = { 24 } color = "#B2C6D5" /> 
                                            }
                                        />
                                    </View>
                                    {/* <View style = {[ tw `my-2` ]}>
                                        <Text 
                                            style = {[ tw `text-xs font-bold`, globalStyles.secondaryText ]}
                                            onPress = {() =>{
                                                Alert.alert("Soon.")
                                            }}
                                        >
                                            FORGOT PASSWORD?
                                        </Text>
                                    </View> */}
                                </View>
                                <View style = {[ tw `my-2` ]}>
                                    <Button 
                                        placeholder = "SIGN IN" 
                                        bgColor = "#12528A"
                                        placeholderTextColor = "white"
                                        borderColor = "transparent"
                                        onPress = {() => {
                                            errors.password ? Alert.alert(errors.password) : null
                                            errors.emailAddress ? Alert.alert(errors.emailAddress) : null
                                            !errors.emailAddress && !errors.password ? handleSubmit(values.emailAddress, values.password) : null
                                        }}
                                    />
                                </View>
                            </View>  
                        </ScrollView>
                    </KeyboardAvoidingView> 
                </SafeAreaView>
            )}
        </Formik>
    </>
  )
}

export default Signin
