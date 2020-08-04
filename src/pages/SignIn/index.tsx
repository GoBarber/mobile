import React from 'react';
import {
  Image,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import Input from '../../components/input';
import logoImg from '../../assets/logo.png';
import Button from '../../components/button';
import {
  Container,
  Title,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccountButton,
  CreateAccountText,
} from './styles';

interface SignInProps {
  navigation: any;
}

const SignIn: React.FC<SignInProps> = ({ navigation }) => {
  return (
    <>
      {/* Por padrão, o IOS coloca o teclado em cima de toda a tela, ao invés de deslizá-la para cima */}
      {/* Para isso é usado o KeyBoardAvoidingView */}
      {/* No Android o comportamento de deslizamento já é o default */}
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

            {/* View necessária apenas porque os textos no IOS não se movem usando o KeyboardAvoidingView  */}
            <View>
              <Title> Faça seu Login </Title>
            </View>

            <Input name="Email" icon="mail" placeholder="Email" />
            <Input name="Password" icon="lock" placeholder="Senha" />

            <Button onPress={() => null}> Entrar </Button>

            <ForgotPassword onPress={() => null}>
              <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
            </ForgotPassword>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <CreateAccountButton onPress={() => navigation.navigate('SignUp')}>
        <Icon name="log-in" size={20} color="#ff9000" />
        <CreateAccountText>Criar conta</CreateAccountText>
      </CreateAccountButton>
    </>
  );
};

export default SignIn;
