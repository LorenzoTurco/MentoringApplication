import React,{useState} from "react"

import {createStackNavigator} from "@react-navigation/stack"
import { View, Text, Button,StyleSheet,FlatList,TouchableOpacity} from "react-native"
import { SearchBar, Input} from 'react-native-elements';


const MainStack = createStackNavigator();

export function MainStackNavigator(){
    return(
        <MainStack.Navigator initialRouteName="home">
            <MainStack.Screen name="home" component={HomeScreen}/>
            <MainStack.Screen name="search" component={SearchScreen}/>
        </MainStack.Navigator>
    )
}


function HomeScreen({navigation}){
    return(
        <View>
            <Text>Home Screen, welcome back!</Text>
            <Button title="search for mentor" onPress={()=>{navigation.navigate('search')}}/>
        </View>
    )
}

function SearchScreen(){
    const [text, setText] = useState('');
     return(
         <View style ={styles.container}>
           <SearchBarCustom/>
           <FlatList
             data = {UserData}
             renderItem={({item}) => <SearchItem item={item}/>}
             keyExtractor={(item, index) => item.id.toString()}
           />
         </View>
       )
}

const SearchBarCustom = () => {
    const [search, updateSearch] = useState('');
    
    //calls method for searching by name
    if(search.length >= 3){
        searchForMentorsByName(search)
    }

    return (
      <SearchBar      
        platform="default"
        placeholder="Search for a Mentor"
        onChangeText={search => updateSearch(search)}
        value={search}
        />
    );
  }

function searchForMentorsByName(name){
    // const options = {
    //     method: 'GET',
    //     headers: {
    //       Accept: 'application/json',
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //       name: name,
    //     })
    // }
    
    fetch('http://10.0.2.2:4000/search/name/'+name)
      .then(res => res.json()
      .then(data =>{
        console.log(data.mentors)
      }))
      .catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
          throw error;
        });
}


  const SearchItem = ({item}) => {
    return(
      <TouchableOpacity>
        <View style={styles.searchItemView}>
          <Text>{item.name}</Text>
        </View>
      </TouchableOpacity>
    )
  }
const styles = StyleSheet.create({
container: {
    flex: 1,
    width : '100%'
}
});
  

//function search screen
//allows to search depe