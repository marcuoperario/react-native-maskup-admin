import React, { useContext, useEffect } from "react"
import { AuthContext } from "../context/Auth"
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Signin from "../screens/Signin/Signin"
import AppContainer from "../components/AppContainer/AppContainer"
import Settings from "../screens/Settings/Settings"


const Routes = () => {
    const { user, getUser, loading } = useContext(AuthContext)
    const Stack = createNativeStackNavigator()

    useEffect(() => {
        getUser()
        return(() => {
            getUser()
        })
    }, [ loading ])

    return (
        <>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions = {{
                        gestureEnabled: false
                    }}
                >
                    { user ? (
                        <Stack.Group>
                            <Stack.Screen 
                                name = "AppContainer" 
                                component = { AppContainer }
                                options ={{
                                    headerShown: false
                                }} 
                            />
                            <Stack.Screen 
                                name = "Settings" 
                                component = { Settings }
                                options ={{
                                    headerShown: false
                            
                                }} 
                            />
                        </Stack.Group>
                    ) :
                        <Stack.Group>
                            <Stack.Screen 
                                name = "Signin" 
                                component = { Signin }
                                options ={{
                                    headerShown: false
                                }} 
                            />
                        </Stack.Group> 
                    }
                </Stack.Navigator>
            </NavigationContainer>
        </>
    )
}

export default Routes