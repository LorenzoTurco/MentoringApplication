import React, {useState} from "react";
import {KeyboardAvoidingView, StyleSheet, Text, TextInput, View, TouchableOpacity} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';


import DateTimePickerModal from "react-native-modal-datetime-picker";

Feather.loadFont()
Ionicons.loadFont()
Fontisto.loadFont()

export default AddNewExperience = ({route, navigation}) =>{
   

    //flag is used to render experience or about me information by using boolean
    let [flag, setFlag] = useState(true);
    // let add = route.params;

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
//     const [aboutMe, setAboutMe] = useState(      
//         userData[0].aboutMe
// );
    
//     let [editPressed, setEditPressed] = useState(false)
    
//     let [isEdit, setIsEdit] = useState(false);

//     let [editAboutMe, l] = useState( 
//         <TextInput style = {styles.info} multiline = {true} >{aboutMe}
        
//         </TextInput>);


        //These variables hold the input from the TextInput/datePicker
    let [newFromMonth, setNewFromMonth] = useState("Jan")
    let [newToMonth, setNewToMonth] = useState("Jan")
    let [newFromYr, setNewFromYr] = useState(2021 )
    let [newToYr, setNewToYr] = useState(2021)
    let id = 0;
    let [newTitle, setNewTitle ]  = useState("Type in the title")
    let [newDesc, setNewDesc] = useState("Type in the description")

     function saveNewData() {
        // userData[0].exp[id].title = newTitle
        // userData[0].exp[id].from = newFromDate
        // userData[0].exp[id].to = newToDate
        // userData[0].exp[id].desc = newDesc
        console.warn("abc");
    };

    // used to determine which date we are looking at: none, from or to
    let [check, setCheck] = useState(0);

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isToDatePickerVisible, setToDatePickerVisibility] = useState(false);

    const showFromDatePicker = () => {
      setDatePickerVisibility(true);
    };
  
    //The "To" part of the date
    const hideFromDatePicker = () => {
      setDatePickerVisibility(false);
    };
  
    const handleFromConfirm = (date) => {
    //   console.warn("A date has been picked: ", date.getFullYear());
      setNewFromMonth(months[date.getMonth()])
      setNewFromYr(date.getFullYear())
      hideFromDatePicker();
    };
  
    const showToDatePicker = () => {
      setToDatePickerVisibility(true);
    };
  

    const hideToDatePicker = () => {
      setToDatePickerVisibility(false);
    };
  
    const handleToConfirm = (date) => {
    //   console.warn("A date has been picked: ", date.getFullYear());
      setNewToMonth(months[date.getMonth()])
      setNewToYr(date.getFullYear())
      hideToDatePicker();
    };

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
            <Text style = {styles.title}>Title</Text>
            </View>


        <View>

        {/* THIS IS WHERE TITLE GOES */}
        <View style = {[styles.a, {borderBottomWidth: 2, borderColor: "grey"}]}>
            <TextInput multiline = {true} maxLength = {25}numberOfLines = {10} style = {styles.aa} defaultValue ={newTitle} onChangeText = {newTitle => setNewTitle(newTitle)}></TextInput>
            </View>
        </View>

        {/* <Text>{newTitle}</Text> */}

            {/* THIS IS WHERE YOU EDIT THE DATE */}
            <View style = {styles.title}>
            <Text style = {styles.title}>Date</Text>
            </View>
            
            {/* <View style = {[styles.date, {borderBottomWidth: 2, borderColor: "grey"}]}>
                <TouchableOpacity onPress={showDatePicker}>
                    <Text style = {{fontSize: 24}}>From: {newFromYr} <Feather name = "chevron-down" size = {18} color = "grey"/> </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={showToDatePicker}>
                    <Text style = {{fontSize: 24, marginLeft: 30}}>To: {newToYr}  <Feather name = "chevron-down" size = {18} color = "grey"/></Text>
                </TouchableOpacity>

            </View> */}

                        {/* THIS IS WHERE YOU EDIT THE DATE */}
                        <View style = {styles.title}>
            <Text style = {styles.title}>Date</Text>
            </View>
            <View style = {[styles.date, {borderBottomWidth: 2, borderColor: "grey"}]}>
                <TouchableOpacity onPress={showFromDatePicker}>
                    <Text style = {{fontSize: 24}}>From:{newFromMonth} {newFromYr} <Feather name = "chevron-down" size = {18} color = "grey"/> </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={showToDatePicker}>
                    <Text style = {{fontSize: 24, marginLeft: 0}}>To: {newToMonth} {newToYr}  <Feather name = "chevron-down" size = {18} color = "grey"/></Text>
                </TouchableOpacity>

            </View>

            {/* THIS IS WHERE THE DESCRIPTION GOES */}
            <View style = {styles.title}>
            <Text style = {styles.title}>Description</Text>
        </View>

        <View>
            <TextInput multiline = {true} maxLength = {50}numberOfLines = {10} style = {[styles.a, {borderBottomWidth: 2, borderColor: "grey"}]} defaultValue ={newDesc} onChangeText = {newDesc=> setNewDesc(newTitle)}></TextInput>
        </View>

        {/* <View style = {styles.finishWrapper}> */}
        <TouchableOpacity style = {styles.finishWrapper} onPress = {saveNewData}>
            <Text style = {{fontSize: 24, fontWeight: "bold", color: "white"}}>Finish</Text>
        </TouchableOpacity>
        {/* </View> */}

        {/* <TouchableOpacity style = {styles.deleteWrapper} onPress = {saveNewData}>
            <Text style = {{fontSize: 24, fontWeight: "bold", color: "white"}}>Delete</Text>
        </TouchableOpacity> */}

        </View>
    
        
          {/* HANDLES THE "FROM" PART OF THE DATE */}
          <View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleFromConfirm}
        onCancel={hideFromDatePicker}
      />
    </View>
            {/* HANDLES THE "TO" PART OF THE DATE */}
    <View>
      <DateTimePickerModal
        isVisible={isToDatePickerVisible}
        mode="date"
        onConfirm={handleToConfirm}
        onCancel={hideToDatePicker}
      />
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