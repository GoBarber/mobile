import React from 'react';
import { Button } from 'react-native';

import { Container } from './styles';

interface SignInProps {
  navigation: any;
}

const SignIn: React.FC<SignInProps> = ({ navigation }) => {
  return (
    <Container>
      <Button
        title="Go to SignUp"
        onPress={() => navigation.navigate('SignUp')}
      />
    </Container>
  );
};

export default SignIn;
