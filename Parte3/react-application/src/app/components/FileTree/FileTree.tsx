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
}

export const FileTree = ({ grupo }: GroupTreeViewProps) => {
  return (
    <div style={{ marginLeft: '10px' }}>
      {grupo.nome}
      {grupo.usuarios && (
        <ul>
          {grupo.usuarios.map((usuario) => (
            <li key={usuario.idUsuario}>{usuario.nome}</li>
          ))}
        </ul>
      )}
      {grupo.subGrupos && (
        <ul>
          {grupo.subGrupos.map((subGrupo) => (
            <FileTree key={subGrupo.idGrupo} grupo={subGrupo} />
          ))}
        </ul>
      )}
    </div>
  );
};

export const GroupTreeView = ({ grupo }: GroupTreeViewProps) => {
  return (
    <div>
      {grupo.nome}
      {grupo.usuarios && (
        <ul>
          {grupo.usuarios.map((usuario) => (
            <li key={usuario.idUsuario}>{usuario.nome}</li>
          ))}
        </ul>
      )}
      {grupo.subGrupos && (
        <ul>
          {grupo.subGrupos.map((subGrupo) => (
            <FileTree key={subGrupo.idGrupo} grupo={subGrupo} />
          ))}
        </ul>
      )}
    </div>
  );
};
