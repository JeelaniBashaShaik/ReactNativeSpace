import React, {Component} from 'react';
import { View, TouchableHighlight,TextInput, Text, StyleSheet,Button,Picker,ActivityIndicator } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';

export default class TranslateComponent extends Component{

    state = {
        searchQuery:'',
        queryResult:'',
        animating: true
    }


    closeActivityIndicator(){
       
            setTimeout(()=>{
                this.setState({animating:false})
            },3000)
    
    } 
        componentDidMount(){
            this.closeActivityIndicator();
        }
    render(){
        let data = [{
            value: 'Banana',
          }, {
            value: 'Mango',
          }, {
            value: 'Pear',
          }];
          const animating = this.state.animating
        return(
            <View style={styles.container}>
                <Text>Inside Translate</Text>
                <TextInput style={{height: 40}} placeholder="Type here to translate!" onChangeText={this._settt} />
                <Button
                onPress = {this._callApi}
                title = "Translate!"
                color = "green"
             />
                <Text>{this.state.queryResult}</Text>
                <Dropdown label='Favorite Fruit' data={languages} onChangeText={(index, value) => this.selectedName(index, value)} />
            <ActivityIndicator
               animating = {animating}
               color = '#bc2b78'
               size = "large"
              />
            </View>
            
        )
    }

    _settt=(text)=>{
        //console.log(text);
        this.setState({searchQuery:text});
       // console.log(this.state.searchQuery);
    }

    selectedName(value, index) {
     console.log(value,index);
     for(let i=0;i<languages.length;i++){
         if(i == index){
             this.setState({searchLanguage:languages[i].code})
         }
     }
     console.log(this.state.searchLanguage);
        }
     _callApi= (text)=>{
         console.log(this.state.searchQuery);
     fetch('https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl='+this.state.searchLanguage+'&dt=t&q='+this.state.searchQuery)
     .then((res)=>res.json())
     .then((response)=>{
        this.setState({
            queryResult:response[0][0][0]
            
        });
        alert(response[0][0][0]);
     })
     .catch(function (err){
         return err;
     })
     

     //this.setState({queryResult:text})
    }
}
const styles = StyleSheet.create ({
    container: {
       //alignItems: 'center',
    },
    text: {
       borderWidth: 1,
       padding: 25,
       borderColor: 'black',
       backgroundColor: 'red'
    }
 })

 const languages = [
    {code:'ar', value: 'Arabic'},
    {code:'bn', value: 'Bengali'},
    {code:'zh-CN', value: 'Chinese'},
    {code:'nl', value: 'Dutch'},
    {code:'fr', value: 'French'},
    {code:'de', value: 'German'},
    {code:'gu', value: 'Gujrati'},
    {code:'hi', value: 'Hindi'},
    {code:'id', value: 'Indonesia'},
    {code:'kn', value: 'Kannada'},
    {code:'ml', value: 'Malyalam'},
    {code:'mr', value: 'Marathi'},
    {code:'fa', value: 'Persian'},
    {code:'pa', value: 'Punjabi'},
    {code:'es', value: 'Spanish'},
    {code:'ta', value: 'Tamil'},
    {code:'te', value: 'Telugu'},
    {code:'ur', value: 'Urdu'}
    
  ];
module.exports = TranslateComponent;