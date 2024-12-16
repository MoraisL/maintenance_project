import * as React from 'react';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, ScrollView, Button, TextInput, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MachineCard from './src/components/MachineCard';
import MaintenanceModal from './src/components/MaintenanceModal';
import RegisterParts from './src/components/RegisterParts';
import Maintenance from './src/components/Maintenance';

const Tab = createBottomTabNavigator();

function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (username && password) {
      try {
        const response = await fetch('https://127.0.0.1:8000/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        if (data.success) {
          navigation.replace('MainApp');
        } else {
          alert('Login falhou. Tente novamente.');
        }
      } catch (error) {
        console.error('Erro no login:', error);
        alert('Erro ao conectar ao servidor.');
      }
    } else {
      alert('Por favor, preencha os campos!');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Login</Text>
      <TextInput
        placeholder="Usuário"
        style={{ borderWidth: 1, borderColor: '#ccc', width: '100%', marginBottom: 10, padding: 10, borderRadius: 5 }}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Senha"
        secureTextEntry
        style={{ borderWidth: 1, borderColor: '#ccc', width: '100%', marginBottom: 20, padding: 10, borderRadius: 5 }}
        onChangeText={setPassword}
      />
      <TouchableOpacity
        style={{ backgroundColor: '#4a6572', padding: 15, borderRadius: 5, alignItems: 'center', width: '100%' }}
        onPress={handleLogin}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

function MachinesScreen() {
  const [machines, setMachines] = useState([]);

  useEffect(() => {
    const fetchMachines = async () => {
      try {
        const response = await fetch('https://127.0.0.1:8000/machines');
        const data = await response.json();
        setMachines(data);
      } catch (error) {
        console.error('Erro ao buscar máquinas:', error);
      }
    };

    fetchMachines();
  }, []);

  return (
    <ScrollView>
      <Text style={{ fontSize: 20, fontWeight: 'bold', margin: 10, alignItems: 'center' }}>
        Gestão de máquinas
      </Text>
      {machines.map((machine, index) => (
        <MachineCard
          key={index}
          nome={machine.nome}
          tipo={machine.tipo}
          localizacao={machine.localizacao}
        />
      ))}
    </ScrollView>
  );
}

function MaintenanceScreen() {
  const [maintenances, setMaintenances] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchMaintenances = async () => {
    try {
      const response = await fetch('https://127.0.0.1:8000/maintenances');
      const data = await response.json();
      setMaintenances(data);
    } catch (error) {
      console.error('Erro ao buscar manutenções:', error);
    }
  };

  useEffect(() => {
    fetchMaintenances();
  }, []);

  const addMaintenance = async (newMaintenance) => {
    try {
      const response = await fetch('https://127.0.0.1:8000/maintenances', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMaintenance),
      });
      const data = await response.json();
      if (data.success) {
        setMaintenances([...maintenances, newMaintenance]);
        setModalVisible(false);
      } else {
        alert('Erro ao adicionar manutenção');
      }
    } catch (error) {
      console.error('Erro ao adicionar manutenção:', error);
    }
  };

  return (
    <ScrollView>
      <Text style={{ fontSize: 20, fontWeight: 'bold', margin: 10, alignItems: 'center' }}>
        Gestão de Manutenções
      </Text>
      <View style={{ padding: 20 }}>
        {maintenances.map((maintenance, index) => (
          <Maintenance key={index} {...maintenance} />
        ))}
        <Button title="Adicionar Manutenção" onPress={() => setModalVisible(true)} />
        <MaintenanceModal visible={modalVisible} onClose={() => setModalVisible(false)} onSave={addMaintenance} />
      </View>
    </ScrollView>
  );
}

function RegisterPartsScreen() {
  return (
    <ScrollView>
      <RegisterParts />
    </ScrollView>
  );
}

function MainApp() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let IconComponent;

          if (route.name === 'MachinesScreen') {
            IconComponent = MaterialCommunityIcons;
            iconName = focused ? 'robot' : 'robot-outline';
          } else if (route.name === 'MaintenanceScreen') {
            IconComponent = FontAwesome5;
            iconName = 'tools';
          } else if (route.name === 'RegisterPartsScreen') {
            IconComponent = FontAwesome5;
            iconName = 'clipboard-list';
          }

          return <IconComponent name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: 'darkgray',
        tabBarStyle: { backgroundColor: '#4a6572' },
      })}
    >
      <Tab.Screen name="MachinesScreen" component={MachinesScreen} options={{ tabBarLabel: 'Máquinas' }} />
      <Tab.Screen name="MaintenanceScreen" component={MaintenanceScreen} options={{ tabBarLabel: 'Manutenção' }} />
      <Tab.Screen name="RegisterPartsScreen" component={RegisterPartsScreen} options={{ tabBarLabel: 'Registro de Peças' }} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <MainApp />
      ) : (
        <LoginScreen navigation={{ replace: () => setIsLoggedIn(true) }} />
      )}
    </NavigationContainer>
  );
}
