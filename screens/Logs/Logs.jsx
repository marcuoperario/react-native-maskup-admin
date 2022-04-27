import { View, Text, ScrollView, SafeAreaView, ActivityIndicator, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import tw from "twrnc"
import { globalStyles } from '../../globals/globals'
import AppHeader from '../../components/AppHeader/AppHeader'
import { collection, onSnapshot, query, orderBy, addDoc } from 'firebase/firestore'
import { db } from '../../config/firebase'
import { Ionicons, FontAwesome5 } from '@expo/vector-icons'

const Logs = () => {
  const [ logs, setLogs ] = useState()
  const [ loading, setLoading ] = useState(true)
  const logsCollectionRef = collection(db, "detection_logs")

  const renderItem = ({ item }) => {
    const time_and_date = new Date(item.data.time_and_date.seconds * 1000 ).toLocaleString()
    return (
      // <View style = {[ tw `flex-1 my-2 rounded-xl `, globalStyles.secondaryBG ]}>
      //   <View style = {[ tw `pl-8 pt-4 pr-8 pb-4`]}>
      //     <View>
      //       <Text style = {[ tw `text-xl font-bold`, globalStyles.primaryText ]}>
      //         {/* { item.data.location_info.name } */}
      //       </Text>
      //       <Text style = {[ tw `text-lg`, globalStyles.primaryText ]}>
      //         {/* { item.data.location_info.description } */}
      //       </Text>
      //       <Text style = {[ tw `text-base`, globalStyles.primaryText ]}>
      //         { time_and_date }
      //       </Text>
      //     </View>
      //   </View>
      // </View>
  //     <Pressable
  //     style = {[ tw `my-2 flex-1 flex-row items-center`]}
  //     onPress = {() => {
  //         showConfirmDialog(item.id, item.data.name, item.data.description)
  //     }}
  // >
  //     <View style = {[ tw `pl-8 pt-4 pr-8 pb-4 flex-1 flex-row rounded-xl items-center justify-between`, globalStyles.secondaryBG ]}>
  //         <View style = {[ tw `flex-1 flex-row`]}>
  //             <View style = {[ tw `mx-1 p-5 rounded-full items-center justify-center flex-none`, globalStyles.locationIconBG]} >
  //                 <Ionicons name = "ios-location-sharp" size = {32} color = "white" />
  //             </View>
  //             <View style = {[ tw `mx-2`]}>
  //                 <Text style = {[ tw `text-xl font-bold`, globalStyles.primaryText ]}>
  //                     { item.data.name }
  //                 </Text>
  //                 <Text style = {[ tw `text-base`, globalStyles.primaryText]}>
  //                     { item.data.description }
  //                 </Text>
  //             </View>
  //         </View>
  //         <View>
  //             <Ionicons 
  //                 name="chevron-forward" 
  //                 size = { 36 } 
  //                 color = "white" 
  //             />
  //         </View>
  //     </View>
  // </Pressable>
      <View style = {[ tw `my-2 flex-1`]}>
        <View style = {[ tw `pl-8 pt-4 pr-8 pb-4 flex-1 flex-row rounded-xl`, globalStyles.secondaryBG ]}>
          <View style = {[ tw `mx-1 w-18 rounded-full items-center justify-center flex-none`, globalStyles.logsIconBG ]} >
            <FontAwesome5 name="exclamation" size={32} color="white" />
          </View>
          <View style = {[ tw `mx-2`]}>
            <Text style = {[ tw `text-xl font-bold`, globalStyles.primaryText ]}>
              { item.data.location_info.name }
            </Text>
            <Text style = {[ tw `text-base`, globalStyles.primaryText]}>
              { item.data.location_info.description }
            </Text>
            <Text style = {[ tw `text-base`, globalStyles.primaryText]}>
              { time_and_date }
            </Text>
          </View>
        </View>
      </View>
    )
  }
  

  
  const noData = () => {
    return (
        <Text style = {[ tw `text-lg text-center`, globalStyles.primaryText ]}>
          No data available.
        </Text>
    )
  }

  useEffect(() => {
      const q = query(logsCollectionRef, orderBy('time_and_date', "desc"))
      const unsubscribe = onSnapshot(q, snapshot => {
        setLogs()
        setLogs(snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data(),
        })))
        setLoading(false)
      })
      
      return () => {
        unsubscribe()
      }
  }, [ loading ])
  
  return (
    <>
      <SafeAreaView style = {[ tw `flex-1`, globalStyles.primaryBG]}>
        <View style = {[ tw `flex-1 p-8` ]}>
          <AppHeader pageName = "Logs"/>
          { !loading ?
            <View style = {[ tw `flex-1 mb-10` ]}>
              <FlatList 
                data = { logs } 
                renderItem = { renderItem }
                keyExtractor = { item => item.id} 
                scrollEnabled = { true }
                ListEmptyComponent = { noData }
                style = {[ tw `flex-1 ` ]}
              /> 
            </View>
          :   
            <ActivityIndicator size = "large" color = "#FFFFFF" style = {[ tw `my-4` ]} /> 
          }
        </View>
      </SafeAreaView>
    </>
  )
}

export default Logs