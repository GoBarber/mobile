/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-nocheck
import React, {
  useEffect,
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
  useCallback,
} from 'react';
import { TextInputProps } from 'react-native';
import { useField } from '@unform/core';

import { Container, TextInput, Icon, ErrorText } from './styles';

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
}

interface InputValueRefrence {
  value: string;
}
interface InputRef {
  focus(): void;
}

const Input: React.RefForwardingComponent<InputRef, InputProps> = (
  { name, icon, ...rest },
  ref,
) => {
  const inputElementRef = useRef<any>(null);

  const { registerField, defaultValue = '', fieldName, error } = useField(name);
  const inputValueRef = useRef<InputValueRefrence>({ value: defaultValue });

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!inputValueRef.current.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',

      // Se o unform estiver tentando settar algum valor de forma manual
      setValue(_: any, value: string) {
        inputValueRef.current.value = value; // Muda valor do campo
        inputElementRef.current.setNativeProps({ text: value }); // Muda visualmente o valor do campo
      },

      // Se o unformar estiver tentando limpar este input
      clearValue() {
        inputValueRef.current.value = '';
        inputElementRef.current.clear();
      },
    });
  }, [fieldName, registerField]);

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus();
    },
  }));

  return (
    <>
      <Container isFocused={isFocused} isErrored={!!error}>
        <Icon
          name={icon}
          size={20}
          color={isFilled || isFocused ? '#ff9000' : '#666360'}
        />

        <TextInput
          ref={inputElementRef}
          keyboardAppearance="dark"
          placeholderTextColor="#666360"
          defaultValue={defaultValue}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onChangeText={(value) => {
            inputValueRef.current.value = value;
          }}
          {...rest}
        />
      </Container>
      {error ? <ErrorText>{error}</ErrorText> : null}
    </>
  );
};

export default forwardRef(Input);
