import React, { useEffect, useState } from 'react';
import {
  View, Text, TouchableOpacity, ActivityIndicator,
  StatusBar, Image, Alert, TextInput, ScrollView, Modal
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { styles } from '../styles/ProfileStyles';

export default function ProfileScreen() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [photo, setPhoto] = useState(null);
  const [isPremium, setIsPremium] = useState(false);

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [premiumModalVisible, setPremiumModalVisible] = useState(false);
  const [ajudaModalVisible, setAjudaModalVisible] = useState(false);
  const [sobreModalVisible, setSobreModalVisible] = useState(false);
  const [newName, setNewName] = useState('');

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const savedUser    = await AsyncStorage.getItem('@valebus:user');
      const savedPhoto   = await AsyncStorage.getItem('@valebus:photo');
      const savedPremium = await AsyncStorage.getItem('@valebus:premium');
      if (savedUser)   setUser(JSON.parse(savedUser));
      if (savedPhoto)  setPhoto(savedPhoto);
      if (savedPremium) setIsPremium(JSON.parse(savedPremium));
    } catch (error) {
      console.error('Erro ao carregar perfil:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePickPhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão negada', 'Precisamos acessar sua galeria para trocar a foto.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });
    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setPhoto(uri);
      await AsyncStorage.setItem('@valebus:photo', uri);
    }
  };

  const handleOpenEdit = () => {
    setNewName(user?.nome || '');
    setEditModalVisible(true);
  };

  const handleSaveName = async () => {
    if (!newName.trim()) {
      Alert.alert('Aviso', 'O nome não pode ficar vazio.');
      return;
    }
    const updatedUser = { ...user, nome: newName.trim() };
    setUser(updatedUser);
    await AsyncStorage.setItem('@valebus:user', JSON.stringify(updatedUser));
    setEditModalVisible(false);
  };

  const handleActivatePremium = async () => {
    setIsPremium(true);
    await AsyncStorage.setItem('@valebus:premium', JSON.stringify(true));
    setPremiumModalVisible(false);
    Alert.alert('🎉 Bem-vindo ao Premium!', 'Você agora tem acesso sem anúncios.');
  };

  const handleLogout = async () => {
    Alert.alert('Sair da conta', 'Tem certeza que deseja sair?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Sair', style: 'destructive', onPress: async () => {
          await AsyncStorage.removeItem('@valebus:user');
          setUser(null);
          setPhoto(null);
          setIsPremium(false);
        }
      }
    ]);
  };

  if (loading) {
    return (
      <View style={styles.mainContainer}>
        <ActivityIndicator size="large" color="#A1BF34" style={{ marginTop: 100 }} />
      </View>
    );
  }

  // ── TELA VISITANTE ──────────────────────────────────────────────────────────
  if (!user) {
    return (
      <View style={styles.mainContainer}>
        <StatusBar barStyle="light-content" backgroundColor="#0C2612" />

        {/* Header igual às outras páginas */}
        <View style={styles.guestHeader}>
          <Ionicons name="person-circle-outline" size={22} color="#A1BF34" />
          <Text style={styles.guestHeaderTitulo}>Perfil</Text>
        </View>

        {/* Conteúdo centralizado */}
        <View style={styles.guestBody}>
          <View style={styles.guestAvatarBox}>
            <Ionicons name="person" size={52} color="#A1BF34" />
          </View>

          <Text style={styles.guestTitle}>Você não está logado</Text>
          <Text style={styles.guestSubtitle}>
            Faça login ou crie uma conta para acessar seu perfil, favoritos e muito mais.
          </Text>

          <TouchableOpacity style={styles.guestBtnPrimary} onPress={() => router.push('/login')}>
            <Text style={styles.guestBtnPrimaryText}>Entrar na conta</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.guestBtnSecondary} onPress={() => router.push('/register')}>
            <Text style={styles.guestBtnSecondaryText}>Criar conta gratuita</Text>
          </TouchableOpacity>
        </View>

        {/* Rodapé */}
        <View style={styles.guestFooter}>
          <TouchableOpacity style={styles.sobreGuestBtn} onPress={() => setSobreModalVisible(true)}>
            <Ionicons name="information-circle-outline" size={18} color="#A1BF34" />
            <Text style={styles.sobreGuestText}>Sobre o ValeBus</Text>
          </TouchableOpacity>
        </View>

        <ModalSobre visible={sobreModalVisible} onClose={() => setSobreModalVisible(false)} styles={styles} />
      </View>
    );
  }

  // ── TELA LOGADO ─────────────────────────────────────────────────────────────
  const inicialNome = user.nome ? user.nome.charAt(0).toUpperCase() : '?';

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="light-content" />
      <View style={[styles.topBackground, isPremium && styles.topBackgroundPremium]} />

      <View style={styles.header}>
        <TouchableOpacity onPress={handlePickPhoto} style={styles.avatarWrapper}>
          {photo ? (
            <Image source={{ uri: photo }} style={[styles.avatarImage, isPremium && styles.avatarBorderPremium]} />
          ) : (
            <View style={[styles.avatarCircle, isPremium && styles.avatarBorderPremium]}>
              <Text style={styles.avatarText}>{inicialNome}</Text>
            </View>
          )}
          <View style={styles.cameraIcon}>
            <Ionicons name="camera" size={14} color="#FFF" />
          </View>
        </TouchableOpacity>

        <Text style={styles.userName}>{user.nome}</Text>
        <Text style={styles.userEmail}>{user.email}</Text>

        {isPremium && (
          <View style={styles.premiumBadge}>
            <FontAwesome5 name="crown" size={10} color="#FFD700" />
            <Text style={styles.premiumBadgeText}>PREMIUM</Text>
          </View>
        )}
      </View>

      <ScrollView style={styles.scrollArea} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>PERFIL</Text>
        <View style={styles.card}>
          <MenuItem icon={<Ionicons name="person-outline" size={20} color="#1A4019" />} label="Nome" value={user.nome} onPress={handleOpenEdit} />
          <View style={styles.divider} />
          <MenuItem icon={<Ionicons name="mail-outline" size={20} color="#1A4019" />} label="E-mail" value={user.email} />
          <View style={styles.divider} />
          <MenuItem icon={<Ionicons name="create-outline" size={20} color="#1A4019" />} label="Editar perfil" onPress={handleOpenEdit} showArrow />
        </View>

        <Text style={styles.sectionTitle}>OUTROS</Text>
        <View style={styles.card}>
          {isPremium ? (
            <MenuItem
              icon={<FontAwesome5 name="crown" size={18} color="#FFD700" />}
              label="Você é Premium!"
              value="Acesso sem anúncios ativo"
            />
          ) : (
            <TouchableOpacity style={styles.premiumCardBtn} onPress={() => setPremiumModalVisible(true)}>
              <View style={styles.premiumCardLeft}>
                <FontAwesome5 name="crown" size={20} color="#FFD700" />
                <View>
                  <Text style={styles.premiumCardTitle}>Seja Premium</Text>
                  <Text style={styles.premiumCardSub}>Remova os anúncios por R$ 4,99/mês</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#A1BF34" />
            </TouchableOpacity>
          )}
          <View style={styles.divider} />
          <MenuItem icon={<Ionicons name="help-circle-outline" size={20} color="#1A4019" />} label="Ajuda" value="Fale conosco" onPress={() => setAjudaModalVisible(true)} showArrow />
          <View style={styles.divider} />
          <MenuItem icon={<Ionicons name="information-circle-outline" size={20} color="#1A4019" />} label="Sobre" value="Conheça o projeto" onPress={() => setSobreModalVisible(true)} showArrow />
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color="#FF4444" />
          <Text style={styles.logoutText}>Sair da conta</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* MODAL EDITAR NOME */}
      <Modal visible={editModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <TouchableOpacity onPress={() => setEditModalVisible(false)} style={styles.modalCloseBtn}>
              <Ionicons name="close" size={22} color="#999" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Editar nome</Text>
            <TextInput style={styles.modalInput} value={newName} onChangeText={setNewName} placeholder="Seu nome" autoFocus />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalBtnCancel} onPress={() => setEditModalVisible(false)}>
                <Text style={styles.modalBtnCancelText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalBtnConfirm} onPress={handleSaveName}>
                <Text style={styles.modalBtnConfirmText}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* MODAL PREMIUM */}
      <Modal visible={premiumModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalCard, { maxHeight: '85%' }]}>
            <TouchableOpacity onPress={() => setPremiumModalVisible(false)} style={styles.modalCloseBtn}>
              <Ionicons name="close" size={22} color="#999" />
            </TouchableOpacity>
            <FontAwesome5 name="crown" size={40} color="#FFD700" style={{ alignSelf: 'center', marginBottom: 12 }} />
            <Text style={styles.modalTitle}>ValeBus Premium</Text>
            <Text style={styles.modalDescription}>Tenha uma experiência sem interrupções com o ValeBus Premium.</Text>
            <View style={styles.premiumFeatures}>
              <PremiumItem text="Sem anúncios" />
              <PremiumItem text="Suporte prioritário" />
              <PremiumItem text="Acesso antecipado a novidades" />
            </View>
            <Text style={styles.premiumPrice}>R$ 4,99 / mês</Text>
            <TouchableOpacity style={styles.modalBtnConfirm} onPress={handleActivatePremium}>
              <Text style={styles.modalBtnConfirmText}>Assinar agora</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.modalBtnCancel, { marginTop: 10, flex: 0, width: '100%' }]} onPress={() => setPremiumModalVisible(false)}>
              <Text style={styles.modalBtnCancelText}>Agora não</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* MODAL AJUDA */}
      <Modal visible={ajudaModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <TouchableOpacity onPress={() => setAjudaModalVisible(false)} style={styles.modalCloseBtn}>
              <Ionicons name="close" size={22} color="#999" />
            </TouchableOpacity>
            <Ionicons name="help-circle" size={40} color="#1A4019" style={{ alignSelf: 'center', marginBottom: 12 }} />
            <Text style={styles.modalTitle}>Ajuda & Contato</Text>
            <View style={styles.ajudaItem}><Ionicons name="mail-outline" size={18} color="#666" /><Text style={styles.ajudaText}>suporte@valebus.com.br</Text></View>
            <View style={styles.ajudaItem}><Ionicons name="call-outline" size={18} color="#666" /><Text style={styles.ajudaText}>(13) 99999-0000</Text></View>
            <View style={styles.ajudaItem}><Ionicons name="time-outline" size={18} color="#666" /><Text style={styles.ajudaText}>Seg a Sex, das 8h às 18h</Text></View>
            <TouchableOpacity style={[styles.modalBtnConfirm, { marginTop: 20 }]} onPress={() => setAjudaModalVisible(false)}>
              <Text style={styles.modalBtnConfirmText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <ModalSobre visible={sobreModalVisible} onClose={() => setSobreModalVisible(false)} styles={styles} />
    </View>
  );
}

// ── MODAL SOBRE ───────────────────────────────────────────────────────────────
function ModalSobre({ visible, onClose, styles }) {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalCard}>
          <TouchableOpacity onPress={onClose} style={styles.modalCloseBtn}>
            <Ionicons name="close" size={22} color="#999" />
          </TouchableOpacity>
          <Text style={[styles.modalTitle, { fontSize: 22 }]}>
            Vale<Text style={{ color: '#A1BF34' }}>Bus</Text>
          </Text>
          <Text style={styles.modalDescription}>
            O ValeBus é um projeto acadêmico desenvolvido como trabalho de conclusão do curso de
            Desenvolvimento Web, com foco em soluções de mobilidade urbana para o Vale do Ribeira.
          </Text>
          <Text style={styles.modalDescription}>
            O app centraliza os horários das linhas de ônibus da região, facilitando o dia a dia
            dos passageiros com informações rápidas e acessíveis.
          </Text>
          <View style={styles.ajudaItem}>
            <Ionicons name="school-outline" size={18} color="#666" />
            <Text style={styles.ajudaText}>Curso Técnico em Desenvolvimento Web</Text>
          </View>
          <View style={styles.ajudaItem}>
            <Ionicons name="calendar-outline" size={18} color="#666" />
            <Text style={styles.ajudaText}>2025</Text>
          </View>
          <TouchableOpacity style={[styles.modalBtnConfirm, { marginTop: 20 }]} onPress={onClose}>
            <Text style={styles.modalBtnConfirmText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

// ── COMPONENTES AUXILIARES ────────────────────────────────────────────────────
function MenuItem({ icon, label, value, onPress, showArrow }) {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress} disabled={!onPress}>
      <View style={styles.menuIconBox}>{icon}</View>
      <View style={styles.menuTextBox}>
        <Text style={styles.menuLabel}>{label}</Text>
        {value ? <Text style={styles.menuValue}>{value}</Text> : null}
      </View>
      {showArrow && <Ionicons name="chevron-forward" size={18} color="#CCC" />}
    </TouchableOpacity>
  );
}

function PremiumItem({ text }) {
  return (
    <View style={styles.premiumItem}>
      <Ionicons name="checkmark-circle" size={18} color="#A1BF34" />
      <Text style={styles.premiumItemText}>{text}</Text>
    </View>
  );
}