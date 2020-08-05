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

import getValidationErrors from '../../utils/getValidationErrors';
import Input from '../../components/input';
import logoImg from '../../assets/logo.png';
import Button from '../../components/button';
import { Container, Title, BackButton, BackText } from './styles';
import { signUpSchema } from './dataSchema';
import { ValidationError } from '../SignIn/dataSchema';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);

  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const handleSignUp = useCallback(async (data: SignUpFormData) => {
    try {
      formRef.current?.setErrors({});

      await signUpSchema.validate(data, { abortEarly: false });

      // await api.post('/users', data);
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
            <Form ref={formRef} onSubmit={handleSignUp}>
              <Input
                name="name"
                icon="user"
                placeholder="Nome"
                autoCapitalize="words"
                returnKeyType="next"
                onSubmitEditing={() => {
                  emailInputRef.current?.focus();
                }}
              />

              <Input
                ref={emailInputRef}
                name="email"
                icon="mail"
                keyboardType="email-address"
                placeholder="Email"
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
                textContentType="newPassword"
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />

              <Button onPress={() => formRef.current?.submitForm()}>
                Cadastrar
              </Button>
            </Form>
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
