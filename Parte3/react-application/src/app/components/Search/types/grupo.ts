import { Usuario } from './usuario';

export interface Grupo {
  idGrupo: number;
  nome: string;
  usuarios?: Usuario[];
  subGrupos?: Grupo[];
}

export interface GruposJSON {
  grupos: Grupo[];
}
