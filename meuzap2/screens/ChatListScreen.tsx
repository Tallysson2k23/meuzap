import React, { useEffect, useState } from 'react'; 
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { collection, onSnapshot } from 'firebase/firestore'; // ✅ Não precisa importar getFirestore aqui
import { db } from '../firebaseConfig';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'ChatList'>;

type Conversa = {
  id: string;
  nome: string;
  ultimaMensagem: string;
};

export default function ChatListScreen({ navigation }: Props) {
  const [conversas, setConversas] = useState<Conversa[]>([]);

  useEffect(() => {
    const conversasRef = collection(db, 'conversas');

    const unsubscribe = onSnapshot(conversasRef, (snapshot) => {
      const lista: Conversa[] = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          nome: data.nome ?? 'Sem nome',
          ultimaMensagem: data.ultimaMensagem ?? '',
        };
      });
      setConversas(lista);
    });

    return unsubscribe; // ✅ Forma mais direta de limpar
  }, []);

  const abrirConversa = (conversaId: string) => {
    navigation.navigate('Chat', { conversaId });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={conversas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => abrirConversa(item.id)}>
            <Text style={styles.nome}>{item.nome}</Text>
            <Text style={styles.mensagem}>{item.ultimaMensagem}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>Nenhuma conversa encontrada.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  item: { padding: 15, borderBottomWidth: 1, borderColor: '#ccc' },
  nome: { fontWeight: 'bold', fontSize: 16 },
  mensagem: { color: '#666' },
});
