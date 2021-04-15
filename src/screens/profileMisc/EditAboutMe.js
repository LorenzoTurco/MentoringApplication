import React, {useState} from "react";
import {KeyboardAvoidingView, StyleSheet, Text, TextInput, View, ScrollView, TouchableOpacity} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';

Feather.loadFont()
Ionicons.loadFont()
Fontisto.loadFont()

export default EditAboutMe = ({route, navigation}) =>{
   

    //flag is used to render experience or about me information by using boolean
    let [flag, setFlag] = useState(true);
    let aboutMe = route.params;
    
    let [newAboutMe, setNewAboutMe] = useState(aboutMe)

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

        <View style = {styles.title}>
            <Text style = {styles.title}>About Me</Text>
        </View>

        <View style = {{height: 290,}}>
            <ScrollView>
            <TextInput 
            multiline = {true} 
            maxLength = {500}numberOfLines = {10} 
            style = {[styles.info, {borderBottomWidth: 2, borderColor: "grey"}]} 
            defaultValue ={newAboutMe} 
            onChangeText = {newAboutMe=> setNewDesc(newAboutMe)}>
            </TextInput>
            </ScrollView>
            <View style = {styles.addWrapper}>
        <TouchableOpacity>
            <Text style = {styles.addText}>Save</Text>
        </TouchableOpacity>
        </View>
        </View>

        {/* <View>
            <TouchableOpacity>
                <Text>Save</Text>
            </TouchableOpacity>
        </View> */}





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

    addWrapper: {
        backgroundColor: "#1daded",
        borderRadius: 100,    },

    addText: {
        color: "white",
        fontSize: 24,
        fontWeight: "bold",
        alignSelf: "center",
        marginTop: 10,
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
        borderColor: "red",
        backgroundColor: "grey",
        borderRadius: 20,
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
        marginTop: 10,
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