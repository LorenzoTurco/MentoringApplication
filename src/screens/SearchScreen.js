import React,{useState, useEffect,useCallback} from "react"
import { View, Text, Button,StyleSheet,FlatList,TouchableOpacity} from "react-native"
import { SearchBar, Input, ListItem, Icon, List, Avatar} from 'react-native-elements';
import MenuDrawer from 'react-native-side-drawer'
import SwipeGesture from '../SwipeGestures/swipe-gesture' 
import SearchResults from '../screens/SearchResults'
import { globalStyles } from '../allStyles';

var tagList = []

function fetchTags(setSelectedTags) {
  return fetch('http://127.0.0.1:4000/search/taglist')
      .then(res => res.json()
      .then(data =>{
        console.log(data.list.length)
        tagList = data.list;
        const s = Array.from({length: data.list.length}, i => i = false)
        setSelectedTags(s)
      }))
      .catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
    })
}

var searchResults;
function setSearchResults(results){
  searchResults = results
}

function SearchScreen(){
    //const [searchResults, setSearchResults] = useState()
    const [search, setSearch] = useState()
    const [open, setOpen] = useState(false)
    const [selectedTags, setSelectedTags] = useState()

    useEffect(()=>{
      fetchTags(setSelectedTags)
    },[]) 
    
    const handleSearch = (text) =>{
      setSearch(text)
      if(text.length >= 3){
        searchForMentorsByName(text)
      }
    }
  const onSwipe =(action) => {
    switch(action){
      case 'left':{
        if(open){
          setOpen(!open)
        }
        console.log('left Swipe performed');
        break;
      }
       case 'right':{
         if(!open){
           setOpen(!open)
         }
        console.log('right Swipe performed');
        break;
      }
    }
  }
  
  const updateTags = i =>{
    setSelectedTags(() =>{
      const list = selectedTags.map((boolItem, j) => {
            if (j === i) {
              return !boolItem;
            } else {
              return boolItem;
            }
      });
      return list
  })
  }
  
  const drawerContent = () => {
    return (
      <View onPress={()=> {setOpen(!open)}} style={globalStyles.animatedBox}>
        <Text>Tags</Text>
      {
        tagList.map((tag, i) => (
        <ListItem
          key={i}
          bottomDivider
         onPress={() => updateTags(i)}>
          <ListItem.Content >
            <ListItem.Title style={typeof selectedTags !== 'undefined' && selectedTags[i] ? globalStyles.selectedTag : globalStyles.unselectedTag} >{tag}</ListItem.Title>
          </ListItem.Content>
        </ListItem>
        ))
      }
      
      <Button title="Search" onPress={()=>{searchByTags()}}/>
      </View>
    );
  };
  

  const searchByTags = () =>{
    console.log("hi")
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        selectedTags: selectedTags,
        name: search
      })
    }

    fetch('http://127.0.0.1:4000/search/bytags',options)
    .then(res => res.json()
    .then(data =>{
      console.log(data)
      setSearchResults(data.mentors)
      setOpen(!open)
    }))
    .catch(function(error) {
      console.log('There has been a problem with your fetch operation: ' + error.message);
        throw error;
      });
  }

  return (
    <View style={globalStyles.container}>
      <SwipeGesture gestureStyle={globalStyles.swipesGestureContainer} 
          onSwipePerformed={onSwipe}>
        <MenuDrawer 
        open={open} 
        drawerContent={drawerContent()}
        drawerPercentage={45}
        animationTime={250}
        overlay={true}
        opacity={0.4}
        >
        <SearchBarCustom updateSearch={handleSearch} searchVal={search}/>
        <SearchResults searchResults={searchResults}/>

        {/* <FlatList
        data = {searchResults}
        renderItem={({item}) => <SearchItem item={item}/>}
        keyExtractor={(item) => item._id}
        />  */}

      </MenuDrawer>

      </SwipeGesture>
    </View>
  );
    
}


const SearchBarCustom = ({updateSearch,searchVal}) => {
  return (
    <SearchBar      
      platform="default"
      placeholder="Search for a Mentor"
      onChangeText={search => updateSearch(search)}
      value={searchVal}
      />
  );
}

function searchForMentorsByName(name){
  fetch('http://127.0.0.1:4000/search/name/'+name)
    .then(res => res.json()
    .then(data =>{
      setSearchResults(data.mentors)
    }))
    .catch(function(error) {
      console.log('There has been a problem with your fetch operation: ' + error.message);
        throw error;
  });
}

//<Avatar source={<Icon name='av-timer'/>} /> 

function iconGeneator(){
 return fetch("https://randomuser.me/api")
  .then(res => res.json()
  .then(data => {
    return data.pictures.data
  }))
}

export default SearchScreen;