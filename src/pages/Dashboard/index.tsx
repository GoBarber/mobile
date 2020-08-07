import React from 'react';

import { View, Text } from 'react-native';
import Button from '../../components/button';

import { useAuth } from '../../hooks/auth';

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Button onPress={() => signOut()}> Logout </Button>
    </View>
  );
};

export default Dashboard;
