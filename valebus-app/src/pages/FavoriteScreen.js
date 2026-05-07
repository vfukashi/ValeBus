import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useRouter, useFocusEffect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/FavoriteStyles';

const API_URL = 'http://10.0.2.2:3000';
// const API_URL = 'http://192.168.1.6:3000'; // celular físico

// ─── Card de linha favorita ───────────────────────────────────────────────────

function CardFavorito({ item, onRemover, onVerDetalhes }) {
  function confirmarRemocao() {
    Alert.alert(
      'Remover favorito',
      `Deseja remover "${item.codigo} - ${item.nome}" dos favoritos?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Remover', style: 'destructive', onPress: () => onRemover(item.linha_id) },
      ]
    );
  }

  return (
    <TouchableOpacity style={styles.card} onPress={() => onVerDetalhes(item.linha_id)} activeOpacity={0.85}>
      <View style={styles.cardBarra} />

      <View style={styles.cardConteudo}>
        <View style={styles.cardTopo}>
          <View style={styles.cardEsquerda}>
            <View style={styles.codigoNomeRow}>
              <View style={styles.codigoBadge}>
                <Text style={styles.codigoTexto}>{item.codigo}</Text>
              </View>
              <Text style={styles.nomeTexto} numberOfLines={1}>
                {item.nome}
              </Text>
            </View>
            <Text style={styles.descricaoTexto} numberOfLines={1}>
              {item.descricao}
            </Text>
          </View>

          <TouchableOpacity
            onPress={confirmarRemocao}
            style={styles.btnRemover}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <FontAwesome5 name="star" solid size={18} color="#A1BF34" />
          </TouchableOpacity>
        </View>

        <View style={styles.proximoBox}>
          <Ionicons name="time-outline" size={16} color="#A1BF34" />
          <Text style={styles.proximoLabel}>Próxima saída hoje</Text>
          {item.proximo ? (
            <Text style={styles.proximoHorario}>{item.proximo.horario}</Text>
          ) : (
            <Text style={styles.semHorario}>Sem mais horários hoje</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

// ─── Tela principal ───────────────────────────────────────────────────────────

export default function FavoritesScreen() {
  const router = useRouter();

  const [usuario, setUsuario]           = useState(null);
  const [usuarioCarregado, setUsuarioCarregado] = useState(false);
  const [favoritos, setFavoritos]       = useState([]);
  const [carregando, setCarregando]     = useState(true);
  const [recarregando, setRecarregando] = useState(false);
  const [erro, setErro]                 = useState(null);

  // Carrega usuário do AsyncStorage
  const carregarUsuario = useCallback(async () => {
    const data = await AsyncStorage.getItem('@valebus:user');
    const user = data ? JSON.parse(data) : null;
    setUsuario(user);
    setUsuarioCarregado(true);
    return user;
  }, []);

  // Busca favoritos do banco
  const buscarFavoritos = useCallback(async (user, isRefresh = false) => {
    if (!user) { setCarregando(false); return; }
    if (isRefresh) setRecarregando(true);
    else setCarregando(true);
    setErro(null);

    try {
      const response = await fetch(`${API_URL}/favoritos/${user.id}`);
      if (!response.ok) throw new Error();
      const data = await response.json();
      setFavoritos(data);
    } catch {
      setErro('Não foi possível carregar seus favoritos. Verifique sua conexão.');
    } finally {
      setCarregando(false);
      setRecarregando(false);
    }
  }, []);

  // Atualiza sempre que a tela entra em foco (resolve o problema de tempo real)
  useFocusEffect(
    useCallback(() => {
      setCarregando(true);
      carregarUsuario().then(user => buscarFavoritos(user));
    }, [carregarUsuario, buscarFavoritos])
  );

  // Remove favorito
  async function removerFavorito(linha_id) {
    setFavoritos(prev => prev.filter(f => f.linha_id !== linha_id));

    try {
      const response = await fetch(`${API_URL}/favoritos`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario_id: usuario.id, linha_id }),
      });
      if (!response.ok) throw new Error();
    } catch {
      buscarFavoritos(usuario);
    }
  }

  function verDetalhes(linha_id) {
    router.push({ pathname: '/line-details', params: { linhaId: linha_id } });
  }

  // ── Loading inicial ──
  if (carregando) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#0C2612" />
        <Cabecalho />
        <View style={styles.loadingWrap}>
          <ActivityIndicator size="large" color="#A1BF34" />
          <Text style={styles.loadingTexto}>Carregando favoritos...</Text>
        </View>
      </View>
    );
  }

  // ── Visitante não logado ──
  if (usuarioCarregado && !usuario) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#0C2612" />
        <Cabecalho />
        <View style={styles.naoLogadoWrap}>
          <View style={styles.naoLogadoIcone}>
            <FontAwesome5 name="star" size={40} color="#A1BF34" />
          </View>
          <Text style={styles.naoLogadoTitulo}>Favoritos</Text>
          <Text style={styles.naoLogadoSubtitulo}>
            Entre em uma conta para usar essa funcionalidade e acompanhar o próximo horário das suas linhas preferidas.
          </Text>
          <TouchableOpacity style={styles.btnEntrar} onPress={() => router.push('/login')}>
            <Text style={styles.btnEntrarTexto}>Entrar na conta</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0C2612" />
      <Cabecalho />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={recarregando}
            onRefresh={() => buscarFavoritos(usuario, true)}
            colors={['#A1BF34']}
            tintColor="#A1BF34"
          />
        }
      >
        {/* Erro */}
        {erro && (
          <View style={styles.erroBox}>
            <Ionicons name="cloud-offline-outline" size={20} color="#FF4444" />
            <Text style={styles.erroTexto}>{erro}</Text>
            <TouchableOpacity onPress={() => buscarFavoritos(usuario)} style={styles.btnTentar}>
              <Text style={styles.btnTentarTexto}>Tentar novamente</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Lista */}
        {!erro && favoritos.length > 0 && (
          <>
            <View style={styles.contadorRow}>
              <View style={styles.contadorBadge}>
                <Text style={styles.contadorTexto}>{favoritos.length}</Text>
              </View>
              <Text style={styles.contadorLabel}>
                {favoritos.length === 1 ? 'linha favorita' : 'linhas favoritas'}
              </Text>
            </View>

            {favoritos.map(item => (
              <CardFavorito
                key={item.linha_id}
                item={item}
                onRemover={removerFavorito}
                onVerDetalhes={verDetalhes}
              />
            ))}

            <View style={styles.dicaBox}>
              <Ionicons name="information-circle-outline" size={16} color="#A1BF34" />
              <Text style={styles.dicaTexto}>
                Toque em uma linha para ver os horários completos. Puxe para baixo para atualizar os horários.
              </Text>
            </View>
          </>
        )}

        {/* Vazio */}
        {!erro && favoritos.length === 0 && (
          <View style={styles.vazioWrap}>
            <View style={styles.vazioIcone}>
              <FontAwesome5 name="star" size={40} color="#A1BF34" />
            </View>
            <Text style={styles.vazioTitulo}>Nenhuma linha favorita</Text>
            <Text style={styles.vazioSubtitulo}>
              Acesse os detalhes de uma linha e toque na ★ para adicioná-la aqui.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

function Cabecalho() {
  return (
    <View style={styles.header}>
      <FontAwesome5 name="star" solid size={18} color="#A1BF34" />
      <Text style={styles.headerTitulo}>Favoritos</Text>
    </View>
  );
}