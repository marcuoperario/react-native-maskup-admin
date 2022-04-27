import { SafeAreaView, View, Text, ScrollView, Pressable, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { db } from '../../config/firebase'
import tw from "twrnc"
import { globalStyles } from '../../globals/globals'
import AppHeader from '../../components/AppHeader/AppHeader'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { Ionicons, Feather } from '@expo/vector-icons'

const Dashboard = () => {
  const [ logs, setLogs ] = useState([])
  const [ loading, setLoading ] = useState(true)
  const logsCollectionRef = collection(db, "detection_logs")
  const [ total, setTotal ] = useState(0)

  useEffect(() => {
    const q = query(logsCollectionRef, orderBy('time_and_date', "desc"))
    const unsubscribe = onSnapshot(q, snapshot => {
      setLogs()
      setTotal(snapshot.size)
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
      <SafeAreaView style = {[ tw `flex-1`, globalStyles.primaryBG ]}>
        <View style = {[ tw `flex-1 p-8` ]}>
          <AppHeader pageName = "Dashboard"/>
          <ScrollView style = {[ tw `flex-1 mb-10`]}>
            <View style = {[ tw `flex flex-row justify-around items-center`]}>
              <View style = {[ tw `flex-1 mx-1 rounded-xl my-2 p-8 justify-center items-center`, globalStyles.secondaryBG ]}>
                <View style = {[ tw `p-5 w-18 rounded-full`, { backgroundColor: "#5F615E"}]}>
                  <Ionicons name="ios-camera-sharp" size = { 32 } color = "#F6B451" />
                </View>
                <Text style = {[ tw `my-1 text-xl font-semibold text-center`, globalStyles.secondaryText]}>
                  Total Detections
                </Text>
                <Text style = {[ tw `my-1 text-3xl font-bold text-center`, globalStyles.primaryText]}>
                  { total }
                </Text>
              </View>
              <View style = {[ tw `flex-1 mx-1 rounded-xl my-2 p-8 justify-center items-center`, globalStyles.secondaryBG ]}>
                <View style = {[ tw `p-5 w-18 rounded-full`, { backgroundColor: "#5F4968"}]}>
                 <Ionicons name="trending-up" size = { 32 } color = "#F65178" />
                </View>
                <Text style = {[ tw `my-1 text-xl font-semibold text-center`, globalStyles.secondaryText]}>
                  Highest Detection
                </Text>
                <Text style = {[ tw `my-1 text-3xl font-bold text-center`, globalStyles.primaryText]}>
                  N/A
                </Text>
              </View>
            </View>
            <View style = {[ tw `flex flex-row justify-around items-center`]}>
              <View style = {[ tw `flex-1 mx-1 rounded-xl my-2 p-8 justify-center items-center`, globalStyles.secondaryBG ]}>
                <View style = {[ tw `p-5 w-18 rounded-full`, { backgroundColor: "#377173"}]}>
                  <Ionicons name="trending-down" size = { 32 } color = "#51F6A9" />
                </View>
                <Text style = {[ tw `my-1 text-xl font-semibold text-center`, globalStyles.secondaryText]}>
                  Lowest Detection
                </Text>
                <Text style = {[ tw `my-1 text-3xl font-bold text-center`, globalStyles.primaryText]}>
                  N/A
                </Text>
              </View>
              <View style = {[ tw `flex-1 mx-1 rounded-xl my-2 p-8 justify-center items-center`, globalStyles.secondaryBG ]}>
                <View style = {[ tw `p-5 w-18 rounded-full`, { backgroundColor: "#375C86"}]}>
                  <Feather name="percent" size={32} color ="#519EF6" />
                </View>
                <Text style = {[ tw `my-1 text-xl font-semibold text-center`, globalStyles.secondaryText]}>
                  Average Detection
                </Text>
                <Text style = {[ tw `my-1 text-3xl font-bold text-center`, globalStyles.primaryText]}>
                  N/A
                </Text>
              </View>
            </View>
            <View style = {[ tw `flex-1 my-2 p-8 rounded-xl`, globalStyles.secondaryBG ]}>
              <Text style = {[ tw `text-xl font-bold`, globalStyles.primaryText ]}>
                History
              </Text>
              <View style = {[ tw `flex-1 my-2` ]}>

              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  )
}

export default Dashboard