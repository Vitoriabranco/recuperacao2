import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, Button, SafeAreaView, StyleSheet, Linking } from 'react-native';
import { AppContext } from '../../scripts/appContext';
import { useNavigation } from '@react-navigation/native';
const telaPrevisao = () => {
  const { cidade, setCidade } = useContext(AppContext);
  const [tempo, setTempo] = useState();
  const navigation = useNavigation();

  const obterPrevisaoDoTempo = async () => {
    try {
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=bddbeed6a893cf7d820e74ae7f9cb95e`
      );
      const data = await response.json();
      setTempo(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  useEffect(() => {
    obterPrevisaoDoTempo();
  }, []);

  const handleNavigateToNextScreen = () => {
    
    Linking.openURL('https://example.com/next-screen');
  };
  return (
    <View style={styles.container}>

      <Button title= "Voltar para cidades" onPress={() => navigation.goBack()} /> {}

      {tempo ? (
        <View style={styles.tempoView}>
          <Text>Nome da cidade: {tempo.name}</Text>

          <Text>Temperatura atual: {tempo.main.temp}</Text>

          <Text>Velocidade do vento: {tempo.wind.speed}</Text>

          <Text>Humidade: {tempo.main.humidity}</Text>
          
          <Text>Tipo do clima: {tempo.weather[0].description}</Text>
  
        </View>
      ) : (
        <Text>Carregando previsão do tempo...</Text>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#FFFFE0', 
    padding: 20, 
    borderRadius: 10, 
    shadowColor: '#BC8F8F', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.3, 
    shadowRadius: 4, 
    margin: 30, 
    fontSize: 10,
  },

  tempoView: {
    alignSelf: 'center',
    justifyContent: 'center',
  },
});

export default telaPrevisao