import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, StyleSheet, FlatList, ActivityIndicator  } from 'react-native';
import * as Location from 'expo-location';

import Conditions from '../../components/Conditions';
import Forecast from '../../components/Forecast';
import Header from '../../components/Header';
import Menu from '../../components/Menu';

import api, { key } from '../../services/api'

export default function Home(){
    const [errorMsg, setErrorMsg] = useState(null);
    const [loading, setLoading] = useState(true);
    const [weather, setWeather] = useState([]);
    const [icon, setIcon] = useState({ name: 'cloud', color: "#FFF"});
    const [background, setBackground] = useState(['#1ed6ff', '#97c1ff']);

    useEffect(() => {
        (async () => {

            let { status } = await Location.requestPermissionsAsync();

            if (status !== 'granted'){
                setErrorMsg('Permissão negada para localização');
                setLoading(false);
                return;
            }

            let location = await Location.getCurrentPositionAsync({});

            const response = await api.get(`weather?key=${key}&lat=${location.coords.latitude}&lon=${location.coords.longitude}`);

            setWeather(response.data);
            
            if(response.data.results.curretly === "noite") {
                setBackground(['#0c3741', '#0f2f61']);
            }

            switch(response.data.results.condition_slug){
                case'clear_day':
                    setIcon({ name: 'partly-sunny', color: "#FFB300"});
                    break;
                case 'rain':
                    setIcon({ name : 'rainy', color: "#FFF"});
                    break;
                case 'storm':
                    setIcon({ name : 'rainy', color: "#FFF"});
                    break;
            }

            setLoading(false);

        })();

    }, []);

    return(
        <SafeAreaView style={styles.container}>
            {loading ? (
                <ActivityIndicator
                style={{marginTop: 10,
                    marginBottom: 20,
                    alignFelf: 'center'}}
                animating={loading}
                size="large"
                color='#1fc'
                />
            )
            :  
                <>
                <Menu/>
                <Header background={background} weather={weather} icon={icon}/>
                <Conditions weather={weather}/>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    contentContainerStyle={{ paddingBottom: "5%"}}
                    style={styles.list}
                    data={weather.results.forecast}
                    keyExtractor={item => item.date}
                    renderItem={ ({ item }) => <Forecast data={item}/>}/>
                </>
            }
        </SafeAreaView>
         
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E8F0FF',
        paddingTop: '5%'
    }, 
    list:{
        marginTop: 10,
        marginRight: 10
    }
});