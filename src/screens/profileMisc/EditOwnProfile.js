import React, {useState} from "react";
import { KeyboardAvoidingView, StyleSheet, Text, View, Image, ScrollView, TouchableOpacity} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';

Feather.loadFont()
Ionicons.loadFont()
Fontisto.loadFont()

export default EditOwnProfile = ({route, navigation}) =>{
    
    //flag is used to render experience or about me information by using boolean
    let [flag, setFlag] = useState(0);
   // const {item} = route.params;
    
   const [experience, setExperience] = useState(userData[0].exp.map(e => (
        <View style = {styles.experienceWrapper} key = {e.id}>
            <TouchableOpacity onPress = {() => navigation.navigate("EditExperience", {exp: e})}>
                <Text style = {styles.experienceTitle}>{e.title}</Text>
                <Text style = {styles.experienceYear}>{e.monthFrom} {e.fromYr}-{e.monthTo} {e.toYr}</Text>
                <Text style = {styles.experienceDescription}>{e.desc}</Text>
            </TouchableOpacity>
        </View>)))

    //THIS IS THE TAG RENDERING COMPONENT
    let [tags, setTags] = useState(userData[0].tags.map(e => (
        <View style = {styles.experienceWrapper}>
            <TouchableOpacity onPress = {() => navigation.navigate("EditTags", {tag: e})}>
                <Text style = {styles.experienceTitle} key = {e.id}>{e.tag}</Text>
            </TouchableOpacity>
        </View>)));

    const [aboutMe, setAboutMe] = useState(userData[0].aboutMe);
    
    let [editPressed, setEditPressed] = useState(false)
    
    let [isEdit, setIsEdit] = useState(false);

    let [editAboutMe, l] = useState( 
        // <TextInput style = {styles.info} multiline = {true} >{aboutMe}  </TextInput>
        <Text style = {styles.info}>{aboutMe}</Text>)
    
    return(
    //  <View style={styles.container}>
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style = {styles.container}>       
        <View style = {styles.header}>
            <View style = {styles.leftWrapper}>
                <TouchableOpacity onPress = {() => navigation.goBack()}>
                </TouchableOpacity>
            </View>

            {/* <TouchableOpacity onPress = {() => setIsEdit(!isEdit)}>
                {isEdit ? <Fontisto name = "checkbox-active" size = {32} color = "grey"/> : <Feather name = "edit" size = {36} color = "grey"/>}
            </TouchableOpacity> */}
        </View>

        <View style={styles.nav}>
            <TouchableOpacity onPress = {() => setFlag(0)} style ={[{borderBottomWidth: flag == 0? 2 : 0}, {borderColor: "grey"}, {marginLeft: -20}]}>
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

        {/* THIS IS WHERE THE INFORMATION GETS DISPLAYED */}
        <ScrollView contentInsetAdjustmentBehavior= "automatic" showsVerticalScrollIndicator = {false}>
            {/* {flag ? experience: isEdit? editAboutMe : <Text style = {styles.info}>{aboutMe}</Text>} */}
            {flag == 0? experience: flag == 1? editAboutMe : tags}
            {/* {flag == 0 ? experience: flag == 1 ? renderAboutMe : renderTags} */}

        </ScrollView>

            <View style = {styles.addWrapper}>
        <TouchableOpacity onPress = {() => navigation.navigate("AddNewExperience")}>
            {/* <View style = {styles.addWrapper}> */}
            <View style = {{height: flag == 0 ? 50 : 0}}>
            <Text style = {styles.addText}>Add New Experience</Text>
            </View>
        </TouchableOpacity>
        </View>

        <View style = {styles.addWrapper}>
        <TouchableOpacity onPress = {() => navigation.navigate("EditAboutMe", aboutMe)}>
            {/* <View style = {styles.addWrapper}> */}
            <View style = {{height: flag == 1 ? 50 : 0}}>
            <Text style = {styles.addText}>Edit About Me</Text>
            </View>
        </TouchableOpacity>
        </View>

        <View style = {styles.addWrapper}>
        <TouchableOpacity onPress = {() => navigation.navigate("AddNewTag")}>
            {/* <View style = {styles.addWrapper}> */}
            <View style = {{height: flag == 2 ? 50 : 0}}>
            <Text style = {styles.addText}>Add New Tag</Text>
            </View>
        </TouchableOpacity>
        </View>

    {/* </View> */}
    </KeyboardAvoidingView> )
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        // backgroundColor: colors.textGrey,
    },

    addWrapper: {
        backgroundColor: "#1daded",
        borderRadius: 100,
        marginBottom: 0.05,
        marginTop: 2.5,
    },

    addText: {
        color: "white",
        fontSize: 24,
        fontWeight: "bold",
        alignSelf: "center",
        marginTop: 10,
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

    header: {
        // alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 32,
        paddingHorizontal: 20,
    },

    leftWrapper: {

    },


    info: {

        paddingHorizontal: 20,
        marginTop: 20,
        borderColor: "grey",
        fontSize: 20,
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