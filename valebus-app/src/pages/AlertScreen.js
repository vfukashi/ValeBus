import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import styles from '../styles/AlertStyles';

// ─── IP do backend (igual ao restante do projeto) ─────────────────────────────
const API_URL = 'http://10.0.2.2:3000'; // emulador Android Studio
// const API_URL = 'http://192.168.1.6:3000'; // celular físico

// ─── Config visual por tipo ───────────────────────────────────────────────────

const CONFIG_TIPO = {
  atrasado: {
    iconName: 'warning',
    iconColor: '#FF4444',
    iconBg: '#FFE5E5',
    tituloColor: '#FF4444',
    badge: { label: 'ATRASADO', cor: '#FF4444' },
  },
  cancelado: {
    iconName: 'close-circle',
    iconColor: '#FF4444',
    iconBg: '#FFE5E5',
    tituloColor: '#FF4444',
    badge: { label: 'CANCELADA', cor: '#FF4444' },
  },
  aviso: {
    iconName: 'warning-outline',
    iconColor: '#E6A817',
    iconBg: '#FFF8E1',
    tituloColor: '#E6A817',
    badge: { label: 'AVISO', cor: '#E6A817' },
  },
  info: {
    iconName: 'information-circle-outline',
    iconColor: '#A1BF34',
    iconBg: '#F0F5DC',
    tituloColor: '#1A4019',
    badge: { label: 'INFO', cor: '#A1BF34' },
  },
};

// ─── Formata o tempo decorrido desde criado_em ────────────────────────────────

function formatarTempo(criadoEm) {
  if (!criadoEm) return null;
  const diff = Math.floor((Date.now() - new Date(criadoEm).getTime()) / 1000);
  if (diff < 60) return 'agora mesmo';
  if (diff < 3600) return `há ${Math.floor(diff / 60)} min`;
  if (diff < 86400) return `há ${Math.floor(diff / 3600)} hora${Math.floor(diff / 3600) > 1 ? 's' : ''}`;
  return `há ${Math.floor(diff / 86400)} dia${Math.floor(diff / 86400) > 1 ? 's' : ''}`;
}

// ─── Card individual ──────────────────────────────────────────────────────────

function CardAlerta({ alerta, onDismiss }) {
  const cfg = CONFIG_TIPO[alerta.tipo] || CONFIG_TIPO.info;

  return (
    <View style={styles.card}>
      <View style={[styles.cardBarra, { backgroundColor: cfg.iconColor }]} />

      <View style={styles.cardConteudo}>
        <View style={styles.cardTopo}>
          <View style={[styles.iconWrap, { backgroundColor: cfg.iconBg }]}>
            <Ionicons name={cfg.iconName} size={20} color={cfg.iconColor} />
          </View>

          <View style={styles.cardTextos}>
            <Text style={[styles.cardTitulo, { color: cfg.tituloColor }]} numberOfLines={2}>
              {alerta.titulo}
            </Text>
            {alerta.linha && (
              <Text style={styles.cardLinha}>{alerta.linha}</Text>
            )}
          </View>

          {cfg.badge && (
            <View style={[styles.badge, { backgroundColor: cfg.badge.cor }]}>
              <Text style={styles.badgeTexto}>{cfg.badge.label}</Text>
            </View>
          )}
        </View>

        <Text style={styles.cardDescricao}>{alerta.descricao}</Text>

        <View style={styles.cardRodape}>
          {alerta.criado_em && (
            <View style={styles.horarioRow}>
              <Ionicons name="time-outline" size={12} color="#8FA89C" />
              <Text style={styles.horarioTexto}>{formatarTempo(alerta.criado_em)}</Text>
            </View>
          )}
          <TouchableOpacity onPress={() => onDismiss(alerta.id)} style={styles.btnDismiss}>
            <Ionicons name="close" size={14} color="#8FA89C" />
            <Text style={styles.btnDismissTexto}>Dispensar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

// ─── Tela principal ───────────────────────────────────────────────────────────

export default function AlertsScreen() {
  const router = useRouter();
  const [alertas, setAlertas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [recarregando, setRecarregando] = useState(false);
  const [erro, setErro] = useState(null);

  const buscarAlertas = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRecarregando(true);
    else setCarregando(true);
    setErro(null);

    try {
      const response = await fetch(`${API_URL}/alertas`);
      if (!response.ok) throw new Error('Erro ao buscar alertas.');
      const data = await response.json();
      setAlertas(data);
    } catch (e) {
      setErro('Não foi possível carregar os alertas. Verifique sua conexão.');
    } finally {
      setCarregando(false);
      setRecarregando(false);
    }
  }, []);

  useEffect(() => {
    buscarAlertas();
  }, [buscarAlertas]);

  const dispensarAlerta = async (id) => {
    // Remove da lista imediatamente (otimista)
    setAlertas(prev => prev.filter(a => a.id !== id));

    try {
      await fetch(`${API_URL}/alertas/${id}/desativar`, { method: 'PATCH' });
    } catch (e) {
      // Se falhar, recarrega do banco para restaurar estado correto
      buscarAlertas();
    }
  };

  const dispensarTodos = async () => {
    const ids = alertas.map(a => a.id);
    setAlertas([]);

    try {
      await Promise.all(
        ids.map(id =>
          fetch(`${API_URL}/alertas/${id}/desativar`, { method: 'PATCH' })
        )
      );
    } catch (e) {
      buscarAlertas();
    }
  };

  // ── Estado de carregamento ──
  if (carregando) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#0C2612" />
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.btnVoltar}>
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitulo}>Alertas</Text>
        </View>
        <View style={styles.loadingWrap}>
          <ActivityIndicator size="large" color="#A1BF34" />
          <Text style={styles.loadingTexto}>Buscando alertas...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0C2612" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.btnVoltar}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitulo}>Alertas</Text>
        {alertas.length > 0 && (
          <TouchableOpacity onPress={dispensarTodos} style={styles.btnLimpar}>
            <Text style={styles.btnLimparTexto}>Limpar</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Conteúdo */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={recarregando}
            onRefresh={() => buscarAlertas(true)}
            colors={['#A1BF34']}
            tintColor="#A1BF34"
          />
        }
      >
        {/* Estado de erro */}
        {erro && (
          <View style={styles.erroBox}>
            <Ionicons name="cloud-offline-outline" size={20} color="#FF4444" />
            <Text style={styles.erroTexto}>{erro}</Text>
            <TouchableOpacity onPress={() => buscarAlertas()} style={styles.btnTentar}>
              <Text style={styles.btnTentarTexto}>Tentar novamente</Text>
            </TouchableOpacity>
          </View>
        )}

        {!erro && alertas.length > 0 && (
          <>
            <View style={styles.contadorRow}>
              <View style={styles.contadorBadge}>
                <Text style={styles.contadorTexto}>{alertas.length}</Text>
              </View>
              <Text style={styles.contadorLabel}>
                {alertas.length === 1 ? 'alerta ativo' : 'alertas ativos'}
              </Text>
            </View>

            {alertas.map(alerta => (
              <CardAlerta
                key={alerta.id}
                alerta={alerta}
                onDismiss={dispensarAlerta}
              />
            ))}
          </>
        )}

        {!erro && alertas.length === 0 && (
          <View style={styles.vazio}>
            <View style={styles.vazioIcone}>
              <Ionicons name="shield-checkmark-outline" size={56} color="#A1BF34" />
            </View>
            <Text style={styles.vazioTitulo}>Nenhum alerta no momento</Text>
            <Text style={styles.vazioSubtitulo}>
              Você está atualizado sobre suas{'\n'}linhas de ônibus.
            </Text>
          </View>
        )}

        <View style={styles.notaBox}>
          <Ionicons name="information-circle-outline" size={16} color="#A1BF34" />
          <Text style={styles.notaTexto}>
            Puxe a tela para baixo para atualizar. Alertas dispensados não aparecem novamente.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}