import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { MainScreen } from './myScreen';

const BasicApp = StackNavigator({
    Main: {screen: MainScreen},
    Profile: {screen: ProfileScreen},
  });

  

  class ProfileScreen extends React.Component {
    static navigationOptions = ({navigation}) => ({
      title: navigation.state.params.name,
    });
    render() {
      const { goBack } = this.props.navigation;
      return (
        <Button
          title="Go back"
          onPress={() => goBack()}
        />
      );
    }
  }

  module.exports = MainNews;