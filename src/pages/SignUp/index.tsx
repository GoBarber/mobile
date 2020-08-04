import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import {
  Image,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';

import Input from '../../components/input';
import logoImg from '../../assets/logo.png';
import Button from '../../components/button';
import { Container, Title, BackButton, BackText } from './styles';

const SignUp: React.FC = () => {
  const navigation = useNavigation();

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1, flexGrow: 1 }}
        >
          <Container>
            <Image source={logoImg} />

            <View>
              <Title> Crie sua Conta </Title>
            </View>

            <Input name="name" icon="user" placeholder="Nome" />
            <Input name="email" icon="mail" placeholder="Email" />
            <Input name="password" icon="lock" placeholder="Senha" />

            <Button onPress={() => null}> Entrar </Button>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <BackButton onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={20} color="#fff" />
        <BackText>Voltar para login</BackText>
      </BackButton>
    </>
  );
};

export default SignUp;
