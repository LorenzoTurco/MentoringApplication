import React,{useState, useEffect,useCallback} from "react"

import {createStackNavigator} from "@react-navigation/stack"
import { View, Text, Button,StyleSheet,FlatList,TouchableOpacity} from "react-native"
import { SearchBar, Input, ListItem, Icon, List, Avatar, Image} from 'react-native-elements';
import MenuDrawer from 'react-native-side-drawer'
import SwipeGesture from '../SwipeGestures/swipe-gesture' 
import { CheckBox } from 'react-native-elements'
import SearchResults from '../screens/SearchResults'
//import HomeScreen from "../screens/HomeScreen"
import { GiftedChat } from 'react-native-gifted-chat'
import io from 'socket.io-client'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { globalStyles } from '../allStyles';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


//admin
import AdminScreen from '../screens/AdminHome'
import AnalyticsScreen from '../screens/Analytics'
import ReviewScreen from '../screens/ReviewIssues'

const Stack = createStackNavigator();

export function AdminNavigator({ navigation }) {
    return (
        <Stack.Navigator
          initialRouteName="Admin Home"
          screenOptions={{
            headerStyle: { backgroundColor: '#1daded' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
          }}>
          <Stack.Screen
            name="AdminHome"
            component={AdminScreen}
            options={{ title: 'Admin Home' }}/>
          <Stack.Screen
            name="Analytics"
            component={AnalyticsScreen}
            options={{ title: 'Analytics' }}/>
          <Stack.Screen
            name="ReviewIssues"
            component={ReviewScreen}
            options={{ title: 'Review Issues' }}/>
          <Stack.Screen
            name="Sea"
            component={ReviewScreen}
            options={{ title: 'Review Issues' }}/>
        </Stack.Navigator>
    );
  }