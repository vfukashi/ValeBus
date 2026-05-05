import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar, ActivityIndicator } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { styles } from '../styles/DetailStyles';

// ⚠️ Mesmo IP que você usa no login/cadastro
const API_URL = 'http://10.0.2.2:3000';

export default function LineDetailScreen() {
  const router = useRouter();
  const { linhaId } = useLocalSearchParams(); // ← recebe o ID passado pela Home

  const [isFavorite, setIsFavorite] = useState(false);
  const [linha, setLinha] = useState(null);
  const [loading, setLoading] = useState(true);
  const [diaSelecionado, setDiaSelecionado] = useState('semana');

  useEffect(() => {
    if (linhaId) buscarDadosLinha();
  }, [linhaId]);

  async function buscarDadosLinha() {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/linhas/${linhaId}`);
      const data = await response.json();
      setLinha(data);
    } catch (error) {
      console.error('Erro ao buscar linha:', error);
    } finally {
      setLoading(false);
    }
  }

  // Filtra os horários pelo dia selecionado
  function horariosDoTipo(subLinha, tipo) {
    return subLinha.horarios.filter(h => h.dia_tipo === tipo);
  }

  // Formata o horario de TIME do MySQL (ex: "06:55:00" → "06:55")
  function formatarHorario(horario) {
    return horario.substring(0, 5);
  }

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center' }]}>
        <ActivityIndicator size="large" color="#A1BF34" />
      </View>
    );
  }

  if (!linha) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text>Linha não encontrada.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color="#FFF" />
        </TouchableOpacity>

        {/* Nome dinâmico vindo do banco */}
        <Text style={styles.lineTitle}>
          {linha.codigo} - {linha.nome}
        </Text>

        <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)}>
          <FontAwesome5
            name="star"
            solid={isFavorite}
            size={24}
            color={isFavorite ? "#A1BF34" : "#FFF"}
          />
        </TouchableOpacity>
      </View>

      {/* Abas de dia */}
      <View style={styles.tabContainer}>
        {[
          { tipo: 'semana', label: 'Seg - Sex' },
          { tipo: 'sabado', label: 'Sábado' },
          { tipo: 'domingo_feriado', label: 'Dom / Fer' },
        ].map(({ tipo, label }) => (
          <TouchableOpacity
            key={tipo}
            style={[styles.tab, diaSelecionado === tipo && styles.tabAtiva]}
            onPress={() => setDiaSelecionado(tipo)}
          >
            <Text style={styles.tabTexto}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Substitua o bloco do ScrollView e adicione os novos styles */}

      <ScrollView>
        {/* Card do Mapa */}
        <View style={styles.mapCard}>
          <View style={styles.mapPlaceholder}>
            <FontAwesome5 name="map-marked-alt" size={24} color="#1A4019" />
            <Text style={styles.mapLabel}>Mapa da Rota</Text>
          </View>
          <Text style={styles.mapCaption}>
            Visualize os pontos de parada e o trajeto completo
          </Text>
        </View>

        {/* Card de Horários */}
        <View style={styles.scheduleCard}>
          {/* Abas */}
          <View style={styles.tabContainer}>
            {[
              { tipo: 'semana', label: 'Seg – Sex' },
              { tipo: 'sabado', label: 'Sábado' },
              { tipo: 'domingo_feriado', label: 'Dom / Fer' },
            ].map(({ tipo, label }) => (
              <TouchableOpacity
                key={tipo}
                style={[styles.tab, diaSelecionado === tipo && styles.tabAtiva]}
                onPress={() => setDiaSelecionado(tipo)}
              >
                <Text style={[styles.tabTexto, diaSelecionado === tipo && styles.tabTextoAtivo]}>
                  {label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Sub-linhas */}
          {linha.sub_linhas.map((subLinha, index) => (
            <View
              key={subLinha.id}
              style={[styles.subLinhaSection, index > 0 && styles.subLinhaBorder]}
            >
              <View style={styles.subLinhaHeader}>
                <Text style={styles.subLinhaCodigo}>{subLinha.codigo}</Text>
                <Text style={styles.subLinhaOrigem}>{subLinha.origem}</Text>
                <View style={styles.sentidoBadge}>
                  <Text style={styles.sentidoTexto}>{subLinha.sentido}</Text>
                </View>
              </View>

              {horariosDoTipo(subLinha, diaSelecionado).map((h, i) => (
                <View key={i} style={styles.horarioRow}>
                  <Text style={styles.horarioTime}>{formatarHorario(h.horario)}</Text>
                  {h.observacao ? (
                    <Text style={styles.horarioObs}>{h.observacao}</Text>
                  ) : null}
                </View>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}