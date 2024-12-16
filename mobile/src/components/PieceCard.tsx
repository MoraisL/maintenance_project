import React from 'react';
import { View, Text } from 'react-native';

const PieceCard = ({ pieceName, quantity }) => {
  return (
    <View style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#7D9DA7',
      padding: 15,
      borderRadius: 10,
      marginBottom: 10,
    }}>
      <Text style={{ fontSize: 18, color: '#fff' }}>{quantity}</Text>
      <Text style={{ fontSize: 14, color: '#fff' }}>{pieceName}</Text>
    </View>
  );
};

export default PieceCard;
