import React, { useState } from 'react'; // Adicione o useState aqui
import { View, Text, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons'; 
import { useRouter } from 'expo-router';
import { styles } from '../styles/DetailStyles';

export default function LineDetailScreen() {
  const router = useRouter();
  
  // Cria uma "caixinha" para saber se está favoritado ou não
  const [isFavorite, setIsFavorite] = useState(false);

  const horários = ["06:00", "07:30", "09:15", "11:45", "13:20", "15:50", "17:10", "19:30"];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color="#FFF" />
        </TouchableOpacity>
        
        <Text style={styles.lineTitle}>Linha 100</Text>
        
        {/* BOTÃO DE FAVORITAR COM LÓGICA */}
        <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)}>
          <FontAwesome5 
            name={isFavorite ? "star" : "star"} // Pode usar "star-o" se quiser ela vazia
            solid={isFavorite} // Preenche a estrela se for favorito
            size={24} 
            color={isFavorite ? "#A1BF34" : "#FFF"} // Verde Limão se sim, Branco se não
          />
        </TouchableOpacity>
      </View>

      <ScrollView>
        {/* ... restante do código ... */}
      </ScrollView>
    </View>
  );
}