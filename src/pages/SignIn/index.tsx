import React from 'react';
import { Image, Button } from 'react-native';

import { Container, Title } from './styles';
import logoImg from '../../assets/logo.png';

interface SignInProps {
  navigation: any;
}

const SignIn: React.FC<SignInProps> = ({ navigation }) => {
  return (
    <Container>
      <Image source={logoImg} />
      <Title> Faça seu Login </Title>

      <Button
        title="Go to SignUp"
        onPress={() => navigation.navigate('SignUp')}
      />
    </Container>
  );
};

export default SignIn;
