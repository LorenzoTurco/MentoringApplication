import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
//import Header from "./components/header";
//import Circle from "./components/circle";

export default function AnalyticsScreen() {
  return (

    <View>
    <View style={style.container}>
    <View>
   <View style={style.circle}>
     <Text style={style.value}>107</Text>
     <Text style ={style.text}> Active Mentorships</Text>
   </View>
   <View style={style.circle2}>
     <Text style={style.value2}>3.7</Text>
     <Text style ={style.text2}>Average Mentor Rating</Text>
   </View>
  </View>
    </View>
    </View>
  );
}

const style= StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  circle: {
    borderRadius: 200,
    width: 200,
    height: 200,
    justifyContent: 'center',
    backgroundColor: '#1daded',
    marginTop: 100,
    alignItems: 'center'
  },
  circle2: {
    borderRadius: 200,
    width: 200,
    height: 200,
    justifyContent: 'center',
    backgroundColor: '#1daded',
    marginTop: 40,
    alignItems: 'center'
  },
    text: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold'
    },
    value: {
      textAlign: 'center',
      color: '#fff',
      fontSize: 20,
      fontWeight: 'bold'
  },
  value2: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold'
},
    text2: {
      textAlign: 'center',
      color: '#fff',
      fontSize: 20,
      fontWeight: 'bold'
  }
});