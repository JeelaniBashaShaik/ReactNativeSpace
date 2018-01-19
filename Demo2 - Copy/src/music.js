import React, { Component } from 'react';
import { StyleSheet, Text, View,ScrollView,Platform,TouchableOpacity, TextInput,Image,AsyncStorage,ProgressBar,DeviceEventEmitter,ActivityIndicator } from 'react-native';
import { SearchBar,Card, ListItem, Button,Icon,Slider  } from 'react-native-elements';
import Sound from 'react-native-sound';
import MusicFiles from 'react-native-get-music-files';
import { StackNavigator } from 'react-navigation';
import  NowPlayingComponent   from './nowPlaying.js';


class MusicComponent extends React.Component{
    static navigationOptions = {
        title: 'Music'
      };
    constructor(props){
        super(props);
    }

    state={
        songsList:[],
        songsListCopy:[],
        searchQuery:'',
        playStatus:'not playing',
        sound:undefined,
        listAvailable:undefined,
        loadingSongs:false,
        currentSong:{title:'Select a song'},
        buttonType:'play'
    }

    _loadSongsForFirstTime(){
        console.log('started fetching');
            MusicFiles.getAll({
            blured : true, // works only when 'cover' is set to true
            artist : true,
            duration : true, //default : true
            cover : true, //default : true,
            genre : true,
            title : true,
            cover : true,
            date : true,
            lyrics : true,
            comments : true,
            minimumSongDuration : 10000, // get songs bigger than 10000 miliseconds duration,
            fields : ['title','albumTitle','genre','lyrics','artwork','duration'] // for iOs Version
        },(error) => {
            alert("ERROR: " + error);
        },(response) => {
            //console.log(response);
            console.log('loaded,fetched');
            this._addListToAsyncStorage(response); 
        });  
    }

    async _addListToAsyncStorage (obj) { 
        let listOfSongs = obj; 
            await AsyncStorage.setItem('listOfSongs', 
            JSON.stringify(listOfSongs)); 
            this.setState({loadingSongs:false});
            this._checkForSongsList(); 
    } 

    async _checkForSongsList () { 
        let response = await AsyncStorage.getItem('listOfSongs'); 
        let listOfSongs = await JSON.parse(response) || []; 
        this.setState({songsList:listOfSongs});
        this.setState({songsListCopy:listOfSongs});
        console.log(listOfSongs);
        console.log(this.state.songsListCopy.length);
    }

    sortSongs(){
        console.log('inside sort');
        let x = this.state.songsList;
        x.map((song,index)=>{
            if(song.title == null){
                song.title = song.fileName;
            }
        })
        let songs = x;
        songs.sort(function(obj1,obj2){
            return obj1.title.toLowerCase() - obj2.title.toLowerCase();
        });
        songs.map((song)=>{
            console.log(song.title);
        })
       // x.reverse();
      /*   x.map((song)=>{
           console.log(song.title);
       }) */
        this.setState({songsList:x});
    }

    _loadSong(path){
        console.log(path);
        if(this.sound != null){
            this.stopSong();
        }
        //this._loadAudio(path);
        //navigate('NowPlaying', {songDetails:u});
    }
    _loadAudio = (path) => {
       // console.log(path);
        console.log(this.state.playStatus);
        if(this.state.playStatus === 'Paused'){
            this.sound.play(()=>{
                this.sound.release();
            })
        }else{    
          this.sound = new Sound(
              path,
              undefined,
              (error) => {
                if (error) {
                  console.log(error);
                } else {
                  //console.log('Playing sound');
                  this.setState({playStatus:'Playing'})
                  this.setState({buttonType:'pause'})
                  console.log(this.state.playStatus);
                  console.log(this.state.buttonType);
                  this.sound.play(() => {
                    this.sound.release();
                  });
                }
              }
            );
        }
    
    };

    _checkPlayStatus(){
        console.log('inside checkplaystatus');
        console.log(this.state.playStatus);
        if(this.state.playStatus == ('Paused' || 'Stopped')){
            //this.state.buttonType = 'play';
           // this.setState({buttonType:'play'})
            this.resumeSong();
            console.log('inside now paused')
        }else if(this.state.playStatus == 'Playing'){
            //this.state.buttonType = 'pause';
            //this.setState({buttonType:'pause'})
            this.pauseSong();
            console.log('inside now playing')
        }
        //console.log(this.state.buttonType,'butto')
    }
    pauseSong(){
        console.log('inside pause');
          this.setState({playStatus:'Paused'});
          this.setState({buttonType:'play'})
          //this.setState({buttobT})
          console.log(this.state.playStatus);
          if(this.sound != null){
            this.sound.pause();
          }
         
      }
  
      stopSong(){
         console.log('inside stop');
          this.setState({playStatus:'Stopped'});
          this.setState({buttonType:'play'});
          console.log(this.state.playStatus);
          if(this.sound != null){
            this.sound.stop();
          }
      }
  
  
      resumeSong(){
          console.log('inside resume song');
          this.setState({playStatus:'Playing'});
          this.setState({buttonType:'pause'});
          if(this.sound != null){
            this.sound.play(()=>{
                this.sound.release();
            })
          }
          
      }
    componentWillMount(){
        this._checkForSongsList();
        console.log(this.state.songsList.length,'list');
        console.log(this.state.loadingSongs, 'loadingSongs');
        setTimeout(()=>{
            if(this.state.songsList.length === 0){
                this._loadSongsForFirstTime();
                this.setState({loadingSongs:true});
            }else{
                this.state.currentSong = this.state.songsList[0];
                console.log(this.state.currentSong);
               // this._loadAudio(this.state.currentSong.path);
               
            }
            console.log('inside timeout');
        },250);
       
    }

    _searchSong=(text)=>{
        let empty={title:'No Results Found'};
        console.log(empty);
        let x = this.state.songsListCopy.filter((song)=>{
            if(song.title != null){
                if(song.title.toLowerCase().indexOf(text.toLowerCase()) > -1){
                    return song;
                }
            }
        })
        console.log(x);
        if(x.length > 0){
            this.setState({songsList:x});
        }else{
            x.push(empty);
            this.setState({songsList:x})
        }
        
    }

    componentDidMount(){
        /* DeviceEventEmitter.addListener(
            'onBatchReceived',
            (params) => {
                this.setState({songs : [
                    ...this.state.songs,
                    ...params.batch
                ]});
            }
        )  */
    }

    render(){
        const {navigate} = this.props.navigation;
        if(this.state.songsList.length === 0){
            return(
                    <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center',flex:1}}>
                        <ActivityIndicator size="large" color="#0000ff" />
                        <Text>Loading Songs from Storage....</Text>
                    </View>
                )
        }else{
            return(
                <View style={{flexDirection:'column',flex:1}}> 
                    <TextInput style={{height: 40}} placeholder="Search......" onChangeText={this._searchSong} />
                  
                        <ScrollView>
                        <View>{
                            this.state.songsList.map((song,index)=>{
                                return(
                                  
                                    <View style={{padding:0,marginBottom:5,marginTop:5,marginLeft:5}} key={song.title + `${index}`}>
                                    
                    <TouchableOpacity onPress={()=> navigate('NowPlaying', {songDetails:song})}>
                                    {/* <TouchableOpacity onPress={()=>this._loadSong(song.path)}> */}
                                        <View style={{flexDirection:'row'}}>
                                  
                    <Image style={{width:50, height:50,borderRadius:50}} source={{uri:song.cover}}/>
                    <View style={{flexDirection:'column',marginLeft:5}}>
                    <Text style={styles.songName}>{song.title}</Text>
                    <Text style={styles.songArtists}>{song.author}</Text>
                    </View>
                   
            
                </View>
                </TouchableOpacity> 
            </View>
                                )
                                
                            })
                        }
            
                        </View>
                        
                        
                        </ScrollView>
                       {/*  <View sytle={{display:'flex',flexDirection:'row',justifyContent:'flex-start'}}>
                            <Text>{this.state.currentSong.title}</Text></View>
                            <View style={{flexDirection:'column'}}><Text>asdfa</Text></View>
                      <View style={{justifyContent:'flex-end',flexDirection:'row',backgroundColor:'lightgreen'}}>
                      <Icon reverse name={this.state.buttonType} type='font-awesome' color='lightcoral' onPress={()=>this._checkPlayStatus()} />
         <Icon reverse name='stop-circle-o' type='font-awesome' color='lightcoral' onPress={()=>this.stopSong()} />
                    </View> */}
                </View>
            )
        }
        
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
    },
    cardContainer:{
        flexDirection:'row'
    },
    iconStyle:{flexDirection:'row',left:200,marginTop:-37},
    songName:{
        color:'lightcoral',
        fontSize:14
    },
    iconRow:{
        flexDirection:'row',
        display:'flex',
        justifyContent:'flex-end'
    },
    songArtists:{
        color:'green',
        fontSize:10
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


//module.exports = MusicComponent;

export default MusicApp = StackNavigator({
    Home: { screen: MusicComponent },
    NowPlaying: { screen: NowPlayingComponent },
  });