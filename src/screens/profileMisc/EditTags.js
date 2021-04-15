import React, {useState} from "react";
import {KeyboardAvoidingView, StyleSheet, Text, TextInput, View, TouchableOpacity} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';


import userData from "./userData.js";

Feather.loadFont()
Ionicons.loadFont()
Fontisto.loadFont()

export default EditTags = ({route, navigation}) =>{
   

    //flag is used to render experience or about me information by using boolean
    let [flag, setFlag] = useState(true);
    let {tag} = route.params;

    const [aboutMe, setAboutMe] = useState(      
        userData[0].aboutMe
);
    // let exp  = userData[0].exp;

    let [editPressed, setEditPressed] = useState(false)
    
    let [isEdit, setIsEdit] = useState(false);

     function saveNewData() {
        // userData[0].exp[id].title = newTitle
        // userData[0].exp[id].from = newFromDate
        // userData[0].exp[id].to = newToDate
        // userData[0].exp[id].desc = newDesc
    };

    // used to determine which date we are looking at: none, from or to
    let [check, setCheck] = useState(0);
    let [newTag, setNewTag] = useState(tag.tag);
    return(
    //  <View style={styles.container}>
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style = {styles.container}>       
        <View style = {styles.header}>
            <View style = {styles.leftWrapper}>
                <TouchableOpacity onPress = {() => navigation.goBack()}>
                </TouchableOpacity>
            </View>
{/* 
            <TouchableOpacity onPress = {() => setIsEdit(!isEdit)}>
                {isEdit ? <Fontisto name = "checkbox-active" size = {32} color = "grey"/> : <Feather name = "edit" size = {36} color = "grey"/>}
            </TouchableOpacity> */}
        </View>
        <View style = {styles.titleWrapper}>
            <View style = {styles.title}>
            <Text style = {styles.title}>Name Of Tag</Text>
            </View>


        <View>

        {/* THIS IS WHERE TITLE GOES */}
        <View style = {[styles.a, {borderBottomWidth: 2, borderColor: "grey"}]}>
            <TextInput multiline = {true} maxLength = {25}numberOfLines = {10} style = {styles.aa} defaultValue ={newTag} onChangeText = {newTitle => setNewTag(newTag)}></TextInput>
            </View>
        </View>

        {/* <View style = {styles.finishWrapper}> */}
        <TouchableOpacity style = {styles.finishWrapper} onPress = {saveNewData}>
            <Text style = {{fontSize: 24, fontWeight: "bold", color: "white"}}>Finish</Text>
        </TouchableOpacity>
        {/* </View> */}

        <TouchableOpacity style = {styles.deleteWrapper} onPress = {saveNewData}>
            <Text style = {{fontSize: 24, fontWeight: "bold", color: "white"}}>Delete</Text>
        </TouchableOpacity>

        </View>

    </KeyboardAvoidingView> )
};

const styles = StyleSheet.create({
    container: {
        flex:1,
    },


    /// NEW
    titleWrapper: {
        marginTop: 3,
        alignSelf: "center",
        alignItems: "center",
    },

    title: {
        paddingHorizontal: 50,
        marginTop: 10,
        fontSize: 24,
        fontWeight: "bold",
        alignContent: "center",
        alignItems: "center",
        alignContent: "center",
    },

    deleteWrapper: {
        marginTop: 20,
        borderColor: "red",
        backgroundColor: "red",
        borderRadius: 20,
        paddingHorizontal: 120,
    },

    a: {
        // position: "absolute",
        // top: -50,
        paddingHorizontal: 5,
        marginTop: 2,
        fontSize: 24,
        width: 300,
        alignSelf: "center",
        // alignContent: "center",
        // alignItems: "center",
        // alignContent: "center",
    },

    aa: {
        paddingHorizontal: 10,
        marginTop: 5,
        fontSize: 24,
        alignSelf: "center",
        // alignContent: "center",
        // alignItems: "center",
        // alignContent: "center",
    },

    editableTitle: {
        paddingHorizontal: 20,
    },

    date: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    finishWrapper: {
        marginTop: 20,
        backgroundColor: "#1daded",
        borderRadius: 100,
        paddingHorizontal: 120,

    },

    ///TOP NEW

    editWrapper: {
        paddingHorizontal: 20,
        alignItems: "center",
    },

    editTitle: {
        marginTop: 80,
    },

    editYr: {
        marginTop: 80,
    },

    editDesc: {
        marginTop: 80,
    },


    horizontalBar: {
        borderWidth: 50,
        borderColor: "grey",
    },



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