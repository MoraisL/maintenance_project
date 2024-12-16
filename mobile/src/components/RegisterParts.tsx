import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';
import PieceCard from './PieceCard'; // Importando o PieceCard

// URL da API do backend
const API_URL = 'http://seu-backend-url.com/api';

const RegisterPartsScreen = () => {
  const [partName, setPartName] = useState('');
  const [quantityUsed, setQuantityUsed] = useState('');
  const [usedParts, setUsedParts] = useState([]);
  const [stock, setStock] = useState([]); // Armazena o estoque do servidor

  // Função para buscar o estoque atual do servidor
  const fetchStock = async () => {
    try {
      const response = await fetch(`${API_URL}/stock`);
      const data = await response.json();
      setStock(data);
    } catch (error) {
      console.error('Erro ao carregar o estoque', error);
      Alert.alert('Erro', 'Não foi possível carregar o estoque.');
    }
  };

  // Função para registrar o uso de uma peça
  const handleRegister = async () => {
    const quantityNum = parseInt(quantityUsed);

    if (partName && quantityUsed && !isNaN(quantityNum)) {
      const stockPart = stock.find((item) => item.name.toLowerCase() === partName.toLowerCase());

      // Verifica se a peça existe no estoque
      if (stockPart) {
        if (stockPart.quantity >= quantityNum) {
          try {
            // Enviar dados para o backend
            const response = await fetch(`${API_URL}/register`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                partName,
                quantityUsed: quantityNum,
              }),
            });

            if (response.ok) {
              const updatedStock = await response.json(); // Recebe o estoque atualizado após o registro
              setStock(updatedStock); // Atualiza o estoque na interface
              setUsedParts([...usedParts, { id: Math.random().toString(), name: partName, quantity: quantityUsed }]);
              setPartName('');
              setQuantityUsed('');
            } else {
              Alert.alert('Erro', 'Falha ao registrar a peça.');
            }
          } catch (error) {
            console.error('Erro ao registrar peça', error);
            Alert.alert('Erro', 'Não foi possível registrar a peça.');
          }
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

  // Carregar estoque inicial quando o componente for montado
  useEffect(() => {
    fetchStock();
  }, []);

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