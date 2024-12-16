import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Maintenance = ({ description, priority, responsible, status }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Descrição:</Text>
      <Text style={styles.text}>{description}</Text>

      <Text style={styles.label}>Prioridade:</Text>
      <Text style={styles.text}>{priority}</Text>

      <Text style={styles.label}>Responsável:</Text>
      <Text style={styles.text}>{responsible}</Text>

      <Text style={styles.label}>Status:</Text>
      <Text style={[
            styles.status,
            status === 'Finalizada' ? styles.finalizada :
            status === 'Em andamento' ? styles.andamento :
            status === 'Pendente' ? styles.pendente :
            styles.pendente // Estilo padrão (caso não seja nenhum dos anteriores)
            ]}>

        {status}
      </Text>
    </View>
  );
};

// Estilos do componente
const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#9BB7BD',
    borderRadius: 10,
    margin: 10,
    width: 300, 
    height: 250,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  text: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
  },
  status: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 5,
    borderRadius: 5,
    textAlign: 'center',
  },
  finalizada: {
    backgroundColor: '#4CAF50',
    color: '#fff',
  },
  andamento: {
    backgroundColor: '#FFC107', // amarelo para status em andamento
    color: '#fff',
  },
  pendente: {
    backgroundColor: '#b2101f', // vermelha para status em andamento
    color: '#fff',
  },
});

export default Maintenance;
