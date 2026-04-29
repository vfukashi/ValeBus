import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesome5, Ionicons } from '@expo/vector-icons'; 
import { useRouter } from 'expo-router'; // Importar o roteador
import { styles } from '../styles/HomeStyles';

export default function HomeScreen() {
  const router = useRouter(); // Inicializar o roteador

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* ... seu cabeçalho atual ... */}
        <Text style={{fontSize: 24, fontWeight: 'bold', color: '#FFF'}}>
          Vale<Text style={{color: '#A1BF34'}}>Bus</Text>
        </Text>
        {/* ... restante do cabeçalho ... */}
      </View>

      <ScrollView style={{padding: 20}}>
        <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 15}}>Linhas Frequentes</Text>

        {/* CARD CLICÁVEL */}
        <TouchableOpacity 
          style={styles.lineCard} 
          onPress={() => router.push('/line-details')} // Vai para a página de detalhes
        >
          <View style={styles.circleNumber}>
            <Text style={{color: '#FFF', fontWeight: 'bold'}}>100</Text>
          </View>
          <View>
            <Text style={{fontWeight: 'bold'}}>Linha 100</Text>
            <Text style={{fontSize: 12, color: '#666'}}>Registro ↔ Eldorado</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}