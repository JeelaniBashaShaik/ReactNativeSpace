import React, { Component } from 'react';
import { StyleSheet,Text,View,Image } from 'react-native';
import { Card, ListItem, Button } from 'react-native-elements';
import Echarts from 'native-echarts';
const option = {
    title: {
        text: 'ECharts demo'
    },
    tooltip: {},
    legend: {
        data:['销量']
    },
    xAxis: {
        data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
    },
    yAxis: {},
    series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
    }]
  };

class WeatherComponent extends Component<{}>{

   state = {
    weatherTempGtl:'',
    weatherCityGtl:'',
    iconUrlGtl:'',
    conditionGtl:'',
    weatherTempChn:'',
    weatherCityChn:'',
    iconUrlChn:'',
    conditionChn:'',
    weatherList:[]

   }

   
    componentWillMount(){
        this.fetchGtlWeather();
        this.fetchChennaiWeather();
        this.forecastChennai();
    }

    async fetchGtlWeather() {
        const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=guntakal&units=metric&apikey=0391eb5b9075f872d2e355a3f5ee3f1c');
        const weatherdata = await response.json();
        this.setState({
            weatherTempGtl:weatherdata.main.temp,
            weatherCityGtl:weatherdata.name,
            iconUrlGtl:'http://openweathermap.org/img/w/'+weatherdata.weather[0].icon+'.png',
            conditionGtl:weatherdata.weather[0].description    
        })  
    };

    async fetchChennaiWeather() {
        const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=chennai&units=metric&apikey=0391eb5b9075f872d2e355a3f5ee3f1c');
        const weatherdata = await response.json();
        this.setState({
            weatherTempChn:weatherdata.main.temp,
            weatherCityChn:weatherdata.name,
            iconUrlChn:'http://openweathermap.org/img/w/'+weatherdata.weather[0].icon+'.png',
            conditionChn:weatherdata.weather[0].description    
        })  
    };

    async forecastChennai(){
        const response = await fetch('https://api.openweathermap.org/data/2.5/forecast?id=1264527&apikey=0391eb5b9075f872d2e355a3f5ee3f1c&units=metric');
        const weatherdata = await response.json();
        //console.log(weatherdata);
        this.setState({weatherList:weatherdata.list});
        console.log(this.state.weatherList);
    }
    
    render(){
        return(
            <View>
                <Text style={styles.header}>Weather</Text>
                <Card>
                    <Text style={styles.city}>{this.state.weatherCityGtl}</Text>
                    <View style={styles.style1}>
                    <Image style={{width:50, height:50}} source={{uri:this.state.iconUrlGtl}}/>
                    <Text style={styles.temperature}>{this.state.weatherTempGtl}&#8451;</Text>
                    </View>
                    <Text>{this.state.conditionGtl}</Text>
                </Card>
                <Card>
                    <Text style={styles.city}>{this.state.weatherCityChn}</Text>
                    <View style={styles.style1}>
                    <Image style={{width:50, height:50}} source={{uri:this.state.iconUrlChn}}/>
                    <Text style={styles.temperature}>{this.state.weatherTempChn}&#8451;</Text>
                    </View>
                    <Text>{this.state.conditionChn}</Text>
                </Card>
                <Echarts option={option} height={300} />
            </View>
        )
       
    }
}

const styles = StyleSheet.create({
    icon: {
      width: 26,
      height: 26,
    },
    style1:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    header:{
        color:'black',
        fontSize:20,
        textAlign:'center',
        marginTop:15
    },
    temperature:{
        color:'lightcoral',
        fontSize:35,
        textAlign:'center',
        marginLeft:50
    },
    city:{
        color:'green',
        fontSize:18,
        textAlign:'left'
    }
  });

module.exports = WeatherComponent;