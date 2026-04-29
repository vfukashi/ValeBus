import React from 'react';
import { View, Text, StatusBar } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { styles } from '../styles/FavoriteStyles';
import { COLORS } from '../styles/colors';

export default function FavoriteScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Favoritos</Text>
      </View>

      <View style={styles.content}>
        {/* Estrela grande igual ao Figma */}
        <FontAwesome5 name="star" size={100} color="#D1D1D1" />
        
        <Text style={styles.emptyText}>Você ainda não tem favoritos</Text>
        <Text style={styles.subText}>
          Adicione linhas para acesso rápido
        </Text>
      </View>
    </View>
  );
}