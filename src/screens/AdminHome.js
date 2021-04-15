import * as React from 'react'
import {View, Text, Image, ImageBackground, Button} from 'react-native'
import {TextInput,ScrollView,TouchableOpacity} from 'react-native-gesture-handler'
import { LinearGradient } from 'expo-linear-gradient'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { globalStyles } from '../allStyles';

const AppButton = ({ onPress, title }) => (
  <TouchableOpacity onPress={onPress} style={globalStyles.appButtonContainer}>
    <Text style={globalStyles.appButtonText}>{title}</Text>
  </TouchableOpacity>
);

import {AuthContext} from '../AuthContext'

const AdminScreen = ({ navigation }) => {
  const {signOut} = React.useContext(AuthContext)
    return (
      <View style={globalStyles.container}>
        <View style={globalStyles.header}>
          <Text style={globalStyles.headerTitle}>hello, admin.</Text>
        </View>

        <AppButton title="Search For Users" size="sm" backgroundColor="#007bff" onPress={() => {navigation.navigate('Search')}} />
  
        <View style={globalStyles.boxContainer}>
          <View style={globalStyles.box}>
            <View style={globalStyles.inner}>
              <TouchableOpacity onPress={() => navigation.navigate('Analytics')}>
                <Image
                  style={{ width: 50, height: 50, }}
                  source={require('../images/calendar.png')}
                />
              </TouchableOpacity>
              <Text style={globalStyles.boxTitle}>Analytics</Text>
            </View>
          </View>
  
          <View style={globalStyles.box}>
            <View style={globalStyles.inner}>
              <TouchableOpacity onPress={() => navigation.navigate('ReviewIssues')}>
                <Image
                  style={{ width: 50, height: 50, }}
                  source={require('../images/messages.png')}
                />
              </TouchableOpacity>
              <Text style={globalStyles.boxTitle}>Review Issues</Text>
            </View>
          </View>
  
          <View style={globalStyles.box}>
            <View style={globalStyles.inner}>
              <TouchableOpacity onPress={() => signOut()}>
                <Image
                  style={{ width: 50, height: 50, }}
                  source={require('../images/settings.png')}
                />
              </TouchableOpacity>
              <Text style={globalStyles.boxTitle}>Sign Out</Text>
            </View>
          </View>
        </View>
        <Image
          style={{width: '50%', height: '50%', marginLeft: 200, marginTop: -120}}
          source={require('../images/graphic1.png')}
        />
      </View>
    )
  }

  export default AdminScreen;