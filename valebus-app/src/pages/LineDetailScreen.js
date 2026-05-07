import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../styles/DetailStyles';

const API_URL = 'http://10.0.2.2:3000';
// const API_URL = 'http://192.168.1.6:3000'; // celular físico

export default function LineDetailScreen() {
  const router = useRouter();
  const { linhaId } = useLocalSearchParams();

  const [linha, setLinha]                   = useState(null);
  const [loading, setLoading]               = useState(true);
  const [diaSelecionado, setDiaSelecionado] = useState('semana');

  const [usuario, setUsuario]       = useState(null);
  const [favoritado, setFavoritado] = useState(false);
  const [salvando, setSalvando]     = useState(false);

  // Carrega usuário logado e verifica se já é favorito
  useEffect(() => {
    AsyncStorage.getItem('@valebus:user').then(data => {
      if (!data) return;
      const user = JSON.parse(data);
      setUsuario(user);

      fetch(`${API_URL}/favoritos/ids?usuario_id=${user.id}&linha_id=${linhaId}`)
        .then(r => r.json())
        .then(res => setFavoritado(res.favoritado === true))
        .catch(() => {});
    });
  }, [linhaId]);

  // Busca dados da linha
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

  // Favoritar / desfavoritar
  async function toggleFavorito() {
    if (!usuario) {
      Alert.alert('Atenção', 'Você precisa estar logado para favoritar uma linha.');
      return;
    }
    if (salvando) return;

    const eraFavoritado = favoritado;
    setFavoritado(!eraFavoritado);
    setSalvando(true);

    try {
      const response = await fetch(`${API_URL}/favoritos`, {
        method: eraFavoritado ? 'DELETE' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          usuario_id: usuario.id,
          linha_id: Number(linhaId),
        }),
      });

      if (!response.ok) throw new Error();
    } catch {
      setFavoritado(eraFavoritado); // reverte em caso de erro
    } finally {
      setSalvando(false);
    }
  }

  function horariosDoTipo(subLinha, tipo) {
    return subLinha.horarios.filter(h => h.dia_tipo === tipo);
  }

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

        <Text style={styles.lineTitle}>
          {linha.codigo} - {linha.nome}
        </Text>

        <TouchableOpacity onPress={toggleFavorito} disabled={salvando}>
          <FontAwesome5
            name="star"
            solid={favoritado}
            size={24}
            color={favoritado ? '#A1BF34' : '#FFF'}
          />
        </TouchableOpacity>
      </View>

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
          <View style={styles.tabContainer}>
            {[
              { tipo: 'semana',          label: 'Seg – Sex' },
              { tipo: 'sabado',          label: 'Sábado'    },
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

              {horariosDoTipo(subLinha, diaSelecionado).length === 0 ? (
                <Text style={{ color: '#8FA89C', fontSize: 13, marginTop: 8 }}>
                  Sem horários para este dia.
                </Text>
              ) : (
                horariosDoTipo(subLinha, diaSelecionado).map((h, i) => (
                  <View key={i} style={styles.horarioRow}>
                    <Text style={styles.horarioTime}>{formatarHorario(h.horario)}</Text>
                    {h.observacao ? (
                      <Text style={styles.horarioObs}>{h.observacao}</Text>
                    ) : null}
                  </View>
                ))
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}