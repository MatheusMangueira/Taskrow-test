import * as fs from "fs";
import { Grupo, GruposJSON } from "./types/grupo";
import { Usuario } from "./types/usuario";

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


   public busca(where: keyof Usuario, value: number | string, callback: (grupos: Grupo[]) => void) {
      const isString = (value: number | string): value is string => typeof value === 'string'

      const handlerfilterGroups = (groups: Grupo[], matches: Grupo[] = []): Grupo[] =>{
        for (const group of groups) {
          const isRoot = group.usuarios?.some((user) => {
            const condition = user[where]

            if (isString(condition) && isString(value)) {
              return condition.toLowerCase().includes(value.toLowerCase());
            }

            return condition === value;
          });

          const { subGrupos: _, ...groupWithoutSub } = group;
    
          if (isRoot) {
            matches = matches.concat(groupWithoutSub);
          }
    
          if (group.subGrupos) {
            matches = handlerfilterGroups(group.subGrupos, matches);
          }
        }
    
        return matches;
      }
  
      callback(handlerfilterGroups(this.dados?.grupos || []));
   }


}
