import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { styles } from '../styles/RegisterStyles';

export default function RegisterScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Aviso", "A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://10.0.2.2:3000/cadastro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Sucesso", "Conta criada com sucesso!", [
          { text: "OK", onPress: () => router.replace('/login') }
        ]);
      } else {
        // Trata e-mail duplicado
        Alert.alert("Erro", data.erro?.includes('Duplicate') 
          ? "Este e-mail já está cadastrado." 
          : "Falha ao realizar cadastro.");
      }
    } catch (e) {
      Alert.alert("Erro de Conexão", "Não foi possível conectar ao servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="light-content" />
      <View style={styles.topBackground} />
      <View style={styles.header}>
        <Text style={styles.logo}>Vale<Text style={styles.logoBus}>Bus</Text></Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Cadastro</Text>
        <Text style={styles.label}>Nome:</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome Completo"
          value={name}
          onChangeText={setName}
        />
        <Text style={styles.label}>E-mail:</Text>
        <TextInput
          style={styles.input}
          placeholder="Seu e-mail"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <Text style={styles.label}>Senha:</Text>
        <TextInput
          style={styles.input}
          placeholder="Mínimo 6 caracteres"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonArea}>
        <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.buttonText}>Confirmar</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.back()} style={styles.backLink}>
          <Text style={styles.backText}>Voltar para o Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}