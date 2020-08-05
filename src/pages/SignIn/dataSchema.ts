import * as Yup from 'yup';

export const { ValidationError } = Yup;

export const signInSchema = Yup.object().shape({
  email: Yup.string().required('Preencha o Email').email('Email inválido'),
  password: Yup.string().required('Preencha a Senha'),
});
