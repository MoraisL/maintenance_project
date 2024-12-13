import React, { useState } from 'react';
import { View, Text, TextInput, Button, Modal, StyleSheet } from 'react-native';

const MaintenanceModal = ({ visible, onClose, onSave }) => {
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [responsible, setResponsible] = useState('');
  const [status, setStatus] = useState('');

  const handleSave = () => {
    const newMaintenance = {
      description,
      date: new Date().toLocaleDateString(),
      status: status || 'Em andamento', // Define o status padrão se não preenchido
      priority,
      responsible,
    };

    onSave(newMaintenance);
    // Limpa os campos após salvar
    setDescription('');
    setPriority('');
    setResponsible('');
    setStatus('');
  };

  const getStatusStyle = () => {
    switch (status) {
      case 'Finalizada':
        return styles.finalizada;
      case 'Em andamento':
        return styles.andamento;
      case 'Pendente':
        return styles.pendente;
      default:
        return styles.pendente; // Define um estilo padrão caso o status não seja preenchido
    }
  };

  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <View style={styles.overlay}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Adicionar Manutenção</Text>

          <TextInput
            placeholder="Descrição"
            value={description}
            onChangeText={setDescription}
            style={styles.input}
          />
          <TextInput
            placeholder="Prioridade (Alta, Média, Baixa)"
            value={priority}
            onChangeText={setPriority}
            style={styles.input}
          />
          <TextInput
            placeholder="Responsável"
            value={responsible}
            onChangeText={setResponsible}
            style={styles.input}
          />
          <TextInput
            placeholder="Status (Finalizada, Em andamento, Pendente)"
            value={status}
            onChangeText={setStatus}
            style={styles.input}
          />

          {/* Exibe o status com a cor correspondente */}
          {status ? (
            <Text style={[styles.status, getStatusStyle()]}>
              Status: {status}
            </Text>
          ) : null}

          <View style={styles.buttonContainer}>
            <Button title="Salvar" onPress={handleSave} color="#4a6572" />
            <Button title="Cancelar" color="#b4b4b4" onPress={onClose} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo semi-transparente
  },
  modalView: {
    width: '80%', // Largura do card/modal
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5, // Sombra no Android
    shadowColor: '#000', // Sombra no iOS
    shadowOffset: { width: 0, height: 2 }, // Offset da sombra
    shadowOpacity: 0.3, // Opacidade da sombra
    shadowRadius: 4, // Raio da sombra
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    width: '100%',
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  status: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 5,
    borderRadius: 5,
    textAlign: 'center',
    marginTop: 10,
  },
  finalizada: {
    backgroundColor: '#4CAF50', // Verde para status "Finalizada"
    color: '#fff',
  },
  andamento: {
    backgroundColor: '#FFC107', // Amarelo para status "Em andamento"
    color: '#fff',
  },
  pendente: {
    backgroundColor: '#b2101f', // Vermelho para status "Pendente"
    color: '#fff',
  },
});

export default MaintenanceModal;