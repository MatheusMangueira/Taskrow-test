export const calculateDV = (num: number) => {
  if (num.toString().length !== 4) {
    throw new Error('Numero precisa ter 4 digitos');
  }

  const weights: number[] = [4, 5, 6, 7];
  const products: number[] = num
    .toString()
    .split('')
    .map((d, i) => parseInt(d) * weights[i]);

  let sum: number = 0;
  for (const val of products) {
    sum += val;
  }

  const restDivision: number = sum % 20;
  const sumSeven: number = restDivision + 7;
  const dv: number = sumSeven % 10;
  return dv;
};

export const validateNumberXpto = (num: number): boolean => {
  const numStr: string = num.toString();

  if (num < 10004 || num > 99995) {
    throw new Error('Número inválido - fora da faixa de 10004 a 99995');
  }
  if (numStr.length !== 5) {
    throw new Error('Número inválido - precisa ter 5 digitos');
  }

  const dv: number = parseInt(numStr[numStr.length - 1]);
  const semDV: number = parseInt(numStr.slice(0, -1));
  return calculateDV(semDV) === dv;
};
