import * as React from 'react';
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, ScrollView, Button } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MachineCard from './src/components/MachineCard';
import MaintenanceModal from './src/components/MaintenanceModal';
import RegisterParts from './src/components/RegisterParts';
import PieceCard from './src/components/PieceCard';
import Maintenance from './src/components/Maintenance';

const Tab = createBottomTabNavigator();

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
    setModalVisible(false); // Fecha o modal após adicionar a manutenção
  };

  return (
    <ScrollView>
      <Text style={{ fontSize: 20, fontWeight: 'bold', margin: 10, alignItems: 'center' }}>
        Gestão de Manutenções
      </Text>
      <View style={{ padding: 20 }}>
        {/* Renderiza os cards de manutenção com base no estado */}
        {maintenances.map((maintenance, index) => (
          <Maintenance
            key={index} // Adiciona uma chave única para cada item
            description={maintenance.description}
            priority={maintenance.priority}
            status={maintenance.status}
            responsible={maintenance.responsible}
          />
        ))}

        <Button
          color="#4a6572"
          title="Adicionar Manutenção"
          onPress={() => setModalVisible(true)}
        />

        {/* Modal para adicionar manutenção */}
        <MaintenanceModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSave={addMaintenance} // Passa a função para salvar a manutenção
        />
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

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let IconComponent;

            if (route.name === 'MachinesScreen') {
              IconComponent = MaterialCommunityIcons;
              iconName = focused ? 'robot' : 'robot-outline'; // Ícone de robô
            } else if (route.name === 'MaintenanceScreen') {
              IconComponent = FontAwesome5;
              iconName = 'tools'; // Ícone de ferramentas para manutenção
            } else if (route.name === 'StockScreen') {
              IconComponent = FontAwesome5;
              iconName = 'cogs'; // Ícone de engrenagem para estoque
            } else if (route.name === 'RegisterPartsScreen') {
              IconComponent = FontAwesome5;
              iconName = 'clipboard-list'; // Ícone de lista para registro de peças
            }

            return <IconComponent name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#fff', // Cor dos ícones ativos
          tabBarInactiveTintColor: 'darkgray', // Cor dos ícones inativos
          tabBarStyle: { backgroundColor: '#4a6572' }, // Cor de fundo da barra
        })}
      >
        <Tab.Screen
          name="MachinesScreen"
          component={MachinesScreen}
          options={{ tabBarLabel: 'Máquinas' }}
        />
        <Tab.Screen
          name="MaintenanceScreen"
          component={MaintenanceScreen}
          options={{ tabBarLabel: 'Manutenção' }}
        />
        <Tab.Screen
          name="RegisterPartsScreen"
          component={RegisterPartsScreen}
          options={{ tabBarLabel: 'Registro de Peças' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
