import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { FontAwesome5 } from '@expo/vector-icons'; 
import { globalStyles } from '../../globals/globals';
import tw from "twrnc"
import { useNavigation } from "@react-navigation/native"
import { Ionicons } from '@expo/vector-icons'; 

const AppHeader = ({ pageName, operationIcon, operationOnPress, operationBG }) => {
const navigation = useNavigation()
  return (
    <View style = {[ tw `flex flex-row my-4 justify-between items-center` ]}>
        <Text style = {[ tw `text-3xl font-bold`, globalStyles.primaryText ]}>
            { pageName }
        </Text>
        <View style = {[ tw `flex flex-row` ]}>
            { operationIcon && operationOnPress ? 
                <Pressable
                    onPress = { operationOnPress }
                    style = {[ tw `rounded-full p-2 items-center justify-center mx-1`, {
                        backgroundColor: `${operationBG}`
                    }]}
                >
                    { operationIcon }
                </Pressable>
            : null
            }
            <Pressable
                onPress = {() => { 
                    navigation.navigate("Settings")
                }}
                style = {[ tw `rounded-full p-2 mx-1`, globalStyles.tertiaryBG ]}
            >   
                <Ionicons name = "settings" size = { 24 } color = "white" />
            </Pressable>
        </View>
    </View>
  )
}

export default AppHeader