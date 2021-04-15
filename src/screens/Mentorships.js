import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import { NavigationContainer } from "@react-navigation/native";

import ViewMentorships from "../components/ViewMentorships";
import FormPage from "../components/FormPage";

const Stack = createStackNavigator();

export default function MentorshipsScreen() {
  return (
      <Stack.Navigator>
        <Stack.Screen
          name="ViewMentorships"
          component={ViewMentorships}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="FormPage"
          component={FormPage}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
  );
}