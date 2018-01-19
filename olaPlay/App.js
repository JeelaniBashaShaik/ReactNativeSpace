/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,Button,
  View
} from 'react-native';
import { TabNavigator } from 'react-navigation';
import SimpleApp from './src/viewSongsList';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev 1menu',
});

export default class App extends Component<{}> {

  static navigationOptions = {
    tabBarLabel: 'Home',
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    

  };

  componentWillMount(){
    
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit App.js
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text> */}
        <SimpleApp />
      </View>
    
    );
  }
}

class History extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'History',
  
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

class Downloads extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Downloads',
  
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

const MyApp = TabNavigator({
  Home: {
    screen: App,
  },
  History: {
    screen: History,
  },
  Downloads: {
    screen: Downloads,
  },
  
}, {
  tabBarPosition: 'top',
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: '#e91e63',
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
   /*  justifyContent: 'center',
    alignItems: 'center', */
   
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});


//module.exports = MyApp;