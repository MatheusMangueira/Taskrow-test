import * as fs from "fs";
import { Grupo, GruposJSON } from "./types/grupo";


export class Grupos {
   private dados: GruposJSON | null = null;

   constructor() { }

   public async carrega(): Promise<void> {
      try {
         const rawData = fs.readFileSync('./grupos.json');
         const jsonData = JSON.parse(rawData.toString());
         this.dados = jsonData as GruposJSON;

      } catch (error) {
         console.error('Erro ao carregar o arquivo:', error);
      }
   }

   public getDados(): GruposJSON | null {
      return this.dados;
   }


   public busca(nome: string, callback: (grupos: Grupo[]) => void) {
      const result = this.dados!.grupos.filter((grupo) => grupo.nome.includes(nome));
      callback(result);
   }


}
