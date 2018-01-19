import React from 'react';
import {
  AppRegistry,
  Text,View,Button,Image,StyleSheet,ScrollView,TouchableOpacity,ActivityIndicator
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Card} from 'react-native-elements'

import { News } from './news';
class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'News',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
      <ScrollView>
          <Card>
        <TouchableOpacity onPress={() => navigate('News', { url: 'https://newsapi.org/v1/articles?source=the-hindu&sortBy=top&apiKey=2d99d74987364e95aaf013993c90327c',source:'The Hindu' })}>
        <Image
          style={{width: 150, height: 80,marginLeft:75}}
          source={require('./assets/The-Hindu1.png')}
          
        />
        </TouchableOpacity></Card>
        <Card>
        <TouchableOpacity onPress={() => navigate('News', { url: 'https://newsapi.org/v1/articles?source=the-times-of-india&sortBy=top&apiKey=2d99d74987364e95aaf013993c90327c',source:'Times Of India' })}
        ><Image
          style={{width: 200, height: 80,marginLeft:50}}
          source={require('./assets/toi.png')}
          
        />
        </TouchableOpacity></Card>
        <Card>
        <TouchableOpacity onPress={() => navigate('News', { url: 'https://newsapi.org/v1/articles?source=the-verge&sortBy=top&apiKey=2d99d74987364e95aaf013993c90327c',source:'The Verge' })}
        ><Image
          style={{width: 150, height: 100,marginLeft:75}}
          source={require('./assets/theVerge.png')}
          
        />
        </TouchableOpacity></Card>
        
        <Card>
        <TouchableOpacity onPress={() => navigate('News', { url: 'https://newsapi.org/v1/articles?source=national-geographic&sortBy=top&apiKey=2d99d74987364e95aaf013993c90327c',source:'National Geographic' })}
        ><Image
          style={{width: 300, height: 80,marginLeft:0}}
          source={require('./assets/ngc.png')}
          
        />
        </TouchableOpacity></Card>
        <Card>
        <TouchableOpacity onPress={() => navigate('News', { url: 'https://newsapi.org/v1/articles?source=techradar&sortBy=top&apiKey=2d99d74987364e95aaf013993c90327c',source:'Tech Radar' })}
        ><Image
          style={{width: 175, height: 80,marginLeft:60}}
          source={require('./assets/techradar.gif')}
          
        />
        </TouchableOpacity></Card>
        <Card>
        <TouchableOpacity onPress={() => navigate('News', { url: 'https://newsapi.org/v1/articles?source=google-news&sortBy=top&apiKey=2d99d74987364e95aaf013993c90327c',source:'Google News' })}
        ><Image
          style={{width: 175, height: 80,marginLeft:60}}
          source={require('./assets/gnews.jpg')}
          
        />
        </TouchableOpacity></Card>

        <Card>
        <TouchableOpacity onPress={() => navigate('News', { url: 'https://newsapi.org/v1/articles?source=espn-cric-info&sortBy=latest&apiKey=2d99d74987364e95aaf013993c90327c',source:'ESPN CricInfo' })}
        ><Image
          style={{width: 175, height: 80,marginLeft:60}}
          source={require('./assets/espn.jpg')}
          
        />
        </TouchableOpacity></Card>

        <Card>
        <TouchableOpacity onPress={() => navigate('News', { url: 'https://newsapi.org/v2/top-headlines?sources=polygon&apiKey=2d99d74987364e95aaf013993c90327c',source:'Polygon' })}
        ><Image
          style={{width: 230, height: 80,marginLeft:40}}
          source={require('./assets/poly.png')}
          
        />
        </TouchableOpacity></Card>

  </ScrollView>
      </View>
    );
  }
}

class ChatScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: `Chat with ${navigation.state.params.user}`,
  });
  render() {
    const { params } = this.props.navigation.state;
    return (
      <View>
        <Text>Chat with {params.user}</Text>
      </View>
    );
  }
}


export class ChatScreen1 extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.source}`,
  });

  state={
    news:[]
  }
  
  fetchHinduNews(){
    /* const { para } = this.props.navigation.state;
    console.log(para.url); */
    fetch(this.props.navigation.state.params.url)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({news:responseData.articles});
      })
      .catch(function (err) {
        return err;
      });
    
  }

  componentWillMount(){
    this.fetchHinduNews();
   }

  render() {
    if(this.state.news.length === 0){
      return(
              <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center',flex:1}}>
                  <ActivityIndicator size="large" color="#0000ff" />
                  <Text>Loading News.......</Text>
              </View>
          )
  }else{
    return (
      <View style={styles.container}>
        
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  sourceTile:{
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

export const SimpleApp = StackNavigator({
  Home: { screen: HomeScreen },
  Chat: { screen: ChatScreen },
  News: { screen: ChatScreen1 }
});
