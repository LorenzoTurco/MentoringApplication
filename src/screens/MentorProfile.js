import React, {useState} from "react";
import { StatusBar } from 'expo-status-bar';
import {Alert, StyleSheet, Text, View, SafeAreaView, Image, ScrollView, TouchableOpacity, ImageBackground, Button} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';


import { FlatList } from 'react-native-gesture-handler';
import { NavigationHelpersContext } from "@react-navigation/core";
//import userData from "./userData";




Feather.loadFont()
Ionicons.loadFont()
export default function MentorProfile({navigation}){

    //flag is used to render experience or about me information by using boolean
    let [flag, setFlag] = useState(true);
   // const {item} = route.params;
   const [experience, setExperience] = useState(userData[0].exp.map(e => (
    <View style = {styles.experienceWrapper} key = {e.id}>
        <Text style = {styles.experienceTitle}>{e.title}</Text>
        <Text style = {styles.experienceYear}>{e.monthFrom} {e.fromYr}-{e.monthTo} {e.toYr}</Text>
        <Text style = {styles.experienceDescription}>{e.desc}</Text>
    </View>)))
    const [aboutMe, setAboutMe] = useState(userData[0].aboutMe);

    const requestAlert = () => 
        Alert.alert(
            "You have sent a Mentorship request",
            "",
            [{text: "OK", onPress: () => console.log ("BUTTON WORKING")}]
        );
    
    return(
    <View style={styles.container}>

        <View style = {styles.background}>
  
        <View style = {styles.header}>
            <View style = {styles.nameWrapper}><Text style = {styles.name}>{userData[0].name}</Text></View>
            <TouchableOpacity onPress={() => navigation.navigate('Chat',{receiverName: userData[0].name})}>
                <Ionicons name = "chatbubble-ellipses-sharp" size = {32} color = "white"/>
            </TouchableOpacity>
        </View>

        <View style = {styles.imageShadow}>
        <ImageBackground style={styles.avatar} source={userData[0].avatar}></ImageBackground>
        </View>
            {/* THIS IS WHERE THE REQUEST PROCESS OCCURS */}
            <TouchableOpacity onPress = {requestAlert}>
                <View style={styles.requestWrapper}><Text style = {styles.requestText}>Request Mentorship</Text></View>
            </TouchableOpacity>
        </View>

        <View style={styles.nav}>
            <TouchableOpacity onPress = {() => setFlag(true)} style ={[{borderBottomWidth: flag ? 2 : 0}, {borderColor: "grey"},]}>
                <Text style = {styles.navText}>Experience</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress = {() => setFlag(false)} style ={[{borderBottomWidth: flag ? 0 : 2}, {borderColor: "grey"},]}>
                <Text style = {styles.navText}>About Me</Text>
            </TouchableOpacity>
        </View>
      
        <View style = {styles.horizontalBar}></View>

        <ScrollView contentInsetAdjustmentBehavior= "automatic" showsVerticalScrollIndicator = {false}>
            {flag ? experience: <Text style = {styles.info}>{aboutMe}</Text>}
        </ScrollView>

    </View> )
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        // backgroundColor: colors.textGrey,
    },

    horizontalBar: {
        borderTopWidth: 2,
        borderColor: "grey",
        marginTop: 50,
    },

    // nameWrapper: {
    //     alignSelf: "center",
    //     marginTop: 25,
    // },

    experienceButton: {
        borderBottomWidth: 2,
        borderColor: "grey",
    },

    name: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        paddingLeft: 140
    },

    header: {
        // alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 32,
        paddingHorizontal: 20,
    },

    leftWrapper: {
        borderWidth: 2.5,
        borderColor: "white",
        borderRadius: 2.5,
    },

    background: {
        backgroundColor: "#1daded",
        width: "100%",
        height: "35%",

        shadowOpacity: 20,
        shadowRadius: 400,
        // shadowColor: "black",
        shadowColor:"grey",
        shadowOffset: {width: 0, height: 11,},
        shadowOpacity: 100,
        shadowRadius: 14.78,

        elevation: 22,
    },

    info: {

        paddingHorizontal: 20,
        marginTop: 20,
        borderColor: "grey",
        fontSize: 20,
    },
    imageShadow: {        shadowOpacity: 20,
        shadowRadius: 400,
        // shadowColor: "black",
        shadowColor: "black",
        shadowOffset: {width: 0, height: 11,},
        shadowOpacity: 100,
        shadowRadius: 14.78,

        elevation: 22,},
        
    avatar: {

        display: "flex",
        width:  100,
        height:  100,
        alignSelf: "center",
        top: -10,
        overflow: "hidden",
        borderRadius: 360,
        borderColor: "white",
        borderWidth: 3,

    },

    nav: {
        flexDirection: "row",
        justifyContent: "space-between",
        top: 40,
        textAlign: "center",
        alignItems: "center",
        paddingHorizontal: 75,

    },

    navText: {
        color: "grey",
        fontSize: 16,
        marginTop: 10,
        marginBottom: 10,
        fontWeight: "bold",
    },

    requestWrapper: {
        alignSelf: "center",
        backgroundColor: "white",
        marginTop: 3,
        borderRadius: 360,
        padding: 10,

        shadowOpacity: 10,
        shadowRadius: 10,
        shadowColor: "black",
        shadowOffset: {width: 0, height: 11,},
        shadowOpacity: 50,
        shadowRadius: 14.78,
        elevation: 22,
    },

    requestText: {
        color: "grey",
        fontSize: 16,
        fontWeight: "bold",
    },

    image: {
        width: 500,
        height:250,
        shadowOpacity: 20,
        shadowRadius: 400,
        shadowColor: "black",
        shadowOffset: {width: 0, height: 11,},
        shadowOpacity: 100,
        shadowRadius: 14.78,
        elevation: 22,
    },
  
    experienceWrapper: {
        borderColor: "grey",
        paddingHorizontal: 20,
        marginTop: 10,
        borderBottomWidth: 2,
    },


    experienceTitle: {
        paddingTop: 5,
        fontSize: 16,
        fontWeight: "bold",
    },

    experienceYear: {
        paddingTop: 5,
        color: "grey"
    },

    experienceDescription: {
        paddingTop: 5,
        paddingBottom: 5,
    },
});
const userData = [{
    id: 0,
    name: "Poppy Ward",
    //avatar: require("./avator.jpg"),

    aboutMe: "About ME:"+
    "A business consultant with passion and interest in data transformation techniques."+
    "Studied at Queen Mary University of London with a degree in Business Management. I have exceptional communication,"+
    "technical, leadership and analytical skills. Along with my strong business background, I possess business-oriented"+
    "digital skills as well as a commercial experience in research, management consultancy and administration.",

    exp:
    [
    {id: 0,
    title: "Business Consultant",
    monthFrom: "Mar" ,
    monthTo: "Apr",
    fromYr: "2017",
    toYr: "2021",
    desc: "Led team of 15 people in 20+ projects in London and Sydney",},

     {id: 1,
        monthFrom: "Oct" ,
        monthTo: "Nov",
     title: "Talent Accelerator and Consultant",
     fromYr: "2016",
     toYr: "2017",
     desc: "Hosted events for graduates and entry-level participants in a consulting start-up"},

     {id: 2,
     title: "Research Consultant",
     monthFrom: "Apr" ,
     monthTo: "Mar",
     fromYr: "2015",
     toYr: "2016",
     desc: "Performed in-depth global market research to identify relevant companies and high-calibre professionals"},

     {id: 3,
     title: "Santander Intern",
     monthFrom: "Jan" ,
     monthTo: "Feb",
     fromYr: "2015",
     toYr: "2015",
     desc: "Played a key role in completing multiple business projects."},

     {id: 4,
        title: "Market Research Interviewer",
        monthFrom: "Oct" ,
        monthTo: "Dec",
        fromYr: "2013",
        toYr: "2015",
        desc: "Utilised effective communication, organisational and time management skills to interview people from different backgrounds",},

         {id: 5,
            monthFrom: "Oct" ,
            monthTo: "Nov",
         title: "Consultant Intern at the Bright Network",
         fromYr: "2011",
         toYr: "2013",
         desc: "Learned core consulting skills from industry experts (Accenture, Alpha FMC, PwC and Elixirr)"},

         {id: 6,
         title: "Usability Tester",
         monthFrom: "Apr" ,
         monthTo: "Mar",
         fromYr: "2010",
         toYr: "2010",
         desc: "Performed analytical tests of various websites for their technical issues and generated detailed bug test reports."},

         {id: 7,
         title: "Executive Assistant",
         monthFrom: "Jan" ,
         monthTo: "Feb",
         fromYr: "2009",
         toYr: "2010",
         desc: "Provided administrative support including diary, bookings, inbox, finances and digital media engagement"},

    ],

}]
/*
const userData = [{
    id: 0,
    name: "john",
   // avatar: require("./avator.jpg"),

    aboutMe: "About ME Lorem ipsum dolor sit amet, consectet"+
    "r adipiscing elit. Nullam vel libero sed enim efficitur efficitur. Aliquam vehicula vel lorem in l"+
    "ctus. In tempor ipsum dolor, vel efficitur lacus scelerisque id. Etiam eleifend tempor mattis. Mauris"+
    "quis massa rhoncus lorem venenatis tristique id et turpis. Interdum et malesuada fames ac ante ip"+
    "sum primis in faucibus. Duis faucibus in ante sed semper. Interdum et malesuada fames ac ante ipsum",

    exp: 
    [
    {id: 0,
    title: "Frontend Developer",
    monthFrom: "Oct" ,
    monthTo: "Dec",
    fromYr: "2011",
    toYr: "2015",
    desc: "worked with react and firebase",},

     {id: 1,
      monthFrom: "Oct" ,
      monthTo: "Nov",
     title: "Operating System Engineer",
     fromYr: "2011",
     toYr: "2015",
     desc: "helped develop OS"},

     {id: 2,
     title: "Computing Teacher",
     monthFrom: "Apr" ,
     monthTo: "Mar",
     fromYr: "2010",
     toYr: "2011",
     desc: "Taught Students"},

     {id: 3,
     title: "Operating System Engineer",
     monthFrom: "Jan" ,
     monthTo: "Feb",
     fromYr: "2011",
     toYr: "2015",
     desc: "helped develop OS"},
        
     {id: 4,
        title: "Frontend Developer",
        monthFrom: "Oct" ,
        monthTo: "Dec",
        fromYr: "2011",
        toYr: "2015",
        desc: "worked with react and firebase",},
    
         {id: 5,
            monthFrom: "Oct" ,
            monthTo: "Nov",
         title: "Operating System Engineer",
         fromYr: "2011",
         toYr: "2015",
         desc: "helped develop OS"},
    
         {id: 6,
         title: "Computing Teacher",
         monthFrom: "Apr" ,
         monthTo: "Mar",
         fromYr: "2010",
         toYr: "2011",
         desc: "Taught Students"},
    
         {id: 7,
         title: "Operating System Engineer",
         monthFrom: "Jan" ,
         monthTo: "Feb",
         fromYr: "2011",
         toYr: "2015",
         desc: "helped develop OS"},

    ],

    tags: [
       "Ai",
      "Machine Learning",
      "Html",
      "Css",
    ],

}]
*/
