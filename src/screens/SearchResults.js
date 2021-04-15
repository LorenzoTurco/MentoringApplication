import React, { Component } from 'react';
import { View, Text, Button,StyleSheet,FlatList,TouchableOpacity} from "react-native"
import { SearchBar, Input, ListItem, Icon, List, Avatar} from 'react-native-elements';


const SearchResults = (props) => {
    return(
    <FlatList
    data = {props.searchResults}
    renderItem={({item}) => <SearchItem item={item} navigation={props.navigation}/>}
    keyExtractor={(item) => item._id}
    />
    )  
}

const SearchItem = ({item,navigation}) => {
    return(
      <TouchableOpacity onPress={() => navigation.navigate('MentorProfile',{name: item.name})}>
       <ListItem>
        <Icon name='av-timer' />
        <ListItem.Content>
          <ListItem.Title>{item.name}</ListItem.Title>
          <ListItem.Subtitle>{item.header}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      </TouchableOpacity>
    )
}



export default SearchResults;