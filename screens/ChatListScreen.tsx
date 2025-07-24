import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { auth } from '../firebaseConfig';

export default function ChatListScreen({ navigation }) {
  const sair = () => {
    auth.signOut();
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>📱 Lista de Conversas</Text>
      {/* Aqui no futuro mostraremos os chats em tempo real */}
      <Button title="Sair da conta" onPress={sair} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  titulo: { fontSize: 24, marginBottom: 20 },
});
