import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StatusBar } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { styles } from '../styles/AlertStyles';
import { useRouter } from 'expo-router';

export default function AlertScreen() {
  const router = useRouter();

  // Simulando os dados que virão da sua API
  const alertas = [
    {
      id: '1',
      titulo: 'Linha 100 está atrasada',
      msg: 'O ônibus para Eldorado está atrasado em 15 minutos',
      status: 'ATRASADO',
      corStatus: '#D9534F',
      tipo: 'error'
    },
    {
      id: '2',
      titulo: 'Rota de Linha 305 cancelada',
      msg: 'O ônibus para Eldorado está atrasado em 15 minutos',
      status: 'CANCELADA',
      corStatus: '#D9534F',
      tipo: 'error'
    },
    {
      id: '3',
      titulo: 'Greve programada para amanhã',
      msg: 'Uma paralisação geral dos motoristas de ônibus está programada para amanhã a partir das 6:00',
      status: 'AVISO',
      corStatus: '#F0AD4E',
      tipo: 'warning'
    }
  ];

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.iconContainer}>
        <MaterialIcons 
          name={item.tipo === 'error' ? "error" : "warning"} 
          size={30} 
          color={item.tipo === 'error' ? "#D9534F" : "#F0AD4E"} 
        />
      </View>
      
      <View style={styles.infoContainer}>
        <Text style={[styles.cardTitle, item.tipo === 'warning' && styles.titleYellow]}>
          {item.titulo}
        </Text>
        <Text style={styles.cardDescription}>{item.msg}</Text>
      </View>

      <View style={[styles.tag, { backgroundColor: item.corStatus }]}>
        <Text style={styles.tagText}>{item.status}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Alertas</Text>
      </View>

      <FlatList
        data={alertas}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={() => (
          // Esse é o card branco grande do seu Figma caso não tenha alertas
          <View style={{backgroundColor: '#FFF', padding: 40, borderRadius: 20, alignItems: 'center', marginTop: 50}}>
            <MaterialIcons name="warning" size={80} color="#CCC" />
            <Text style={{fontSize: 20, fontWeight: 'bold', marginTop: 20}}>Nenhum alerta no momento</Text>
            <Text style={{textAlign: 'center', color: '#666', marginTop: 10}}>Você está atualizado sobre suas linhas de ônibus.</Text>
          </View>
        )}
      />
    </View>
  );
}