import { Dimensions } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Dashboard from '../../screens/Dashboard/Dashboard'
import Logs from '../../screens/Logs/Logs'
import Locations from '../../screens/Locations/Locations'
import { Foundation, Ionicons, Entypo } from '@expo/vector-icons'

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').width;
const Tab = createBottomTabNavigator()
const AppContainer = () => {
  return (
    <>
        <Tab.Navigator
            initialRouteName = "Dashboard"
            screenOptions={{
                tabBarActiveTintColor:"#12528A",
                tabBarInactiveTintColor: "#A2A2A2",
                tabBarStyle: {
                    position: "absolute",
                    height: 70,
                    elevation: 0,
                    borderTopWidth: 0,
                    borderBottomWidth: 2,
                    borderColor: "#27314B",
                    zIndex: 8,
                    marginTop: -40,
                },
                tabBarActiveBackgroundColor: "#27314B",
                tabBarInactiveBackgroundColor: "#27314B",

            }}
        >
            <Tab.Screen 
                name = "Dashboard" 
                component = { Dashboard }
                options = {{
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <Foundation name = "home" size = { 26 } color = { color } />
                    ),
                    tabBarShowLabel: false
                }}
            />
            <Tab.Screen 
                name = "Logs" 
                component = { Logs }
                options = {{
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <Ionicons name = "grid" size = { 26 } color = { color } />
                    ),
                    tabBarShowLabel: false
                }}
            />
            <Tab.Screen 
                name = "Locations" 
                component = { Locations }
                options = {{
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <Entypo name = "globe" size = { 26 } color = { color } />
                    ),
                    tabBarShowLabel: false
                }}
            />
        </Tab.Navigator>
    </>
  )
}

export default AppContainer