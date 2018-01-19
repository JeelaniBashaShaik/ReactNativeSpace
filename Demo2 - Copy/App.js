/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
/* 
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboarqweryd to rload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component<{}> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!affsa
        </Text>
        <Text style={styles.instructions}>
          To get started, edit App.js
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color:'green'
  },
  instructions: {
    textAlign: 'center',
    color: 'red',
    marginBottom: 5,
  },
});
 */


import React from 'react';
import { View, Text,Image } from 'react-native';
import { DrawerNavigator } from 'react-navigation';
import News from './src/news';
import WeatherComponent from './src/weather';
import MyApp from './src/news1';
import TranslateComponent from './src/translate';
import {SimpleApp} from './src/myScreen.js';
import MusicApp from './src/music';

const HomeScreen = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',backgroundColor:'white' }}>
    <Text>Home Screen</Text>
    <Image
          style={{width: 100, height: 100,marginTop:25}}
          source={require('./src/assets/react.png')}
          
        /></View>
);

const ProfileScreen = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Profile Screen</Text>
  </View>
);

const RootDrawer = DrawerNavigator({
  Home: {
    screen: HomeScreen,
  },
 /*  Weather: {
    screen: WeatherComponent,
  },
  News1:{
    screen: News
  },
  News2:{
    screen: MyApp
  },
  Translate:{
    screen:TranslateComponent
  }, */
  News:{
    screen:SimpleApp
  },
  Music:{
    screen:MusicApp
  },
  Weather:{
    screen:WeatherComponent
  }
  
});

export default RootDrawer;