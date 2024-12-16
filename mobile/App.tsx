
import * as React from 'react';
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, ScrollView, Button, TextInput, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MachineCard from './src/components/MachineCard';
import MaintenanceModal from './src/components/MaintenanceModal';
import RegisterParts from './src/components/RegisterParts';
import PieceCard from './src/components/PieceCard';
import Maintenance from './src/components/Maintenance';

const Tab = createBottomTabNavigator();

function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username && password) {
      navigation.replace('MainApp');
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
  return (
    <ScrollView>
      <Text style={{ fontSize: 20, fontWeight: 'bold', margin: 10, alignItems: 'center' }}>
        Gestão de máquinas
      </Text>
      <MachineCard nome="Fresa" tipo="Industrial" localizacao="Oficina" />
      <MachineCard nome="Máquina de Montagem" tipo="Manufatura" localizacao="Oficina" />
      <MachineCard nome="Impressora" tipo="Escritório" localizacao="Oficina" />
      <MachineCard nome="Cortadora a Laser" tipo="Industrial" localizacao="Fábrica" />
      <MachineCard nome="Robô Colaborativo" tipo="Automação" localizacao="Linha de Produção" />
    </ScrollView>
  );
}

function MaintenanceScreen() {
  const [maintenances, setMaintenances] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const addMaintenance = (newMaintenance) => {
    setMaintenances([...maintenances, newMaintenance]);
    setModalVisible(false);
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
