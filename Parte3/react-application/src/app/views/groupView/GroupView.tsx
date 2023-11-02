import { FileTree } from '@/app/components/FileTree/FileTree';
import data from '@/app/service/grupos.json';

export const GroupView = () => {
  return (
    <div>
      <h1>Árvore de Grupos</h1>
      <FileTree grupo={data.grupos[0]} />
    </div>
  );
};
