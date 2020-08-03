import React from 'react';
import { Button } from 'react-native';

import { Container } from './styles';

interface SignUpProps {
  navigation: any;
}

const SignUp: React.FC<SignUpProps> = ({ navigation }) => {
  return (
    <Container>
      <Button
        title="Go to SignIn"
        onPress={() => navigation.navigate('SignIn')}
      />
    </Container>
  );
};

export default SignUp;
