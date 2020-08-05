import { ValidationError } from 'yup';

// Indica que a chave pode ser qualquer string
// O mesmo de fazer um 'name?: string' e repetir para todas as propriedades
// Mas desta maneira não é necessário definir uma por uma
interface Errors {
  [key: string]: string;
}

export default function getValidationErrors(err: ValidationError): Errors {
  const validationErros: Errors = {};

  err.inner.forEach((error) => {
    validationErros[error.path] = error.message;
  });

  return validationErros;
}
