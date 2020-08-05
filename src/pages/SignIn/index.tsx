import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import React, { useCallback, useRef } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import {
  Image,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';

import Input from '../../components/input';
import logoImg from '../../assets/logo.png';
import Button from '../../components/button';

import { signInSchema } from './dataSchema';
import { ValidationError } from '../SignUp/dataSchema';

import getValidationErrors from '../../utils/getValidationErrors';
import {
  Container,
  Title,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccountButton,
  CreateAccountText,
} from './styles';

const SignIn: React.FC = () => {
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);

  const passwordInputRef = useRef<TextInput>(null);

  const handleSignIn = useCallback(async (data) => {
    try {
      formRef.current?.setErrors({});

      await signInSchema.validate(data, { abortEarly: false });

      // await signIn({ email: data.email, password: data.password });
    } catch (err) {
      if (err instanceof ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);

        console.log('\n\nCade o erro?');
        console.log(errors);
      }

      if ('err.response.data' in err)
        Alert.alert('Erro na Autenticação', err.response.data.message);
    }
  }, []);

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

            <Form ref={formRef} onSubmit={handleSignIn}>
              <Input
                name="email"
                icon="mail"
                placeholder="Email"
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus();
                }}
              />

              <Input
                ref={passwordInputRef}
                name="password"
                icon="lock"
                placeholder="Senha"
                secureTextEntry
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />

              <Button onPress={() => formRef.current?.submitForm()}>
                Entrar
              </Button>
            </Form>

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
