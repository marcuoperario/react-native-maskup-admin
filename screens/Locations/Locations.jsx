import { View, Text, SafeAreaView, Alert, FlatList, ActivityIndicator, Pressable, TextInput} from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import tw from "twrnc"
import { globalStyles } from '../../globals/globals'
import AppHeader from '../../components/AppHeader/AppHeader'
import {  db } from '../../config/firebase'
import { collection, addDoc, deleteDoc, onSnapshot, doc, orderBy, query } from "firebase/firestore"
import { Formik } from "formik"
import * as Yup from 'yup'
import { Ionicons } from "@expo/vector-icons"

const INITIAL_FORM_STATE = {
  name: "",
  description: "",
  status: "",
}

const FORM_VALIDATION = Yup.object().shape({
  name: Yup.string().required("Name is required."),
  description: Yup.string().required("Description is required."),
  status: Yup.string(),
})

const Locations = () => {
  const [ locations, setLocations] = useState()
  const [ loading, setLoading ] = useState(true)
  const locationsCollectionRef = collection(db, "locations")
  const [ isFormVisible, setIsFormVisible ] = useState(false)

  const addLocation = async (name, description, status) => {
    setLocations()
    await addDoc(locationsCollectionRef, {
      name: name,
      description: description,
      status: status
    })
    .then(() => {
      console.log("Location Added.")
    })
    .catch((error) => {
      console.log(error.message)
    })
  }
  
  const deleteLocation = async (id) => {
    setLocations()
    const locationRef = doc(locationsCollectionRef, id)
    await deleteDoc(locationRef)
    .then(() => {
      console.log("Location Deleted.")
    })
    .catch((error) => {
      console.log(error.message)
    })
  }

  const showConfirmDialog = (id) => {
    return Alert.alert(
        "Are your sure?",
        "Are you sure you want to delete this location?",
    [
        {
        text: "Yes",
        onPress: () => {
            deleteLocation(id)
        },
        },
        {
        text: "No",
        },
    ]
    )
}

  const renderItem = ({ item }) => {
    return (
        <View style = {[ tw `my-2 flex-1 flex-row items-center`]}>
          <View style = {[ tw `pl-8 pt-4 pr-8 pb-4 flex-1 flex-row rounded-xl`, globalStyles.secondaryBG ]}>
            <View style = {[ tw `mx-1 p-4 w-18 rounded-full items-center justify-center flex-none`, globalStyles.locationIconBG]} >
              <Ionicons name = "ios-location-sharp" size = {32} color = "white" />
            </View>
            <View style = {[ tw `mx-2`]}>
              <Text style = {[ tw `text-xl font-bold`, globalStyles.primaryText ]}>
                { item.data.name }
              </Text>
              <Text style = {[ tw `text-base`, globalStyles.primaryText]}>
                { item.data.description }
              </Text>
              <Text style = {[ tw `text-base`, globalStyles.primaryText]}>
                Status: { item.data.status}
              </Text>
            </View>
          </View>
          <Pressable
            onPress = {() => {
              showConfirmDialog(item.id)
            }}
            style = {[ tw `items-center justify-center mx-3`]}
          >
            <Ionicons name = "ios-trash-bin" size={24} color="white"/>  
          </Pressable>
        </View>
      )
    }

  const noData = () => {
    return (
      <View style = {[ tw `my-2` ]}>
        <Text style = {[ tw `text-lg text-center`, globalStyles.primaryText ]}>
          No data available.
        </Text>
      </View>
    )
  }
  
  useEffect(() => {
      const locationQuery = query(locationsCollectionRef, orderBy('name', "asc"))
      const unsubscribe = onSnapshot(locationQuery, snapshot => {
        setLocations()
        setLocations(snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data()
        })))
        setLoading(false)
      })

      return () => {
        unsubscribe()
      }
  }, [ loading ])

  return (
    <>
      <Formik
        initialValues = { INITIAL_FORM_STATE }
        validateOnMount = { true }
        validationSchema = { FORM_VALIDATION }
        onSubmit = {( values, { resetForm }) => {
          addLocation(values.name, values.description, "N/A")
          resetForm()
          setIsFormVisible(!isFormVisible)
        }}
      >
        {({ handleChange, handleSubmit, values, errors }) => ( 
          <SafeAreaView style = {[ tw `flex-1`, globalStyles.primaryBG]}>
            <View style = {[ tw `flex-1 p-8` ]}>
              <AppHeader
                operationIconColor ="#01C16F" 
                operationBG = "#01C16F"
                operationIcon = {
                  <Ionicons name = "add-circle-sharp" size = { 24 } color = "white" />
                }
                operationOnPress = {() => {
                  setIsFormVisible(true)
                }}
                pageName = "Locations"
              />
              <View style = {[ tw `flex-1 mb-10` ]}>
                { isFormVisible ? 
                  <View style = {[ tw `flex flex-row flex-wrap my-2` ]}>
                    <TextInput 
                      placeholder = "Name"
                      placeholderTextColor = "#7988A2"
                      keyboardType = "default"
                      style = {[ tw `mx-1 p-4 rounded-xl flex-1 flex-wrap`, globalStyles.secondaryBG, globalStyles.primaryText ]}
                      value = { values.name }
                      onChangeText = { handleChange("name") }
                    />
                    <TextInput 
                      placeholder = "Description"
                      placeholderTextColor = "#7988A2"
                      keyboardType = "default"
                      style = {[ tw `mx-1 p-4 rounded-xl flex-1 flex-wrap`, globalStyles.secondaryBG, globalStyles.primaryText ]}
                      value = { values.description }
                      onChangeText = { handleChange("description")}
                    />
                    <Pressable
                      onPress = {() => {
                        errors.description ? Alert.alert(errors.description) : null 
                        errors.name ? Alert.alert(errors.name) : null
                        !errors.name && !errors.description ? handleSubmit(values.name, values.description) : null
                      }}
                      style = {[ tw `items-center justify-center mx-1 flex flex-wrap` ]}
                    >
                      <Ionicons name="checkmark-sharp" size = {24} color="white" />
                    </Pressable>
                    <Pressable
                      onPress = {() => {
                        setIsFormVisible(!isFormVisible)
                        values.name = ""
                        values.description = ""
                      }}
                      style = {[ tw `items-center justify-center mx-1 flex flex-wrap` ]}
                    >
                      <Ionicons name="close-sharp" size={24} color="white" />
                    </Pressable>
                  </View>
                  : 
                  null
                }
                { !loading ?
                  <View style = {[ tw `flex-1` ]}>
                    <FlatList 
                      data = { locations } 
                      renderItem = { renderItem }
                      keyExtractor = { item => item.id } 
                      scrollEnabled = { true }
                      ListEmptyComponent = { noData }
                      style = {[ tw `flex-1 ` ]}
                  />
                  </View>
                : 
                  <ActivityIndicator size = "large" color = "#FFFFFF" style = {[ tw `my-4` ]} /> 
                }
              </View>
            </View>
          </SafeAreaView>
        )}
      </Formik>
    </>
  )
}

export default Locations

