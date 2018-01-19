import React, { Component } from 'react';
import { StyleSheet, View, Text,ProgressBar,Image } from 'react-native';
import { SearchBar,Card, ListItem, Button,Icon,Slider  } from 'react-native-elements';
import Sound from 'react-native-sound';
export default class NowPlayingComponent extends Component{

    static navigationOptions = ({ navigation }) => ({
        //title: `Chat with ${navi25gation.state.params.songDetails.song}`,
        title:'Now Playing'
      });

componentWillUnmount(){
   
        this.stopSong();
  
}

clear(){
 
}
    state={
        playStatus:'Fetching Song...........',
        sound:undefined,
        progress:0,
        timeElapsed:0,
        pausedAt:0,
        songDuration:0,
        time:'',
        playlistIndex:0,
        buttonType:'play',
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
            this.sound.stop(()=>{
                this.sound.release();
            });
            this.setState({progress:0});
            this.sound.setCurrentTime(0);
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

      _checkPlayStatus(){
        console.log('inside checkplaystatus');
        console.log(this.state.playStatus);
        if(this.state.playStatus == 'Paused'){
            //this.state.buttonType = 'play';
           // this.setState({buttonType:'play'})
            this.resumeSong();
            console.log('inside now paused')
        }else if(this.state.playStatus == 'Playing'){
            //this.state.buttonType = 'pause';
            //this.setState({buttonType:'pause'})
            this.pauseSong();
            console.log('inside now playing')
        }else if(this.state.playStatus == 'Stopped'){
            if(this.sound != null){
                this.sound.stop(()=>{
                    this.sound.release();
                })
                const { params } = this.props.navigation.state;
                this._loadAudio(params.songDetails);
              }
        }
        //console.log(this.state.buttonType,'butto')
    }

      _loadAudio = (obj) => {
        //console.log(obj.song);
        console.log(this.state.playStatus,'before fetch');

            this.sound = new Sound(obj.path,
                undefined,
                (error) => {
                  if (error) {
                    console.log(error);
                  } else {
                    //console.log('Playing sound');
                    console.log(obj.song,'playing this');
                    console.log(this.sound.getDuration());
                    this.setState({songDuration:Math.floor(this.sound.getDuration())});
                    this.setState({playStatus:'Playing'});
                    this.setState({buttonType:'pause'})
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


      componentWillMount(){
        const { params } = this.props.navigation.state;
        this._loadAudio(params.songDetails);
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
          <Text style={{color:'lightcoral',fontSize:20,marginLeft:5}}>{params.songDetails.title}</Text>
          <Text style={{color:'lightcoral',fontSize:16,marginLeft:5}}>{params.songDetails.author}</Text>
          <Text style={{color:'black',fontSize:16,marginLeft:5}}>{params.songDetails.album}</Text>
          
          <View style={{justifyContent:'center',alignItems:'center'}}>
          <Image style={{width:300, height:300}} source={{uri:params.songDetails.cover}}/>
          

          </View>
          <View style={{flex: 1, alignItems: 'stretch', justifyContent: 'center',marginLeft:5,marginRight:5,marginTop:10}}>
          {  <Slider value={this.state.progress} minimumTrackTintColor="lightcoral" thumbTintColor="lightcoral" onValueChange={(value) => {
              console.log(value);
              let x = value*this.state.songDuration;
              console.log(x);
              this.sound.setCurrentTime(x);
              }} />}
              <Text>{this.state.playStatus}</Text>
              <Text>{Math.floor(this.state.songDuration/60)}:{(this.state.songDuration%60)}</Text>
        </View>
          <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginBottom:30}}>
          <Icon reverse name={this.state.buttonType} type='font-awesome' color='lightcoral' onPress={()=>this._checkPlayStatus()} />
         <Icon reverse name='stop-circle-o' type='font-awesome' color='lightcoral' onPress={()=>this.stopSong()} />
         </View>
        

        </View>
        
        </View>
      );
    }

    componentWillUnMount(){
        if(this.sound != null){
            this.sound.stop();
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