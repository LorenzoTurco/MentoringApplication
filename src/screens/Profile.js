import * as React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Image
} from 'react-native';

import {AuthContext} from '../AuthContext'



function ProfileScreen({ route, navigation }){
  const {signOut} = React.useContext(AuthContext)

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{flex: 1, padding: 16}}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center',}}>
            <Image source={require('../images/mask.png')}/>
            <Text style={{ fontSize: 25, textAlign: 'center', marginBottom: 16, paddingTop: 20 }}>
                Welcome to your profile
            </Text>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ViewProfile')}>
                <Text>View Profile</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EditProfile')}>
                <Text>Edit Profile</Text>
            </TouchableOpacity>
          
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Settings')}>
                <Text>Access Settings</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.button} onPress={() => signOut()}>
                <Text>Logout</Text>
            </TouchableOpacity>

            {/* <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Contact')}>
                <Text>Contact Support</Text>
            </TouchableOpacity> */}
        </View>
        
        <Text style={{fontSize: 18, textAlign: 'center', color: 'grey'}}>
            FDM Mentor Matching Experience
        </Text>

        <Text style={{fontSize: 16, textAlign: 'center', color: 'grey'}}>
            www.fdmgroup.com
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 300,
    marginTop: 16,
  },
});
export default ProfileScreen;