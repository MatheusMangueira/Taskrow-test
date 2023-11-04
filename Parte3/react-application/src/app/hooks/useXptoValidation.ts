import { useState } from 'react';
import { calculateDV, validateNumberXpto } from '../utils/numberXpto';

export const useXptoValidation = (numberXPTO: string) => {
  const [errorsNumberXPTO, setErrorsNumberXPTO] = useState<string>('');
  const formatNumber = Number(numberXPTO.replace(/-/g, ''));

  const handleNumberXPTO = () => {
    const numStr: string = numberXPTO.toString();
    const semDV: number = parseInt(numStr.slice(0, -1).replace(/-/g, ''));
    if (validateNumberXpto(formatNumber) && calculateDV(semDV)) {
      setErrorsNumberXPTO('');
    } else {
      setErrorsNumberXPTO('Número XPTO inválido');
    }
  };

  const validateXpto = () => {
    if (
      numberXPTO.length === 6 &&
      formatNumber >= 10004 &&
      formatNumber <= 99995
    ) {
      setErrorsNumberXPTO('');
      handleNumberXPTO();
    } else {
      setErrorsNumberXPTO('O número XPTO deve estar na faixa de 10004 a 99995');
    }
  };

  return { validateXpto, errorsNumberXPTO };
};
