import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { styles } from '../styles/HomeStyles';

export default function HomeScreen() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [linhas, setLinhas] = useState([]);
  const [loading, setLoading] = useState(false);

  const carregarDados = async (termo = '') => {
    setLoading(true);
    try {
      // IP 10.0.2.2 é OBRIGATÓRIO para quem usa Android Studio Emulator
      const response = await fetch(`http://10.0.2.2:3000/buscar?q=${termo}`);

      if (!response.ok) throw new Error("Erro no servidor");

      const data = await response.json();
      setLinhas(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log("Erro ao conectar: ", error.message);
      setLinhas([]);
    } finally {
      setLoading(false); // GARANTE que o círculo pare de girar
    }
  };

  useEffect(() => { carregarDados(); }, []);

  useEffect(() => {
    const delay = setTimeout(() => carregarDados(search), 500);
    return () => clearTimeout(delay);
  }, [search]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#FFF' }}>
          Vale<Text style={{ color: '#A1BF34' }}>Bus</Text>
        </Text>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#648C20" style={{ marginRight: 10 }} />
          <TextInput
            placeholder="Buscar linha ou destino..."
            style={{ flex: 1, height: '100%' }}
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>

      <ScrollView style={{ padding: 20 }}>
        {loading ? (
          <ActivityIndicator size="large" color="#A1BF34" style={{ marginTop: 50 }} />
        ) : (
          linhas.map((item) => (
            <TouchableOpacity key={item.id.toString()} style={styles.lineCard}>
              <View style={styles.circleNumber}>
                <Text style={{ color: '#FFF', fontWeight: 'bold' }}>{item.numero_linha}</Text>
              </View>
              <View style={{ flex: 1, marginLeft: 15 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Linha {item.numero_linha}</Text>
                <Text style={{ color: '#666' }}>{item.nome_linha}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#CCC" />
            </TouchableOpacity>
          ))
        )}
        {!loading && linhas.length === 0 && (
          <Text style={{ textAlign: 'center', color: '#999', marginTop: 40 }}>Nenhuma linha encontrada.</Text>
        )}
      </ScrollView>
    </View>
  );
}