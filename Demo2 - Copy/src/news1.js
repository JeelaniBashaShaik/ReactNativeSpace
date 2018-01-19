import React, { Component } from 'react';
import { StyleSheet,Text,View,Image,Button } from 'react-native';
import { TabNavigator } from 'react-navigation';
import { News } from './news';

class MyHomeScreen extends React.Component {
    static navigationOptions = {
      tabBarLabel: 'Home',
      // Note: By default the icon is only shown on iOS. Search the showIcon option below.
      

    };
  
    render() {
      return (
        
        <Button
          onPress={() => this.props.navigation.navigate('MyHomeScreen1')}
          title="Go to homescreen1"
        />
      );
    }
  }
  class MyNotificationsScreen extends React.Component {
    static navigationOptions = {
      tabBarLabel: 'Notifications',
    
    };
  
    render() {
      return (
        <Button
          onPress={() => this.props.navigation.goBack()}
          title="Go back home"
        />
      );
    }
  }
  
  const styles = StyleSheet.create({
    icon: {
      width: 26,
      height: 26,
    },
  });
  
  const MyApp = TabNavigator({
    Home: {
      screen: MyHomeScreen,
    },
    Notifications: {
      screen: MyNotificationsScreen,
    },
    
  }, {
    tabBarPosition: 'top',
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: '#e91e63',
    },
  });


  module.exports = MyApp;