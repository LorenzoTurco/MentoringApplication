import React,{useState, useEffect,useCallback} from "react"

import {createStackNavigator} from "@react-navigation/stack"
import { View, Text, Button,StyleSheet,FlatList,TouchableOpacity} from "react-native"
import { SearchBar, Input, ListItem, Icon, List, Avatar} from 'react-native-elements';
import MenuDrawer from 'react-native-side-drawer'
import SwipeGesture from '../SwipeGestures/swipe-gesture' 
import { CheckBox } from 'react-native-elements'
import SearchResults from '../screens/SearchResults'
//import HomeScreen from "../screens/HomeScreen"
import { GiftedChat } from 'react-native-gifted-chat'
import io from 'socket.io-client'
import AsyncStorage from '@react-native-async-storage/async-storage';

const MainStack = createStackNavigator();

export function MainStackNavigator(){
    return(
        <MainStack.Navigator initialRouteName="home">
            <MainStack.Screen name="home" component={HomeScreen}/>
            <MainStack.Screen name="Search" component={SearchScreen}/>
            <MainStack.Screen name="Inbox" component={inboxScreen}/>
            <MainStack.Screen name="Chat" component={ChatScreen} options={({route}) => ({
              title: route.params.receiverName
            })} />

        </MainStack.Navigator>
    )
}
const Messages = [
  {
    receiverId: '1',
    receiverName: 'Jenny Doe',
    createdAt: '4 mins ago',
    text:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    receiverId: '2',
    receiverName: 'John Doe',
    createdAt: '2 hours ago',
    text:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    receiverId: '3',
    receiverName: 'Ken William',
    createdAt: '1 hours ago',
    text:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
];

function HomeScreen({navigation}){
    return(
        <View>
            <Text>Home Screen, welcome back!</Text>
            <Button title="search for mentor" onPress={()=>{navigation.navigate('Search')}}/>
            <Button title="view Inbox" onPress={()=>{navigation.navigate('Inbox')}}/>
        </View>
    )
}

const DEFAULT_SENDER_ID = 999 // Same value in backend

// const socket = io('http://10.0.2.2:4000')
var socket = null  //connection in InboxScreen

function ChatScreen({route}){
  
  const [messages, setMessages] = useState([]);
  const {receiverId,receiverName,userToken} = route.params
  
  //console.log("id: " + receiverId + " name: " + receiverName + "userToken" + userToken)
  useEffect(() => {
    console.log(receiverId)
    fetchContactMessages(receiverId,userToken,setMessages) 
    // setMessages([
    //   {
    //     _id: 1,
    //     text: 'Hello developer',
    //     createdAt: new Date(),
    //     user: {
    //       _id: receiverId,
    //       name: receiverName,
    //       avatar: 'https://placeimg.com/140/140/any',
    //     },
    //   },
    //   {
    //     _id: 2,
    //     text: 'THIS ME',
    //     createdAt: new Date(),
    //     user: {
    //       _id: 9,
    //     },
    //   },
    // ])
    
  }, [])
  
  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    //console.log("this message was just sent!" + JSON.stringify(messages))
    //emit message.
    socket.emit("chat message",{userToken: userToken, receiverId: receiverId, message : messages });
  }, [])
  
  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      alwaysShowSend
      scrollToBottom
      user={{
        _id: DEFAULT_SENDER_ID,
      }}
    />
  )
}

function fetchInboxMessages(setMessages,userToken){
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'auth-token' : userToken
    },
  }
  fetch('http://10.0.2.2:4000/chat/latestmessages',options)
  .then(res => res.json()
  .then(data =>{
      console.log(data)
      setMessages(data.messages)
  }))
  .catch(function(error) {
    console.log('There has been a problem with your fetch operation fetchInboxMessages: ' + error.message);
      throw error;
    });
}

function fetchContactMessages(receiverId,userToken,setMessages){
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'auth-token' : userToken
    },
    body: JSON.stringify({
      receiverId: receiverId,
    })
  }
  fetch('http://10.0.2.2:4000/chat/contactmessages',options)
  .then(res => res.json()
  .then(data =>{
    setMessages(data.messages)
  }))
  .catch(function(error) {
    console.log('There has been a problem with your fetch operation in fetchContactMessages: ' + error.message);
      throw error;
    });
}



function inboxScreen({navigation}){
  const[messages,setMessages] = useState(Messages)
  const [userToken, setUserToken] = useState("")


  useEffect(() =>{
    socket = io('http://10.0.2.2:4000')
    if(socket){socket.on("update messages", (data)=>{
      console.log(data)})}
      AsyncStorage.getItem('userToken').then(token => {
        setUserToken(token)
        console.log(token)
        fetchInboxMessages(setMessages,token)
      })
      
    return function cleanup(){
      socket.disconnect()
    }
  },[])

  

  return(
  <View>
    <FlatList
      data={messages}
      keyExtractor={item => item.id}
      renderItem={({item}) => <ChatItem item={item} navigation={navigation} userToken={userToken}/>}
    />
  </View>
  )

}

function ChatItem({item,navigation,userToken}){
  
  return(
    <TouchableOpacity onPress={() => navigation.navigate('Chat',{receiverName: item.receiverName, receiverId : item.receiverId, userToken : userToken })}>
     <ListItem>
      <Icon name='av-timer' />
      <ListItem.Content>
        <ListItem.Title>{item.receiverName}</ListItem.Title>
        <ListItem.Subtitle>{item.text}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
    </TouchableOpacity>
  )
}


var tagList = []

function fetchTags(setSelectedTags) {
  return fetch('http://10.0.2.2:4000/search/taglist')
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
      <View onPress={()=> {setOpen(!open)}} style={styles.animatedBox}>
        <Text>Tags</Text>
      {
        tagList.map((tag, i) => (
        <ListItem
          key={i}
          bottomDivider
         onPress={() => updateTags(i)}>
          <ListItem.Content >
            <ListItem.Title style={typeof selectedTags !== 'undefined' && selectedTags[i] ? styles.selectedTag : styles.unselectedTag} >{tag}</ListItem.Title>
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

    fetch('http://10.0.2.2:4000/search/bytags',options)
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
    <View style={styles.container}>
      <SwipeGesture gestureStyle={styles.swipesGestureContainer} 
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
  fetch('http://10.0.2.2:4000/search/name/'+name)
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













// function drawerContent(setOpen, open) {
//   return (
//     <TouchableOpacity onPress={()=> {setOpen(!open)}} style={styles.animatedBox}>
//       <Text>Close</Text>
//     </TouchableOpacity>
//   );
// };






const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    zIndex: 0
  },
  animatedBox: {
    flex: 1,
    backgroundColor: "#38C8EC",
    padding: 10
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F04812'
  },
  swipesGestureContainer:{
    height:'100%',
    width:'100%'
   },
  selectedTag:{
    color: '#800080'
  },
  unselectedTag:{
    color: 'black'
  }
})




  

//function search screen
//allows to search depe