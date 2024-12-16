import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';
import PieceCard from './PieceCard'; // Importando o PieceCard

// Estoque inicial
const initialStock = [
  { id: '1', name: 'Parafuso', quantity: 100 },
  { id: '2', name: 'Porca', quantity: 50 },
  { id: '3', name: 'Arruela', quantity: 200 },
  { id: '4', name: 'Cabo', quantity: 30 },
];

const RegisterPartsScreen = () => {
  const [partName, setPartName] = useState('');
  const [quantityUsed, setQuantityUsed] = useState('');
  const [usedParts, setUsedParts] = useState([]);
  const [stock, setStock] = useState(initialStock); // Armazena o estado do estoque

  const handleRegister = () => {
    const quantityNum = parseInt(quantityUsed);

    if (partName && quantityUsed && !isNaN(quantityNum)) {
      const stockPart = stock.find((item) => item.name.toLowerCase() === partName.toLowerCase());

      // Verifica se a peça existe no estoque
      if (stockPart) {
        if (stockPart.quantity >= quantityNum) {
          // Atualiza o estoque diminuindo a quantidade utilizada
          const updatedStock = stock.map((item) =>
            item.name.toLowerCase() === partName.toLowerCase()
              ? { ...item, quantity: item.quantity - quantityNum }
              : item
          );
          setStock(updatedStock);

          // Adiciona a peça utilizada ao registro
          setUsedParts([...usedParts, { id: Math.random().toString(), name: partName, quantity: quantityUsed }]);
          setPartName('');
          setQuantityUsed('');
        } else {
          Alert.alert('Quantidade Insuficiente', 'A quantidade no estoque é menor do que a solicitada.');
        }
      } else {
        Alert.alert('Peça não encontrada', 'A peça que você está tentando registrar não existe no estoque.');
      }
    } else {
      Alert.alert('Erro', 'Por favor, preencha todos os campos corretamente.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro de Peças e Materiais Utilizados</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome da Peça"
        value={partName}
        onChangeText={setPartName}
      />
      <TextInput
        style={styles.input}
        placeholder="Quantidade Utilizada"
        value={quantityUsed}
        onChangeText={setQuantityUsed}
        keyboardType="numeric"
      />
      <Button color="#4a6572" title="Registrar Peça" onPress={handleRegister} />

      <Text style={styles.title}>Peças Utilizadas</Text>
      <FlatList
        data={usedParts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text>{item.name} - {item.quantity} unidades</Text>
          </View>
        )}
      />

      <Text style={styles.title}>Estoque Atual</Text>
      <FlatList
        data={stock}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PieceCard pieceName={item.name} quantity={item.quantity} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  listItem: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
});

export default RegisterPartsScreen;
