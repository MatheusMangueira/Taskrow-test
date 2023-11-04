'use client';

import { cn } from '@/lib/utils';
import { FolderNotchOpen } from 'phosphor-react';
import { useState } from 'react';
import Link from 'next/link';

interface Usuario {
  idUsuario: number;
  nome: string;
}

interface Grupo {
  idGrupo: number;
  nome: string;
  usuarios?: Usuario[];
  subGrupos?: Grupo[];
}

interface GroupTreeViewProps {
  grupo: Grupo;
  filterGroups?: Grupo[];
}

export const FileTree = ({ grupo, filterGroups }: GroupTreeViewProps) => {
  const [open, setOpen] = useState(true);

  const handleOpenFile = () => {
    setOpen((prev) => !prev);
  };

  const isHighlighted = filterGroups?.some(
    (group) => group.idGrupo === grupo.idGrupo
  );

  return (
    <div className="ml-5 w-fit h-full">
      <div className="flex items-center gap-1 cursor-pointer p-1">
        <FolderNotchOpen size={18} onClick={handleOpenFile} />
        <Link
          href={`/grupos/${grupo.idGrupo}`}
          className={cn(
            isHighlighted && 'bg-gray-500 rounded-md p-1',
            open && 'text-green-800',
            'whitespace-nowrap flex gap-2 cursor-pointer text-gray-70 hover:text-black'
          )}
        >
          {grupo.nome}
        </Link>
      </div>
      {grupo.usuarios && open && (
        <ul>
          {grupo.usuarios.map((usuario) => (
            <li className="whitespace-nowrap" key={usuario.idUsuario}>
              {' '}
              - {usuario.nome}
            </li>
          ))}
        </ul>
      )}
      {grupo.subGrupos && open && (
        <ul>
          {grupo.subGrupos.map((subGrupo) => (
            <FileTree
              key={subGrupo.idGrupo}
              grupo={subGrupo}
              filterGroups={filterGroups}
            />
          ))}
        </ul>
      )}
    </div>
  );
};
