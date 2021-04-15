import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  TextInput,
  Alert,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function FormPage({ navigation }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("Select date");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  function submit() {
    console.log(date.split(" ").length != 2);
    console.log(date.split(" ").length);

    if (date.split(" ").length != 3) {
      Alert.alert(
        "You must submit a valid date",
        "",

        [
          {
            text: "OK",
            style: "cancel",
          },
        ]
      );
    } else if (title.length < 1) {
      Alert.alert(
        "Are you sure you want to submit without a title?",
        "",

        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Yes",
            onPress: () => {
              //Add event in DB

              navigation.goBack("FormPage");
            },
          },
        ]
      );
    } else if (description.length < 1) {
      Alert.alert(
        "Are you sure you want to submit without a decription?",
        "",

        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Yes",
            onPress: () => {
              //Add event in DB
            },
          },
        ]
      );
    } else {
      navigation.goBack("FormPage");
    }
  }

  //ADD TO DATABASE

  //send title, description, new Date()
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.log("A date has been picked: ", date);

    let dateString = date.toString().slice(4, 15);
    setDate(dateString);
    hideDatePicker();
  };

  return (
    <SafeAreaView>
      <View style={styles.TotalBox}>
        <TextInput
          style={styles.inputBox}
          multiline={true}
          placeholder="enter title"
          onChangeText={(text) => {
            setTitle(text);
          }}
        />

        <TextInput
          style={styles.inputBox}
          placeholder="enter description"
          multiline={true}
          onChangeText={(text) => {
            setDescription(text);
          }}
        />

        <View style={styles.separator}>
          <Button title={date} onPress={showDatePicker} />
        </View>

        <View style={styles.separator}>
          <Button title="SUBMIT" onPress={() => submit()} />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </View>
        <View style={styles.separator}>
          <Button
            color={"#001c5c"}
            title="Back"
            onPress={() => navigation.goBack("FormPage")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  mentorshipContainer: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
    marginRight: 10,
    marginTop: 17,
    borderRadius: 5,
  },

  inputBox: {
    borderWidth: 2,
    borderColor: "skyblue",
    margin: 20,
    textAlign: "center",
  },

  button: {
    width: 50,
    height: 10,
  },

  TotalBox: {
    paddingTop: 60,
  },

  separator: {
    padding: 20,
  },
});
