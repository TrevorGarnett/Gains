import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  FlatList,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeApp } from 'firebase/app';
import { AntDesign } from '@expo/vector-icons';
// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase

const firebaseConfig = {
  apiKey: "AIzaSyD1s_Y1YhW6YgNN0pQJo7IJky3qd5LTA9k",
  authDomain: "gains-feb39.firebaseapp.com",
  //databaseURL: 'https://project-id.firebaseio.com',
  projectId: "gains-feb39",
  storageBucket: "gains-feb39.appspot.com",
  messagingSenderId: "842605031184",
  appId: "1:842605031184:web:258ed4b5cd4513ec867f95",
  measurementId: "G-V0DB3DBV42"
};

const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

const Stack = createNativeStackNavigator();
let num = 0;

// This is the data we will be using to populate our FlatList
// Evenutally, we will want to pull this data from Firebase
let DATA = [
  {
    title: '1st Item',
    type: 'Single'
  },
  {
    title: '2nd Item',
    type: 'Single'
  },
  {
    title: 'Group 1',
    type: 'Group',
    collection: [
      {
        title: "3rd Item",
        type: 'Single'
      },
      {
        title: "4th Item",
        type: 'Single'
      },
      {
        title: "5th Item",
        type: 'Single'
      }
    ]
  }
]

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={ListView}
          options={
            {
              headerRight: () => (<AddButton />)
            }
          } />
        <Stack.Screen
          name="ListView"
          component={ListView}
          options={({ route }) => ({ title: route.params.customName })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const ListView = ({ navigation, route }) => {
  if (route.params != undefined) { // If we are navigating to a new screen
    data = route.params.data;
  } else { // If we are on the home screen
    data = DATA;
  }
  return (
    <View style={styles.scrollV}>
      <FlatList
        data={data}
        contentContainerStyle={styles.files}
        renderItem={({ item }) => {
          if (item.type == 'Group') {
            return <Group item={item} navigation={navigation} />
          } else {
            return <Item item={item} style={styles.item} />
          }
        }
        }
      />
    </View>
  )
}

const Item = ({ navigation, item }) => (
  <Pressable onPress={
    () => {
      console.log(item.title + " was pressed");
      // Navigate to new screen
    }
  } style={styles.item}>
    <Text>{item.title}</Text>
  </Pressable>
);

const Group = ({ navigation, item }) => (
  <Pressable onPress={() => {
    console.log(item.title + " was pressed");
    navigation.navigate('ListView', { customName: item.title, data: item.collection })
  }} style={styles.group}>
    <Text style={{ color: '#fff' }}>{item.title}</Text>
  </Pressable >
);

const AddButton = ({ navigation }) => (

  <Pressable
    title="New Item"
    onPress={() => {
      console.log("Add button was pressed");
      var todoPromise = fetch('https://jsonplaceholder.typicode.com/todos/1');
      todoPromise.then(response => response.json()).then(json => { console.log(json.completed) });
    }} >
    <AntDesign name="plus" size={24} color="#3478c6" />
  </Pressable >
);


const styles = StyleSheet.create({
  item: {
    alignSelf: 'stretch',
    padding: 15,
    backgroundColor: '#fff',
    alignItems: 'left',
    justifyContent: 'left',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  group: {
    alignSelf: 'stretch',
    padding: 15,
    backgroundColor: '#3478c6',
    alignItems: 'left',
    justifyContent: 'left',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  scrollV: {
    flex: 1,
  },
});

export default App;