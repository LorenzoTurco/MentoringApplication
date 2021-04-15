import React, {useState, setState, useContext } from "react"

import {createStackNavigator} from "@react-navigation/stack"
import { View, Text, TouchableOpacity } from "react-native"
import { SearchBar, Input, Button} from 'react-native-elements';

//import HomeScreen from "../screens/Home"
import {AuthContext} from "../AuthContext"
import { globalStyles } from "../allStyles";

const AuthStack = createStackNavigator();

export function AuthStackNavigator(){
  console.log("hei")
    return(
        <AuthStack.Navigator>
            <AuthStack.Screen name="home" component={loginScreen}/>
        </AuthStack.Navigator>
    )
}

function loginScreen(){
  const[email, setEmail] = React.useState('')
  const[password,setPassword] = React.useState('')
  const { signIn } = React.useContext(AuthContext)

  
    return(
      <View>
        <Text style={globalStyles.loginText}>Login</Text>
        <Input
          placeholder='Enter Email'
          onChangeText={value =>setEmail(value)}
        />
        <Input placeholder="Enter Password" secureTextEntry={true} onChangeText={value =>{setPassword(value)}}/>

        <TouchableOpacity style={globalStyles.loginButton} onPress={() => signIn(email,password)}>
          <Text style={globalStyles.appButtonText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    )
}

