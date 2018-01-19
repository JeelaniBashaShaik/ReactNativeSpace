import React, { Component } from 'react';
import { StyleSheet, Text, View,ScrollView,Platform, TextInput,Image,AsyncStorage,ProgressBar,DeviceEventEmitter } from 'react-native' ;
import { SearchBar,Card, ListItem, Button,Icon,Slider  } from 'react-native-elements';
import RNFetchBlob from 'react-native-fetch-blob'
import Sound from 'react-native-sound';
import { StackNavigator } from 'react-navigation';
import MusicFiles from 'react-native-get-music-files';
//import { ProgressBar } from 'react-native-progress-bar';


class SongsListComponent extends React.Component{
    static navigationOptions = {
        title: 'Ola Play Studios'
      };
    constructor(props){
        super(props);
    }
    async _addTask (obj) { 
    let listOfSongs = obj; 
        await AsyncStorage.setItem('listOfSongs', 
        JSON.stringify(listOfSongs)); 
        this._updateList(); 
      } 
    
    state={
        songsList:[],
        songsListCopy:[],
        searchQuery:'',
        playStatus:'not playing',
        sound:undefined
    }

    downloadSong(obj){
        let dirs = RNFetchBlob.fs.dirs;
        RNFetchBlob
        .config({
            addAndroidDownloads : {
                useDownloadManager : true, 
                notification : true,
                path : dirs.DownloadDir+ '/'+obj.song+'.mp3' ,
                description : obj.url+'.mp3' + ' '+'File downloaded.'
            }
        })
        .fetch('GET', obj.cover_image, {
        })
        .then((res) => {
          console.log('The file saved to ', res.path())
          imageView = <Image source={{ uri : Platform.OS === 'android' ? 'file://' + res.path() : '' + res.path() }}/>
        })
    }
    componentWillMount(){
        /* const url="http://starlord.hackerearth.com/studio";
        fetch(url)
        .then(res=>res.json())
        .then(response=>{
          this.setState({songsList:response});
          this.setState({songsListCopy:response});
          console.log(this.state.songsList);
        }) */
        this._updateList();
      /*    DeviceEventEmitter.addListener(
            'onBatchReceived',
            (params) => {
                this.setState({songs : [
                    ...this.state.songs,
                    ...params.batch
                ]});
            }
        )  */
        //this._loadAudio();
        //this._updateList();
    }


    componentDidMount(){
        console.log('loading.......');
/*     MusicFiles.getAll({
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
            console.log('loaded');
            this._addTask(response); */
        //});  
}



    pauseSong(){
      //  console.log('inside pause');
        this.setState({playStatus:'paused'});
        console.log(this.state.playStatus);
       this.sound.pause();
    }

    stopSong(){
       // console.log('inside stop');
        this.setState({playStatus:'stopped playing'})
        console.log(this.state.playStatus);
        /* this.sound.play(()=>{
            this.sound.release();
        }); */
        this.sound.stop();
    }


    resumeSong(){
        this.sound.play(()=>{
            this.sound.release();
        })
    }
    async _updateList () { 
        let response = await AsyncStorage.getItem('listOfSongs'); 
        let listOfTasks = await JSON.parse(response) || []; 
        this.setState({songsList:listOfTasks})
console.log(listOfTasks);
//return listOfTasks;
      }

      _loadAudio = (obj) => {
          console.log(obj.song);
          console.log(this.state.playStatus);
          if(this.state.playStatus === 'paused'){
              this.sound.play(()=>{
                  this.sound.release();
              })
          }else{    
            this.sound = new Sound(
                obj.url,
                undefined,
                (error) => {
                  if (error) {
                    console.log(error);
                  } else {
                    //console.log('Playing sound');
                    this.setState({playStaus:'Now Playing'})
                    console.log(this.state.playStatus);
                    this.sound.play(() => {
                      this.sound.release();
                    });
                  }
                }
              );
          }
      
      };




      _addToFavourites=(obj)=>{
        //console.log(obj);
      console.log('af');
      this._addTask(obj);
       
    }
    _searchSong=(text)=>{
        let x = this.state.songsListCopy.filter((song)=>{
            if(song.song.toLowerCase().indexOf(text.toLowerCase()) > -1){
                return song;
            }
        })
        //console.log(x);
        this.setState({songsList:x});
    }

    async _addToPlay(u){
        //console.log(u.song);
    }

    render(){
        const {navigate} = this.props.navigation;
        return(
            <View>
                {/* <TextInput style={{height: 40}} placeholder="Search......" onChangeText={this._searchSong} /> */}
                <SearchBar round lightTheme onChangeText={this._searchSong} placeholder='Search...' />
               
             
                {  <ScrollView style={{ paddingBottom:60,marginBottom:60}}>{
  this.state.songsList.map((u,i)=>{
      return (
        <View style={{padding:0,marginBottom:10,marginTop:10,marginLeft:10}} key={u.title}>
            <View style={styles.cardContainer}>
                <Image style={{width:50, height:50,borderRadius:50}} source={{uri:u.cover}}/>
                <View style={{flexDirection:'column',marginLeft:5}}>
                <Text style={styles.songName}>{u.title}</Text>
                <Text style={styles.songArtists}>{u.author}</Text>
                <View style={styles.iconStyle}>
                <Icon name='play' type='font-awesome' color='#f50'  onPress={() => {
                    navigate('chat', {songDetails:u});
                    this._addTask(u)}}/>
                <View style={{marginLeft:30}}> 
                <Icon name='download' type='font-awesome' color='#f50'  onPress={()=>this.downloadSong(u)}/> 
                </View>
                </View>
                </View>
         
            </View>
        </View>
      )
    })
  }</ScrollView>}
            </View>
        )
    }
}

class ChatScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
      //title: `Chat with ${navigation.state.params.songDetails.song}`,
      title:'Now Playing'
    });

    state={
        playStatus:'Fetching Song...........',
        sound:undefined,
        progress:0,
        timeElapsed:0,
        pausedAt:0,
        songDuration:0,
        time:'',
        playlistIndex:0,
        playlist:[
            {  
                "song":"Afreen Afreen",
                "url":"http://hck.re/Rh8KTk",
                "artists":"Rahat Fateh Ali Khan, Momina Mustehsan",
                "cover_image":"http://hck.re/kWWxUI"
             },
             {"song":"Aik Alif",
             "url":"http://hck.re/ZeSJFd",
             "artists":"Saieen Zahoor, Noori",
             "cover_image":"http://hck.re/3Cm0IX"
          }
        ]
    }

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

      async _updateList () { 
        let response = await AsyncStorage.getItem('listOfTasks'); 
        let listOfTasks = await JSON.parse(response) || []; 
      
//console.log(listOfTasks);
//console.log('inside update');
//return listOfTasks;
      }

      componentWillMount(){
       //   const { obj } = this.props.navigation.state.songDetails;
          //this._loadAudio(this.props.navigation.state.songDetails);
       //   console.log(obj);
       const { params } = this.props.navigation.state;
      // console.log(params.songDetails);
       this._loadAudio(params.songDetails);
      }
      _loadAudio = (obj) => {
        //console.log(obj.song);
        console.log(this.state.playStatus,'before fetch');

            this.sound = new Sound(
               '/storage/emulated/0/Music/Shape Of You - Ed Sheeran_320(DailyMaza).mp3',
                undefined,
                (error) => {
                  if (error) {
                    console.log(error);
                  } else {
                    //console.log('Playing sound');
                    console.log(obj.song,'playing this');
                    console.log(this.sound.getDuration());
                    this.setState({songDuration:this.sound.getDuration()});
                    this.setState({playStatus:'Playing'});
                this.time=setInterval(()=>{
                      this.calculateProgress();
                  },1000);
                   console.log(this.state.playStatus,'after fetch');
                    this.sound.play(() => {
                      this.sound.release();
            
                    });
                  }
                }
              );
            
  
          
        
    
    };

componentWillUnmount(){
    console.log('im leaving');
    this.sound.stop();

}


calculateProgress(){
    var x = this.sound.getCurrentTime((time)=>{
        //console.log(time);
        let a = time/this.state.songDuration;
        this.setState({progress:a})
        //return time;
    })
}

seekForward(val){
    console.log(val);
}
    render() {
      const { params } = this.props.navigation.state;
       // console.log(params.songDetails);
        //this._loadAudio(params.songDetails);
        /* setInterval(()=>{
            this.setState({progress:})
        }) */
       
      return (
        <View style={{flexDirection:'column',flex:1}}>
            <View style={{flex:1,marginTop:10}}>
          <Text style={{color:'lightcoral',fontSize:20,marginLeft:5}}>{params.songDetails.song}</Text>
          <Text style={{color:'black',fontSize:16,marginLeft:5}}>{params.songDetails.artists}</Text>
          
          <View style={{justifyContent:'center',alignItems:'center'}}>
          <Image style={{width:300, height:300}} source={{uri:params.songDetails.cover_image}}/>
          

          </View>
          <View style={{flex: 1, alignItems: 'stretch', justifyContent: 'center',marginLeft:5,marginRight:5,marginTop:10}}>
          {  <Slider value={this.state.progress} onValueChange={(value) => {
              console.log(value);
              let x = value*this.state.songDuration;
              console.log(x);
              this.sound.setCurrentTime(x);
              }} />}
              <Text>{this.state.playStatus}</Text>
        </View>
          <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginBottom:30}}>
          <Icon reverse name='pause' type='font-awesome' color='lightcoral' onPress={()=>this.pauseSong()} />
         <Icon reverse name='stop-circle-o' type='font-awesome' color='lightcoral' onPress={()=>this.resumeSong()} />
         </View>
        

        </View>
        
        </View>
      );
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
        fontSize:18
    },
    songArtists:{
        color:'green',
        fontSize:14
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
  
  export default SimpleApp = StackNavigator({
    Home: { screen: SongsListComponent },
    chat: { screen: ChatScreen },
  });