import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { db } from '../firebaseConfig';
import { collection, onSnapshot } from 'firebase/firestore';

export default function ChatListScreen({ navigation }) {
  const [chats, setChats] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'chats'), (snapshot) => {
      const lista = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setChats(lista);
    });

    return unsubscribe;
  }, []);

  const abrirChat = (chatId: string) => {
    navigation.navigate('Chat', { chatId }); // ✅ Aqui navega corretamente
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => abrirChat(item.id)} style={styles.chatItem}>
            <Text style={styles.chatNome}>{item.nome}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.vazio}>Nenhuma conversa ainda</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  chatItem: { padding: 20, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  chatNome: { fontSize: 18 },
  vazio: { textAlign: 'center', marginTop: 50, color: '#999' }
});
