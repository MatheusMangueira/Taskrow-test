import { calculateDV, validateNumberXpto } from './numeroXpto';

const dv: number = calculateDV(4638);
const valido: boolean = validateNumberXpto(46387);

console.log(`Dígito verificador: ${dv}`);
console.log(`Número XPTO válido: ${valido}`);