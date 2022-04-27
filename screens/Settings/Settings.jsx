import { View, Text, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { globalStyles } from '../../globals/globals'
import tw from "twrnc"
import { Ionicons, FontAwesome5 } from '@expo/vector-icons'
import Button from '../../components/Button/Button'
import { auth } from '../../config/firebase'
import { db } from '../../config/firebase'
import { collection, onSnapshot } from "firebase/firestore"
import { AuthContext } from '../../context/Auth'
import { signOut } from "firebase/auth"

const Settings = () => {
  const { user }  = useContext(AuthContext)
  const navigation = useNavigation()
  const [ info, setInfo ] = useState({})
  const [ loading, setLoading ] = useState(true)
  const adminsCollectionRef = collection(db, "admins")

  const handleSignOut = () => {
    signOut(auth)
  }

  useEffect(() => {
    const unsubscribe = onSnapshot(adminsCollectionRef, snapshot => {
      const adminInfos = snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      }))
      const getInfo = adminInfos.find(admin => admin.id === user.uid)
      setInfo(getInfo)
      setLoading(false)
    })
    
    return () => {
      unsubscribe()
    }
  }, [ loading ])


  return (
    <>
      <SafeAreaView style = {[ tw `flex-1`, globalStyles.primaryBG ]}>
        <View style = {[ tw `flex-1 p-8` ]}>
          <View style = {[ tw `flex flex-row my-2 items-center` ]}>
            <Ionicons 
              onPress = {() => {
                navigation.goBack()
              }} 
              name="chevron-back" 
              size = { 48 } 
              color = "white" 
            />
            <Text style = {[ tw `text-3xl font-bold`, globalStyles.primaryText ]}>
              Settings
            </Text>
          </View>
          { !loading ? 
            <ScrollView style = {[ tw `flex-1 mb-5 h-full`, globalStyles.primaryBG ]}>
              <View style = {[ tw `my-2 mb-1 justify-center items-center` ]}>
                <View style = {[ tw `my-2 justify-center items-center rounded-full`, globalStyles.avatarFull, globalStyles.tertiaryBG ]}>
                  <FontAwesome5 name = "user-alt" size = { 72 } color = "#C7D0D7" />
                </View>
                <View style = {[ tw `my-2` ]}>
                  <View style = {[ tw `flex flex-row` ]}>
                    <Text style = {[ tw `text-2xl text-center font-bold`, globalStyles.primaryText ]}>
                      { info.data.first_name }
                    </Text>
                    <View style = {[ tw `mx-1` ]}/>
                    <Text style = {[ tw `text-2xl text-center font-bold`, globalStyles.primaryText ]}>
                      { info.data.last_name }
                    </Text>
                  </View>
                  <Text style = {[ tw `text-lg text-center font-normal`, globalStyles.primaryText ]}>
                    MaskUp Admin
                  </Text>
                </View>
                <View style = {[ tw `flex-1 my-2 rounded-xl p-8 w-full justify-center items-center`, globalStyles.secondaryBG ]}>
                  <View style = {[ tw `my-1 mb-4` ]}>
                    <Text style = {[ tw `text-2xl text-center font-bold`, globalStyles.primaryText ]}>
                      Personal Data
                    </Text>
                  </View>
                  <View style = {[ tw `flex-1 flex-row justify-center items-center` ]}>
                    <View style = {[ tw `mx-1` ]}/>
                    <View style = {[ tw `flex-1 flex-row justify-around` ]}>
                      <View style = {[ tw `flex flex-col` ]}>
                        <Text style = {[ tw `text-lg text-left font-bold`, globalStyles.primaryText ]}>
                          First Name:
                        </Text>
                        <Text style = {[ tw `text-lg text-left font-bold`, globalStyles.primaryText ]}>
                          Last Name:
                        </Text>
                        <Text style = {[ tw `text-lg text-left font-bold`, globalStyles.primaryText ]}> 
                          Email:
                        </Text>
                        <Text style = {[ tw `text-lg text-left font-bold`, globalStyles.primaryText ]}>
                          Date Joined:
                        </Text>
                      </View>
                      <View>
                        <Text style = {[ tw `text-lg text-right font-normal`, globalStyles.primaryText ]}>
                          {info.data.first_name}
                        </Text>
                        <Text style = {[ tw `text-lg text-right font-normal`, globalStyles.primaryText ]}>
                          {info.data.last_name}
                        </Text>
                        <Text style = {[ tw `text-lg text-right font-normal`, globalStyles.primaryText ]}>
                          {info.data.email}
                        </Text>
                        <Text style = {[ tw `text-lg text-right font-normal`, globalStyles.primaryText ]}>
                          {info.data.date_joined}
                        </Text>
                      </View>
                    </View>
                    <View style = {[ tw `mx-1` ]}/>
                  </View>
                </View>
              </View>
            </ScrollView>
          : 
            <ActivityIndicator size = "large" color = "#FFFFFF" style = {[ tw `my-4` ]} />
          }
          <View style = {[ tw `h-1/8 ` ]}>
            <Button 
              placeholder = "SIGN OUT" 
              bgColor = { "#12528A" }
              placeholderTextColor = "white" 
              borderColor = "transparent"
              onPress = {() => {
                handleSignOut()
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    </>
  )
}

export default Settings

