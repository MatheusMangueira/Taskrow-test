import { Grupos } from "./grupos";


async function main() {
   const grupos = new Grupos();

   try {
      await grupos.carrega();

      grupos.busca("Raiz", (grupos) => {
         console.log('Grupos encontrados:', grupos);
      })


   } catch (error) {
      console.error('Erro ao carregar os grupos:', error);
   }

}

main();




