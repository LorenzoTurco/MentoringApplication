import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  Button,
  Alert,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",

    mentor: "Lorenzo",
    mentee: "Ash",
    since: "01/03/2020",
    pending: true,
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    mentor: "Naz",
    mentee: "Blanca",
    since: "01/03/2020",
    pending: false,
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    mentor: "Haroon",
    mentee: "John",
    since: "01/03/2020",
    pending: false,
  },
];

const ViewMentorships = ({ navigation }) => {
  const renderItem = ({ item }) => <Item item={item} />;

  const [change, setNewChange] = useState(false);

  function isPending(item) {
    if (item.pending == true) {
      return (
        <Button
          title="ACCEPT"
          onPress={() => {
            console.log("test");
            confirmationButton(item);
          }}
        ></Button>
      );
    }
  }
  const confirmationButton = (item) => {
    Alert.alert(
      "Are you sure",
      "",

      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            console.log("submitted");
            item.pending = false;
            setNewChange(true);
          },
        },
      ]
    );
  };

  const Item = ({ item }) => (
    <View style={styles.item}>
      <Text styles={styles.mentorshipUsers}>
        {item.mentor}
        {" - "}
        {item.mentee}
        {"       "}
        {item.since}
      </Text>

      {isPending(item)}
    </View>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.buttonPlacement}>
          <Button
            styles={styles.button}
            title="Plan event"
            onPress={() => navigation.navigate("FormPage")}
          />
        </View>

        <View style={styles.mentorshipListContainer}>
          <View style={styles.ListBox}>
            <Text style={styles.ListText}>Mentorship List</Text>
          </View>

          <FlatList
            data={DATA}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            extraData={change}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: "#f2f2f2",
  },
  item: {
    backgroundColor: "#f2f2f2",
    padding: 30,
    marginRight: 25,
    marginLeft: 25,
    marginTop: 10,
    borderRadius: 5,
    borderWidth: 2,
  },
  title: {
    fontSize: 32,
  },

  button: {
    padding: 200,
    marginVertical: 40,
  },

  buttonPlacement: {
    padding: 20,
    marginVertical: 20,
    elevation: 8,
    marginBottom: 10,
    width: '30%',
    backgroundColor: "#1daded",
    borderRadius: 100,
    paddingVertical: 8,
    alignSelf: "center",
  },

  ListBox: {
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    marginLeft: 20,
    marginRight: 20,
  },

  ListText: {
    fontSize: 25,
  },

  mentorshipListContainer: {
    backgroundColor: "#f2f2f2",
    paddingBottom: 15,
  },

  mentorshipUsers: {
    fontSize: 32,
  },
});

export default ViewMentorships;
