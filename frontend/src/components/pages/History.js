import React, { useState } from 'react'; 
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function History() {
  const [history, setHistory] = useState([
    { id: '1', input: 'Hello', output: 'Bonjour' },
    { id: '2', input: 'How are you?', output: 'Comment ça va ?' },
    { id: '3', input: 'Good morning', output: 'Bon matin' },
  ]);

  const navigation = useNavigation();

  const handleItemPress = (input, output) => {
    // Navigate to Home with the translation data
    navigation.navigate('Home', { input, output });
  };

  const handleDeleteItem = (id) => {
    setHistory(history.filter(item => item.id !== id));
  };

  const clearHistory = () => setHistory([]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Translation History</Text>

      {history.length === 0 ? (
        <Text style={styles.emptyText}>No history available</Text>
      ) : (
        <FlatList
          data={history}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <TouchableOpacity onPress={() => handleItemPress(item.input, item.output)}>
                <Text style={styles.inputText}>{item.input}</Text>
                <Text style={styles.outputText}>{item.output}</Text>
              </TouchableOpacity>
              <Button title="Delete" onPress={() => handleDeleteItem(item.id)} />
            </View>
          )}
        />
      )}

      <Button title="Clear History" onPress={clearHistory} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  emptyText: { textAlign: 'center', fontSize: 16, marginTop: 20 },
  item: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  inputText: { fontWeight: 'bold' },
  outputText: { color: 'gray' },
});
