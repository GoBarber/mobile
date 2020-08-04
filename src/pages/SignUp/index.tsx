import React from 'react';
import { Button } from 'react-native';

import { Container, Title } from './styles';

interface SignUpProps {
  navigation: any;
}

const SignUp: React.FC<SignUpProps> = ({ navigation }) => {
  return (
    <Container>
      <Title> Faça seu Cadastro </Title>
      <Button
        title="Go to SignIn"
        onPress={() => navigation.navigate('SignIn')}
      />
    </Container>
  );
};

export default SignUp;
