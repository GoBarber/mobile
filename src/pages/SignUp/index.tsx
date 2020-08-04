import React from 'react';

import { Container, Title } from './styles';
import Button from '../../components/button';

interface SignUpProps {
  navigation: any;
}

const SignUp: React.FC<SignUpProps> = ({ navigation }) => {
  return (
    <Container>
      <Title> Faça seu Cadastro </Title>
      <Button onPress={() => navigation.navigate('SignIn')}> Voltar </Button>
    </Container>
  );
};

export default SignUp;
