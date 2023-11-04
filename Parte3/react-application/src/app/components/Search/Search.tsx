'use client';

import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { FileTree } from '../FileTree';
import { Grupo } from './types/grupo';

import { grupos } from '@/lib/grupos.json';
import { groupManager } from '@/lib/groups';

export const Search = () => {
  const [search, setSearch] = useState('');
  const [filteredGroups, setFilteredGroups] = useState<Grupo[]>([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
  };

  useEffect(() => {
    if (!search) return setFilteredGroups([]);
    const filtered = groupManager.searchUser('nome', search);
    setFilteredGroups(Array.from(filtered));
  }, [search]);

  return (
    <div className="w-full h-full lg:flex-row flex-col flex gap-10">
      <div className="bg-[#eaeaea] lg:w-fit w-full p-5">
        <h1 className="font-bold text-xl whitespace-nowrap ">
          Lista de Grupos
        </h1>

        <div className="pt-3">
          Buscar
          <Input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Digite o nome "
          />
        </div>

        <div className="pt-3">
          {grupos.map((grupo) => (
            <FileTree
              key={grupo.idGrupo}
              filterGroups={filteredGroups}
              grupo={grupo}
            />
          ))}
        </div>
      </div>

      <div className="bg-[#eaeaea] w-full p-5">
        <h1 className="pt-5 font-bold text-xl ">Detalhes do Grupo</h1>
        <div className="pt-5">
          {filteredGroups
            ? grupos.map((item) => (
                <div className="w-full" key={item.idGrupo}>
                  <p className="w-full bg-green-200 p-4 font-bold mb-5">
                    {item.nome}
                  </p>
                  {item?.usuarios?.map((usuario) => (
                    <div className="w-full pt-2" key={usuario.idUsuario}>
                      <p className="ml-5 border-b-2 pb-2 border-black">
                        - {usuario.nome}
                      </p>
                    </div>
                  ))}
                </div>
              ))
            : 'Nenhum grupo selecionado'}
        </div>
      </div>
    </div>
  );
};
