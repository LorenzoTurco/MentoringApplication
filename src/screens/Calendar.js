import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";

import { Agenda } from "react-native-calendars";
//import Header from "./components/Header";
//const mentorshipItems = MentorshipData.map(item => <MentorshipItem key={item.id} item={} />)

const URLFOREMULATOR = "10.0.2.2";
//'127.0.0.1'
//'10.0.2.2'

function fetchDataGET() {
  fetch(`http://${URLFOREMULATOR}:4000/test`)
    .then((res) =>
      res.json().then((data) => {
        console.log(data.msg);
        //send info to state
      })
    )
    .catch(function (error) {
      console.log("FETCH QUERY FROM METHODNAME" + error.message);
      throw error;
    });
}

let x = fetchDataGET();

function fetchData() {
  //POST EXAMPLE
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "turco",
      uni: "QMUL",
    }),
  };
  fetch(`http://${URLFOREMULATOR}:4000/testt`, options)
    .then((res) =>
      res.json().then((data) => {
        console.log(data);
      })
    )
    .catch(function (error) {
      console.log("FETCH QUERY FROM METHODNAME" + error.message);
      throw error;
    });
}

let y = fetchData();

var arrayOfEvents = [
  // should be equal to database objects
  {
    date: "2021-01-06",
    title: "Mentoring meeting",
    name: "This is the event",
  },
  {
    date: "2021-01-07",
    title: "Mentoring meeting",
    name: "This is the event",
  },
  {
    date: "2021-01-08",
    title: "Mentoring meeting",
    name: "This is the event",
  },
];
const timeToString = (time) => {
  const date = new Date(time); // e.g 2020-07-06T00:00:00.000Z
  return date.toISOString().split("T")[0]; //e.g. 2020-07-06
  // the [0] only returns the first splitted string
};

export default function CalendarScreen() {
  const [items, setItems] = useState({}); //stores info of each item (event) object
  const [specificItem, setSpecificItems] = useState({});

  // item object

  //"2020-02-04": Array [
  //    Object {
  //      "date": "",
  //      "name": "Item for 2020-02-04 #",
  //      "title": "",
  //    },
  // ],

  const loadItems = (day) => {
    for (let i = -15; i < 85; i++) {
      //how many items to load
      const time = day.timestamp + i * 24 * 60 * 60 * 1000; //e.g 1672704000000

      const strTime = timeToString(time); //e.g. 2023-03-27

      if (!items[strTime]) {
        //if item hasn't been rendered yet
        items[strTime] = [];

        for (let i = 0; i < arrayOfEvents.length; i++) {
          if (
            arrayOfEvents[i].date == strTime &&
            arrayOfEvents[i].name != "empty"
          ) {
            //inefficient - could ignore item after event of the item already rendered
            //checks if the date that needs rendering is linked to an event
            items[strTime].push({
              date: arrayOfEvents[i].date,
              title: arrayOfEvents[i].title,
              name: arrayOfEvents[i].name,
            });
          } else {
            (items.date = strTime),
              (items.name = "empty"),
              (items.title = "empty");
          }
        }
      }
    }
    setItems(items);
  };

  const renderItem = (item) => {
    return (
      <TouchableOpacity style={{ marginTop: 30 }}>
        <View>{removeItem(item)}</View>
      </TouchableOpacity>
    );
  };

  function filteritems(arrayElement) {
    return arrayElement.name != specificItem.name;
  }

  const confirmationButton = (item) =>
    Alert.alert(
      "Are you sure",
      item.title + " will be removed",

      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            item.name = "empty";
            item.title = "empty";

            setItems(items);

            console.log(arrayOfEvents);

            setSpecificItems(item);

            arrayOfEvents = arrayOfEvents.filter(filteritems);
            console.log(arrayOfEvents);
            //remove item from DB
          },
        },
      ]
    );

  function removeItem(item) {
    if (item.name != "empty") {
      return (
        <View style={styles.eventContainer}>
          <Text style={{ fontWeight: "bold" }}>{item.title}</Text>
          <Text>{item.name}</Text>

          <Button
            style={styles.deleteButton}
            title="Cancel"
            onPress={() => {
              confirmationButton(item);
              setItems(items);

              //item.name = "the name has changed again";
              //item.title = "yyyy";
            }}
          ></Button>
        </View>
      );
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <Agenda
        onDayPress={(response) => {
          // info about day object (not for user)
        }}
        items={items} //contains values of items to be displayed on the agenda. System will contain max 100 items at a time.
        loadItemsForMonth={loadItems} // fires when user clicks on a day. Tells device what to render on the agenda.
        renderItem={renderItem} //specifies how each date event should be displayed
        pastScrollRange={12}
        futureScrollRange={12}
        onRefresh={() => console.log("refreshing...")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  eventContainer: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
    marginRight: 10,
    marginTop: 17,
    borderRadius: 5,
  },
});