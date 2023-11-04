'use client';
import { Alert } from '@/app/components/Alert/Alert';
import { useXptoValidation } from '@/app/hooks/useXptoValidation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

type RegisterViewProps = {
  name: string;
  email: string;
  numberXPTO: string;
};

const schema = yup.object().shape({
  name: yup
    .string()
    .required('O nome é obrigatório')
    .min(3, 'O nome deve ter pelo menos 3 caracteres'),
  email: yup
    .string()
    .email('Digite um e-mail válido')
    .required('O e-mail é obrigatório'),
  numberXPTO: yup
    .string()
    .required('O número XPTO é obrigatório')
    .test(
      'is-valid-range',
      'O número XPTO deve estar na faixa de 10004 a 99995',
      (value) => {
        const number = parseInt(value.replace('-', ''), 10);
        return number >= 10004 && number <= 99995;
      }
    )
});

export const RegisterView = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<RegisterViewProps>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      numberXPTO: ''
    }
  });

  const [numberXPTO, setNumberXPTO] = useState<string>('');
  const { errorsNumberXPTO, validateXpto } = useXptoValidation(numberXPTO);
  const [alert, setAlert] = useState<boolean>(false);

  const handleRegister = (data: RegisterViewProps) => {
    console.log(data + 'aqui data');
    setAlert(true);

    reset();
  };

  useEffect(() => {
    if (numberXPTO) {
      validateXpto();
    }
  }, [numberXPTO]);

  useEffect(() => {
    if (alert) {
      setTimeout(() => {
        setAlert(false);
      }, 5000);
    }
  }, [alert]);

  return (
    <div className=" w-full flex flex-col items-center justify-center h-full ">
      <div className="pb-5">
        <h1 className="text-4xl">Cadastrar</h1>
      </div>
      <div className="bg-gray-300 p-6 rounded-lg max-w-xl w-full flex flex-col gap-4">
        <div>
          <Controller
            name="name"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                onChange={onChange}
                value={value}
                type="text"
                placeholder="Nome"
              />
            )}
          />
          {errors.name && (
            <span className="text-red-500 ">{errors.name?.message}</span>
          )}
        </div>

        <div>
          <Controller
            name="email"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                onChange={onChange}
                value={value}
                type="email"
                placeholder="Email"
              />
            )}
          />
          {errors.email && (
            <span className="text-red-500 ">{errors.email?.message}</span>
          )}
        </div>

        <div>
          <Controller
            name="numberXPTO"
            control={control}
            render={({ field }) => (
              <Input
                type="text"
                maxLength={6}
                {...field}
                onChange={(e) => {
                  const formattedValue = e.target.value
                    .replace(/\D/g, '') // Remove caracteres não numéricos
                    .replace(/(\d{4})(\d)/, '$1-$2'); // Adiciona a máscara

                  field.onChange(formattedValue);
                  setNumberXPTO(formattedValue);
                }}
                placeholder="Número XPTO"
              />
            )}
          />

          {errorsNumberXPTO === '' ? (
            errors && (
              <span className="text-red-500 ">
                {errors.numberXPTO?.message}
              </span>
            )
          ) : (
            <span className="text-red-500 ">{errorsNumberXPTO}</span>
          )}
        </div>

        <Button
          disabled={!!errorsNumberXPTO || !!errors.numberXPTO}
          onClick={handleSubmit((data) => handleRegister(data))}
          className={
            !!errorsNumberXPTO || !!errors.numberXPTO
              ? 'bg-gray-400'
              : 'hover:bg-green-600'
          }
        >
          Cadastrar
        </Button>

        {alert && (
          <Alert message="Item cadastrado com sucesso!" type="success" />
        )}
      </div>
    </div>
  );
};
