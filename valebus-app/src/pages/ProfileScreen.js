import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { styles } from '../styles/ProfileStyles';

export default function ProfileScreen() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const savedUser = await AsyncStorage.getItem('@valebus:user');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error("Erro ao carregar perfil:", error);
      } finally {
        setLoading(false);
      }
    };
    loadUserData();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('@valebus:user');
    setUser(null);
    router.replace('/login');
  };

  if (loading) {
    return (
      <View style={styles.mainContainer}>
        <ActivityIndicator size="large" color="#A1BF34" style={{ marginTop: 50 }} />
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="light-content" />
      <View style={styles.topBackground} />
      
      <View style={styles.header}>
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarText}>
            {user?.nome ? user.nome.charAt(0).toUpperCase() : '?'}
          </Text>
        </View>
        <Text style={styles.userName}>{user?.nome || 'Visitante'}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Minhas Informações</Text>
        
        {user ? (
          <>
            <View style={styles.infoRow}>
              <Text style={styles.label}>E-MAIL</Text>
              <Text style={styles.value}>{user.email}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>TIPO DE CONTA</Text>
              <Text style={[styles.value, { color: '#A1BF34', fontWeight: 'bold' }]}>
                {user.is_premium ? 'Premium' : 'Gratuita'}
              </Text>
            </View>
          </>
        ) : (
          <View style={styles.noUserContainer}>
            <Text style={styles.noUserText}>Você não está conectado.</Text>
            <TouchableOpacity style={styles.loginSmallButton} onPress={() => router.push('/login')}>
              <Text style={styles.loginSmallText}>Fazer Login agora</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {user && (
        <View style={styles.buttonArea}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Sair da Conta</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}