import React from 'react';
import { Image } from 'react-native';

import Input from '../../components/input';
import { Container, Title } from './styles';
import logoImg from '../../assets/logo.png';
import Button from '../../components/button';

interface SignInProps {
  navigation: any;
}

const SignIn: React.FC<SignInProps> = ({ navigation }) => {
  return (
    <Container>
      <Image source={logoImg} />
      <Title> Faça seu Login </Title>

      <Input name="Email" icon="mail" placeholder="Email" />
      <Input name="Password" icon="lock" placeholder="Senha" />

      <Button onPress={() => navigation.navigate('SignUp')}> Entrar </Button>
    </Container>
  );
};

export default SignIn;
