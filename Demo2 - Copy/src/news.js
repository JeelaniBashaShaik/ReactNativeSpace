import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,ScrollView,Image,ActivityIndicator,
} from 'react-native';
import { Card, ListItem, Button} from 'react-native-elements'


export class News extends Component<{}> {

  state = {
    news:[],
  }

  fetchHinduNews(){
    const url = 'https://newsapi.org/v1/articles?source=the-hindu&sortBy=top&apiKey=2d99d74987364e95aaf013993c90327c';
    fetch(url)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({news:responseData.articles});
      })
      .catch(function (err) {
        return err;
      });
  }
  fetchToiNews(){
    const url = 'https://newsapi.org/v1/articles?source=the-times-of-india&sortBy=top&apiKey=2d99d74987364e95aaf013993c90327c';
    fetch(url)
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
      })
      .catch(function (err) {
        return err;
      });
  }
  componentWillMount(){
   this.fetchHinduNews();
   this.fetchToiNews();
  }

  
    render() {
      console.log(this.state.news);
      return (
        <View style={styles.container}>
          {/*  <ActivityIndicator animating = {this.state.animating} color = '#bc2b78' size = "large" style = {styles.activityIndicator}/> */}
{  <ScrollView>{
  this.state.news.map((u,i)=>{
      return (
        <Card key={u.title}>
       <Text style={styles.cardTitle}>{u.title}</Text>
       <Image
          style={{width: 300, height: 200}}
          source={{uri:u.urlToImage}}
        />
       <Text style={styles.cardDesctiption}>{u.description}</Text></Card>
      )
    })
  }</ScrollView>}
        </View>

      );
    }
  }

  const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
      'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to rload,\n' +
      'Shake or press menu button for dev menu',
  });

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
    cardTitle:{
      color:'lightcoral',
      textAlign:'left',
      padding:5,
      fontSize:16
    },
    cardDesctiption:{
      color:'black',
      textAlign:'left',
      padding:5,
      fontSize:14
    },
    activityIndicator: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: 80
   }
  });

  module.exports = News;