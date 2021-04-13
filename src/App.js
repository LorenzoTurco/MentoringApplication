/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { version } from '@babel/core';
import React, {useState, setState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import { SearchBar, Input} from 'react-native-elements';
import 'react-native-gesture-handler';
import {NavigationContainer} from "@react-navigation/native"
import {createStackNavigator} from "@react-navigation/stack"
import AccountManager from "./managers/AccountManager"
import AsyncStorage from '@react-native-async-storage/async-storage';

import {AuthContext} from "./AuthContext"
import { MainStackNavigator } from './navigators/MainStackNavigator';
import {AuthStackNavigator} from './navigators/AuthStackNavigator'
import io from 'socket.io-client'

const Stack = createStackNavigator()

const App = () => {
  const[isLoading, setIsLoading] = React.useState(true)
  const[hasUserToken, setUserToken] = React.useState(false)
  const[isAuthenticated, setAuthenticated] = React.useState(false)

  
  const intitialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null
  }

  const loginReducer = (prevState,action) => {
    switch(action.type){
      case 'GET_TOKEN':
        return{
          ...prevState,
          isLoading: false,
          userToken: action.token,
        }
      case 'SIGNIN':
        return{
          ...prevState,
          isLoading: false,
          userEmail: action.id,
          userToken: action.token
        }
      case 'SIGNOUT':
        return{
          ...prevState,
          isLoading: false,
          userEmail: null,
          userToken: null
        }
    }
  }
  const[loginState, dispatch] = React.useReducer(loginReducer,intitialLoginState)

  const authContext = React.useMemo(() =>({
    signIn: (userEmail, password) => {
      //validate user by check db, if exists then save return token
      console.log(userEmail + password)
      const options = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: userEmail,
          password: password,
        })
      }

      fetch('http://10.0.2.2:4000/user/signin',options)
      .then(res => res.text()
      .then(userToken =>{
        if(res.status == 200){
          dispatch({type: 'SIGNIN', id: userEmail, token: userToken})
          AsyncStorage.setItem('userToken', userToken);
        }else{
          //show error message
          console.log(userToken)
        }
      }))
      .catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
          throw error;
        });
    },

    signOut: (()=>{
      AsyncStorage.removeItem('userToken');
      dispatch({type: 'SIGNOUT'})
    })

  }))
  useEffect(() => {
    setTimeout(async() => {
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch(e) {
        console.log(e);
      }
      dispatch({ type: 'GET_TOKEN', token: null });
    }, 2000);
  }, []);

  if(loginState.isLoading){
    return(
      <View>
        <Text>LOADINGG</Text>
      </View>
    )
  }
  
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {loginState.userToken === null ? (
          <AuthStackNavigator/>
        ): 
          <MainStackNavigator/>
        }
      </NavigationContainer>
    </AuthContext.Provider>
  )
    
}


/***
 *  const [text, setText] = useState('');
 * return(
      <View style ={styles.container}>
        <SearchBarCustom/>
        <FlatList
          data = {UserData}
          renderItem={({item}) => <SearchItem item={item}/>}
          keyExtractor={(item, index) => item.id.toString()}
        />
      </View>
    )
 * 
 */

const SearchItem = ({item}) => {
  return(
    <TouchableOpacity>
      <View style={styles.searchItemView}>
        <Text>{item.name}</Text>
      </View>
    </TouchableOpacity>
  )
}

UserData = [
  {id: 1, name: "John Doe", header: "CEO" },
  {id: 2, name: "John Doe", header: "CEO" },
  {id: 3, name: "John Doe", header: "CEO" },
  {id: 4, name: "John Doe", header: "CEO" }
]


const SearchBarCustom = () => {
  const [search, updateSearch] = useState('');
  console.log(search)
  return (
    <SearchBar      
      platform="default"
      placeholder="Search for a Mentor"
      onChangeText={search => updateSearch(search)}
      value={search}
      />
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width : '100%'
  }
});







export default App;
