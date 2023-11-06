import { groupManager } from '@/lib/groups';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type Params = {
  params: {
    id: string;
  };
};

export default function GroupDetails({ params }: Params) {
  const groups = groupManager.searchGroup('idGrupo', Number(params.id));
  const users = groupManager.searchUser('nome', groups[0]?.nome);

  if (!users[0]) {
    notFound();
  }

  return (
    <div className="lg:px-10 p-2 max-w-[1920px] h-[calc(100vh-88px)] flex flex-col w-full ">
      <div className="w-full flex justify-between items-center pb-5">
        <h1 className="text-4xl pt-5 font-bold ">
          {' '}
          Detalhes individuais dos grupos
        </h1>
        <div>
          <Link
            className="h-5 bg-gray-400 p-2 rounded-md hover:bg-slate-300"
            href={'/grupos'}
          >
            {' '}
            Voltar
          </Link>
        </div>
      </div>
      <div className="bg-green-500 p-5 rounded-xl">
        {users.map((item) => (
          <div key={item.idGrupo}>
            <h4 className="text-3xl font-normal">
              Nome do Grupo: <span className="font-bold">{item.nome}</span>
            </h4>
            {item.usuarios?.map((usuario) => (
              <div key={usuario.idUsuario}>
                <p className="text-lg p-2 ">
                  Nome do usuario:
                  <span className="font-bold">{usuario.nome}</span>
                  <br />
                  ID do usuario:
                  <span className="font-bold">{usuario.idUsuario}</span>
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
