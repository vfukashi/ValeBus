import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  ActivityIndicator, TextInput, FlatList, LayoutAnimation, Platform, UIManager
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../styles/HomeStyles';
const API_URL = 'http://10.0.2.2:3000';
 
// Habilita animação no Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
 
const RECENTES_KEY = '@valebus:linhas_recentes';
const MAX_RECENTES = 5;
const LIMITE_VISIVEIS = 3; // ← quantas aparecem por padrão
 
// ─── Helpers de horário ────────────────────────────────────────────────────
 
function getDiaTipo() {
  const agora = new Date(
    new Date().toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' })
  );
  const diaSemana = agora.getDay();
  if (diaSemana === 0) return 'domingo_feriado';
  if (diaSemana === 6) return 'sabado';
  if ([2, 3, 5].includes(diaSemana)) return ['semana', 'ter_qua_sex'];
  return 'semana';
}
 
function toMinutos(horarioStr) {
  const [h, m] = horarioStr.split(':').map(Number);
  return h * 60 + m;
}
 
function getAgora() {
  const agora = new Date(
    new Date().toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' })
  );
  const h = String(agora.getHours()).padStart(2, '0');
  const m = String(agora.getMinutes()).padStart(2, '0');
  return `${h}:${m}`;
}
 
function calcularHorarios(horariosLinha) {
  const diaTipo = getDiaTipo();
  const agoraMin = toMinutos(getAgora());
 
  const horariosHoje = horariosLinha.filter(h => {
    if (Array.isArray(diaTipo)) return diaTipo.includes(h.dia_tipo);
    return h.dia_tipo === diaTipo;
  });
 
  if (horariosHoje.length === 0) return { proximo: null, ultimo: null };
 
  const minutosHoje = horariosHoje
    .map(h => toMinutos(h.horario))
    .sort((a, b) => a - b);
 
  const proximoMin = minutosHoje.find(m => m > agoraMin) ?? null;
  const ultimoMin = minutosHoje[minutosHoje.length - 1];
 
  const fmt = min => {
    if (min === null) return null;
    return `${String(Math.floor(min / 60)).padStart(2, '0')}:${String(min % 60).padStart(2, '0')}`;
  };
 
  return { proximo: fmt(proximoMin), ultimo: fmt(ultimoMin) };
}
 
// ─── Componente principal ──────────────────────────────────────────────────
 
export default function HomeScreen() {
  const router = useRouter();
 
  const [todasLinhas, setTodasLinhas] = useState([]);
  const [linhasRecentes, setLinhasRecentes] = useState([]);
  const [horariosCache, setHorariosCache] = useState({});
  const [busca, setBusca] = useState('');
  const [resultadosBusca, setResultadosBusca] = useState([]);
  const [loadingHome, setLoadingHome] = useState(true);
  const [expandido, setExpandido] = useState(false); // ← controla o "Ver mais"
 
  useEffect(() => {
    Promise.all([buscarTodasLinhas(), carregarRecentes()]);
  }, []);
 
  useEffect(() => {
    linhasRecentes.forEach(linha => {
      if (!horariosCache[linha.id]) {
        buscarHorarios(linha.id);
      }
    });
  }, [linhasRecentes]);
 
  // ── Dados ────────────────────────────────────────────────────────────────
 
  async function buscarTodasLinhas() {
    try {
      const res = await fetch(`${API_URL}/linhas`);
      const data = await res.json();
      setTodasLinhas(data);
    } catch (e) {
      console.error('Erro ao buscar linhas:', e);
    } finally {
      setLoadingHome(false);
    }
  }
 
  async function buscarHorarios(linhaId) {
    try {
      const res = await fetch(`${API_URL}/linhas/${linhaId}/horarios`);
      const data = await res.json();
      setHorariosCache(prev => ({ ...prev, [linhaId]: data }));
    } catch (e) {
      console.error(`Erro ao buscar horários da linha ${linhaId}:`, e);
    }
  }
 
  // ── Recentes ─────────────────────────────────────────────────────────────
 
  async function carregarRecentes() {
    try {
      const raw = await AsyncStorage.getItem(RECENTES_KEY);
      setLinhasRecentes(raw ? JSON.parse(raw) : []);
    } catch (e) {
      console.error('Erro ao carregar recentes:', e);
    }
  }
 
  async function salvarRecente(linha) {
    try {
      const raw = await AsyncStorage.getItem(RECENTES_KEY);
      let recentes = raw ? JSON.parse(raw) : [];
      recentes = recentes.filter(r => r.id !== linha.id);
      recentes.unshift({ id: linha.id, codigo: linha.codigo, nome: linha.nome });
      if (recentes.length > MAX_RECENTES) recentes = recentes.slice(0, MAX_RECENTES);
      await AsyncStorage.setItem(RECENTES_KEY, JSON.stringify(recentes));
      setLinhasRecentes(recentes);
    } catch (e) {
      console.error('Erro ao salvar recente:', e);
    }
  }
 
  // ── Busca ─────────────────────────────────────────────────────────────────
 
  const handleBusca = useCallback(
    (texto) => {
      setBusca(texto);
      if (!texto.trim()) {
        setResultadosBusca([]);
        return;
      }
      const q = texto.toLowerCase();
      setResultadosBusca(
        todasLinhas.filter(
          l => l.codigo.toLowerCase().includes(q) || l.nome.toLowerCase().includes(q)
        )
      );
    },
    [todasLinhas]
  );
 
  function handleSelecionarLinha(linha) {
    setBusca('');
    setResultadosBusca([]);
    salvarRecente(linha);
    router.push({ pathname: '/line-details', params: { linhaId: linha.id } });
  }
 
  // ── Toggle expandir ───────────────────────────────────────────────────────
 
  function toggleExpandir() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandido(prev => !prev);
  }
 
  // ── Card de linha recente ─────────────────────────────────────────────────
 
  function renderCardRecente(linha, index, isExtra = false) {
    const horarios = horariosCache[linha.id]
      ? calcularHorarios(horariosCache[linha.id])
      : { proximo: null, ultimo: null };
 
    return (
<TouchableOpacity
        key={linha.id}
        style={[styles.lineCard, isExtra && styles.lineCardExtra]}
        onPress={() => handleSelecionarLinha(linha)}
        activeOpacity={0.75}
>
<View style={styles.circleNumber}>
<Text style={styles.circleNumberText}>{linha.codigo}</Text>
</View>
 
        <View style={{ flex: 1 }}>
<Text style={styles.lineCardTitle}>
            {linha.codigo} — {linha.nome}
</Text>
<View style={styles.lineCardSubRow}>
<Ionicons name="time-outline" size={12} color="#555" />
<Text style={styles.lineCardSub}>
              {horarios.proximo ? `Próximo: ${horarios.proximo}` : 'Sem horários hoje'}
</Text>
</View>
</View>
 
        {horarios.ultimo && (
<View style={styles.lineCardUltimo}>
<Text style={styles.lineCardUltimoLabel}>Último</Text>
<Text style={styles.lineCardUltimoHora}>{horarios.ultimo}</Text>
</View>
        )}
</TouchableOpacity>
    );
  }
 
  // ── JSX ───────────────────────────────────────────────────────────────────
 
  const visiveis = linhasRecentes.slice(0, LIMITE_VISIVEIS);
  const extras = linhasRecentes.slice(LIMITE_VISIVEIS);
  const temMais = extras.length > 0;
 
  return (
<View style={styles.container}>
 
      {/* Header */}
<View style={styles.header}>
<View style={styles.headerTop}>
<View style={styles.logoRow}>
<View style={styles.logoCircle}>
<Text style={styles.logoCircleText}>VB</Text>
</View>
<Text style={styles.logoText}>
              Vale<Text style={styles.logoAccent}>Bus</Text>
</Text>
</View>
</View>
 
        {/* Barra de busca */}
<View style={styles.searchBar}>
<Ionicons name="search-outline" size={18} color="#A1BF34" />
<TextInput
            style={styles.searchInput}
            placeholder="Buscar linha ou destino..."
            placeholderTextColor="#8aab8a"
            value={busca}
            onChangeText={handleBusca}
            returnKeyType="search"
            autoCorrect={false}
            autoCapitalize="characters"
          />
          {busca.length > 0 && (
<TouchableOpacity onPress={() => { setBusca(''); setResultadosBusca([]); }}>
<Ionicons name="close-circle" size={18} color="#8aab8a" />
</TouchableOpacity>
          )}
</View>
</View>
 
      {/* Dropdown de busca */}
      {resultadosBusca.length > 0 && (
<View style={styles.searchDropdown}>
<FlatList
            data={resultadosBusca}
            keyExtractor={item => String(item.id)}
            keyboardShouldPersistTaps="handled"
            renderItem={({ item }) => (
<TouchableOpacity
                style={styles.searchResultItem}
                onPress={() => handleSelecionarLinha(item)}
>
<View style={styles.searchResultCircle}>
<Text style={styles.searchResultCodigo}>{item.codigo}</Text>
</View>
<Text style={styles.searchResultNome}>{item.nome}</Text>
<Ionicons name="chevron-forward" size={16} color="#aaa" />
</TouchableOpacity>
            )}
          />
</View>
      )}
 
      {/* Corpo */}
<ScrollView style={styles.body} keyboardShouldPersistTaps="handled">
        {loadingHome ? (
<ActivityIndicator size="large" color="#A1BF34" style={{ marginTop: 40 }} />
        ) : linhasRecentes.length > 0 ? (
<>
            {/* Cabeçalho da seção */}
<View style={styles.sectionHeader}>
<Text style={styles.sectionTitle}>Linhas frequentes</Text>
              {temMais && (
<TouchableOpacity onPress={toggleExpandir} style={styles.verMaisBtn}>
<Text style={styles.sectionLink}>
                    {expandido ? 'Ver menos' : 'Ver mais'}
</Text>
<Ionicons
                    name={expandido ? 'chevron-up' : 'chevron-down'}
                    size={14}
                    color="#A1BF34"
                  />
</TouchableOpacity>
              )}
</View>
 
            {/* 3 primeiras sempre visíveis */}
            {visiveis.map((linha, i) => renderCardRecente(linha, i))}
 
            {/* Extras — aparecem ao expandir */}
            {expandido && extras.length > 0 && (
<View style={styles.extrasContainer}>
<View style={styles.extrasDivider} />
                {extras.map((linha, i) => renderCardRecente(linha, i, true))}
</View>
            )}
</>
        ) : (
<View style={styles.emptyState}>
<Ionicons name="bus-outline" size={48} color="#A1BF34" />
<Text style={styles.emptyTitle}>Nenhuma linha recente</Text>
<Text style={styles.emptySubtitle}>
              Use a busca acima para encontrar sua linha e ela aparecerá aqui.
</Text>
</View>
        )}
</ScrollView>
</View>
  );
}