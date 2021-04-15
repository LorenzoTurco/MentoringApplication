import React, {useEffect, useState} from "react";
import { StatusBar } from 'expo-status-bar';
import { Alert, KeyboardAvoidingView, StyleSheet, Text, TextInput, View, SafeAreaView, Image, ScrollView, TouchableOpacity, ImageBackground, Button} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';


//import userData from './userData.js'
import { FlatList } from 'react-native-gesture-handler';
import { NavigationHelpersContext } from "@react-navigation/core";


Feather.loadFont()
Ionicons.loadFont()
Fontisto.loadFont()                                  

const ViewProfileScreen = ({route, navigation}) =>{
                                                           
    //flag is used to render expe7irience or about me information by using values: 0, 1, 2
    let [flag, setFlag] = useState(0);
    let aboutMe  = userData[0].aboutMe;

   const [experience, setExperience] = useState(userData[0].exp.map(e => (
        <View style = {styles.experienceWrapper} key = {e.id}>
            <Text style = {styles.experienceTitle}>{e.title}</Text>
            <Text style = {styles.experienceYear}>{e.monthFrom} {e.fromYr}-{e.monthTo} {e.toYr}</Text>
            <Text style = {styles.experienceDescription}>{e.desc}</Text>
        </View>)))

    const [renderAboutMe, setAboutMe] = useState(<Text style = {styles.info}>{aboutMe}</Text>)
    
    let [editPressed, setEditPressed] = useState(false)
    
    let [isEdit, setIsEdit] = useState(false);

    let mentorship = ["Charizard", "MewTwo", "Charmendar"];

    // let m = mentorship.map(e => (<View style = {styles.experienceWrapper}><Text style = {styles.mentorshipText}>{e}</Text></View>))

    let[renderTags, setRenderTags] = useState(userData[0].tags.map(e => (
        <View style = {styles.experienceWrapper}>
            <Text style = {styles.experienceTitle} key = {e.id}>{e.tag}</Text>
        </View>)))

    const toggleAlert = () => 
    Alert.alert(
    "You Have Switched Roles",
    "",
    [{text: "OK", onPress: () => console.log ("BUTTON WORKING")}]
);

// const URLFOREMULATOR = "10.0.2.2";
// //'127.0.0.1'
// //'10.0.2.2'

// function fetchDataGET() {
//   fetch(`http://${URLFOREMULATOR}:4000/test`)
//     .then((res) =>
//       res.json().then((data) => {
//         console.log(data.msg);
//         //send info to state
//       })
//     )
//     .catch(function (error) {
//       console.log("FETCH QUERY FROM METHODNAME" + error.message);
//       throw error;
//     });
// }
    
    return(
    <View style={styles.container}>
        
        <View style = {styles.background}>
        <View style = {styles.header}>
            <View style = {styles.leftWrapper}>
                
            </View>
            {/* This is where the name goes */}
            <View style = {styles.nameWrapper}><Text style = {styles.name}>{userData[0].name}</Text></View>
                {/* <TouchableOpacity onPress = {() => setIsEdit(!isEdit)}> */}
                <TouchableOpacity onPress = {() => navigation.navigate("EditOwnProfile")}>
                {isEdit ? <Fontisto name = "checkbox-active" size = {32} color = "white"/> : <Feather name = "edit" size = {36} color = "white"/>}
            </TouchableOpacity>
        </View>

        <View style = {styles.imageShadow}>
            <ImageBackground style={styles.avatar} ></ImageBackground>
        </View>

        {/* This is toggle role  */}
            <TouchableOpacity onPress = {toggleAlert}>
                <View style={styles.requestWrapper}><Text style = {styles.requestText}>Toggle Role</Text></View>
            </TouchableOpacity>
        </View>


        <View style={styles.nav}>
            <TouchableOpacity onPress = {() => setFlag(0)} style ={[{borderBottomWidth: flag == 0? 2 : 0}, {borderColor: "grey"},]}>
                <Text style = {styles.navText}>Experience</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress = {() => setFlag(1)} style ={[{borderBottomWidth: flag == 1? 2 : 0}, {borderColor: "grey", paddingHorizontal: 20,},]}>
                <Text style = {styles.navText}>About Me</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress = {() => setFlag(2)} style ={[{borderBottomWidth: flag  == 2? 2 : 0}, {borderColor: "grey"},]}>
                <Text style = {styles.navText}>My Tags</Text>
            </TouchableOpacity>
        </View>
      
        <View style = {styles.horizontalBar}></View>
        {/* <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}> */}
        <ScrollView contentInsetAdjustmentBehavior= "automatic" showsVerticalScrollIndicator = {false}>
            {flag == 0 ? experience: flag == 1 ? renderAboutMe : renderTags}
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

    mentorshipText: {
        paddingHorizontal: 20,
        fontSize: 24,
        fontWeight: "bold",
    },

    experienceButton: {
        borderBottomWidth: 2,
        borderColor: "grey",
    },

    name: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },

    header: {
        // alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 32,
        paddingHorizontal: 20,
    },

    leftWrapper: {
        padding: 0,
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
        // left: 120,
        // top: 110,
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
        paddingHorizontal: 40,

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
    }
})

const userData = [{
    id: 0,
    name: "John Smith",
   // avatar: require("./avator.jpg"),

    aboutMe:
    "Entry Level Business Consultant at FDM Group - based in London."+
    "Studied at Queen Mary University of London with a degree in Business Management. I have exceptional communication,"+
    "technical, leadership and analytical skills. Along with my strong business background, I possess business-oriented"+
    "digital skills as well as a commercial experience in research, management consultancy and administration.",

    exp:
    [
    {id: 0,
    title: "Entry Level Business Consultant",
    monthFrom: "Mar" ,
    monthTo: "Apr",
    fromYr: "2021",
    toYr: "2021",
    desc: "Received training in business consultancy at FDM following the Business Intelligence Graduate Scheme",},

     {id: 1,
        monthFrom: "Oct" ,
        monthTo: "Nov",
     title: "Project Support at IPA",
     fromYr: "2020",
     toYr: "2020",
     desc: "Supported the making and delivery of The Government Project Delivery Conference 2020."},

     {id: 2,
     title: "Internship at Lloyds Bank",
     monthFrom: "Apr" ,
     monthTo: "Mar",
     fromYr: "2019",
     toYr: "2020",
     desc: "Interned at Lloyds Bank Business Analytics team for my degree's year in industry"},

     {id: 3,
     title: "Full Time Student at King's College London",
     monthFrom: "Jan" ,
     monthTo: "Feb",
     fromYr: "2018",
     toYr: "2020",
     desc: "Graduated with a BSc (Hons) in Data Science."},

    ],
    tags: [
        {id: 0,
        tag: "Leadership",
        },
        {id: 1,
       tag: "Machine Learning",
        },
        {id: 2,
       tag: "Consulting",
        },
       { id: 3,
       tag: "Management",
 }
     ],



}]

// const userData = [{
//     id: 0,
//     name: "john",
//     //avatar: require("../images/graphic1.png"),

//     aboutMe: "About ME Lorem ipsum dolor sit amet, consectet"+
//     "r adipiscing elit. Nullam vel libero sed enim efficitur efficitur. Aliquam vehicula vel lorem in l"+
//     "ctus. In tempor ipsum dolor, vel efficitur lacus scelerisque id. Etiam eleifend tempor mattis. Mauris"+
//     "quis massa rhoncus lorem venenatis tristique id et turpis. Interdum et malesuada fames ac ante ip"+
//     "sum primis in faucibus. Duis faucibus in ante sed semper. Interdum et malesuada fames ac ante ipsum",

//     exp: 
//     [
//     {id: 0,
//     title: "Frontend Developer",
//     monthFrom: "Oct" ,
//     monthTo: "Dec",
//     fromYr: "2011",
//     toYr: "2015",
//     desc: "worked with react and firebase",},

//      {id: 1,
//       monthFrom: "Oct" ,
//       monthTo: "Nov",
//      title: "Operating System Engineer",
//      fromYr: "2011",
//      toYr: "2015",
//      desc: "helped develop OS"},

//      {id: 2,
//      title: "Computing Teacher",
//      monthFrom: "Apr" ,
//      monthTo: "Mar",
//      fromYr: "2010",
//      toYr: "2011",
//      desc: "Taught Students"},

//      {id: 3,
//      title: "Operating System Engineer",
//      monthFrom: "Jan" ,
//      monthTo: "Feb",
//      fromYr: "2011",
//      toYr: "2015",
//      desc: "helped develop OS"},
        
//      {id: 4,
//         title: "Frontend Developer",
//         monthFrom: "Oct" ,
//         monthTo: "Dec",
//         fromYr: "2011",
//         toYr: "2015",
//         desc: "worked with react and firebase",},
    
//          {id: 5,
//             monthFrom: "Oct" ,
//             monthTo: "Nov",
//          title: "Operating System Engineer",
//          fromYr: "2011",
//          toYr: "2015",
//          desc: "helped develop OS"},
    
//          {id: 6,
//          title: "Computing Teacher",
//          monthFrom: "Apr" ,
//          monthTo: "Mar",
//          fromYr: "2010",
//          toYr: "2011",
//          desc: "Taught Students"},
    
//          {id: 7,
//          title: "Operating System Engineer",
//          monthFrom: "Jan" ,
//          monthTo: "Feb",
//          fromYr: "2011",
//          toYr: "2015",
//          desc: "helped develop OS"},

//     ],

//     tags: [
//        {id: 0,
//        tag: "Ai",
//        },
//        {id: 1,
//       tag: "Machine Learning",
//        },
//        {id: 2,
//       tag: "Html",
//        },
//       { id: 3,
//       tag: "Css",
// }
//     ],

// }]






// const ViewProfileScreen = () => {
//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <View style={{ flex: 1 , padding: 16}}>
//         <View
//           style={{
//             flex: 1,
//             alignItems: 'center',
//             justifyContent: 'center',
//           }}>
//           <Text
//             style={{
//               fontSize: 25,
//               textAlign: 'center',
//               marginBottom: 16
//             }}>
//             You are on View Profile Screen
//           </Text>
//         </View>
//         <Text
//           style={{
//             fontSize: 18,
//             textAlign: 'center',
//             color: 'grey'
//           }}>
//           FDM Mentor Matching Experience
//         </Text>
//         <Text
//           style={{
//             fontSize: 16,
//             textAlign: 'center',
//             color: 'grey'
//           }}>
//           www.fdmgroup.com
//         </Text>
//       </View>
//     </SafeAreaView>
//   );
// }
export default ViewProfileScreen;