import React from 'react';
import { View, ViewStyle, ActivityIndicator } from 'react-native';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

import { useAuth } from '../hooks/auth';

const loadingStyle: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#312e38',
};

const Routes: React.FC = () => {
  const { user, loading } = useAuth();

  // Esta parte adiciona o efeito de carregamento enquanto a autenticação ainda não foi completa
  if (loading) {
    return (
      <View style={loadingStyle}>
        <ActivityIndicator size="large" color="#999" />
      </View>
    );
  }

  return user ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
