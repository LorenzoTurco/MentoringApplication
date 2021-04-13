import React, {useState, setState, useContext } from "react"

import {createStackNavigator} from "@react-navigation/stack"
import { View, Text } from "react-native"
import { SearchBar, Input, Button} from 'react-native-elements';

//import HomeScreen from "../screens/Home"
import {AuthContext} from "../AuthContext"

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
        <Text>Login</Text>
        <Input
          placeholder='Email'
          leftIcon={{ type: 'font-awesome', name: 'chevron-left' }}
          onChangeText={value =>setEmail(value)}
        />
        <Input placeholder="Password" secureTextEntry={true} onChangeText={value =>{setPassword(value)}}/>
        <Button onPress={() => signIn(email,password)} ></Button>
      </View>
    )
}

