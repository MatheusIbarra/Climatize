import React, { useState } from 'react';
import { View, TouchableOpacity ,Text, StyleSheet,TextInput, SafeAreaView, Keyboard, ActivityIndicator } from 'react-native';
import {Feather} from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'

import { useNavigation } from '@react-navigation/native';

import Conditions from '../../components/Conditions';
import api, { key } from '../../services/api';

export default function Search(){
    const navigation = useNavigation();
    const [input, setInput] = useState('');
    const [city, setCity] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    async function handleSearch(){
        const response = await api.get(`weather?key=${key}&city_name=${input}`);
        if (response.data.by === 'default'){
            setError('Cidade não encontrada');
            setInput('');
            setCity(null);
            Keyboard.dismiss();
            return;
        }

        setCity(response.data);
        setInput('');
        Keyboard.dismiss();
        setLoading(false);
    }



    return(
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
                <Feather name='chevron-left' size={32} color="#000"/>
                <Text style={{fontSize: 22}}>Voltar</Text>
            </TouchableOpacity>
            <View style={styles.searchBox}>
                <TextInput vale={input} onChangeText={(value) => setInput(value)} placeholder="Ex: São Bento, PB" style={styles.input}/>
                <TouchableOpacity style={styles.icon} onPress={handleSearch}>
                    <Feather name="search" size={22} color="white"/>
                </TouchableOpacity>
            </View>
            {error && <Text style={{marginTop: 25, fontSize: 18}}>{error}</Text>}
            {city && loading &&
                <ActivityIndicator
                    style={{marginTop: 10,
                        marginBottom: 20,
                        alignFelf: 'center'}}
                    animating={loading}
                    size="large"
                    color='#1fc'
                />
            }
            {city && !loading &&
                <LinearGradient style={styles.header} colors={['#1ed6ff', '#97c1ff']}>
                    <Text style={styles.date}>{city.results.date}</Text>
                    <Text style={styles.city}>{city.results.city_name}</Text>
                    <View>
                        <Text style={styles.temp}>{city.results.temp}°</Text>
                    </View>
                    <Conditions weather={city}/>

                </LinearGradient>
            }

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        paddingTop: '10%',
        backgroundColor: '#e8f0ff'
    },
    backButton:{
        flexDirection: 'row',
        marginLeft: 15,
        alignSelf: 'flex-start',
        alignItems: 'center',
        marginBottom: 10
    },
    searchBox:{
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: "#ddd",
        width: '90%',
        height: 50,
        borderRadius: 8
    },
    input:{
        width : '85%',
        height: 50,
        backgroundColor: "#FFF",
        borderTopLeftRadius: 8,
        padding: 7,
        borderBottomLeftRadius: 8
    },
    icon:{
        width: "15%",
        height: 50,
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
        backgroundColor: "#1ed6ff",
        alignItems: 'center',
        justifyContent: "center"
    },
    header:{
        marginTop: '5%',
        width: '90%',
        paddingTop: '5%',
        paddingBottom: '5%',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 8,
    },
    date:{
        color: "#FFF",
        fontSize: 16
    },
    city:{
        fontSize: 20,
        fontWeight: 'bold',
        color: "#FFF"
    },
    temp:{
        color: "#FFF",
        fontSize: 80,
        fontWeight: 'bold'
    }

})