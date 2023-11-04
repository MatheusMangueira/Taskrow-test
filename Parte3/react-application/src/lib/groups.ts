import { Usuario } from '@/app/components/Search/types/usuario';
import { grupos as grupos } from './grupos.json';
import { Grupo } from '@/app/components/Search/types/grupo';

type UserWhere = keyof Usuario;

type GroupWhere = keyof Omit<Grupo, 'subGrupos'>;

class GroupManager {
  public searchUser<T = unknown>(
    where: UserWhere,
    value: T,
    groups: Grupo[] = grupos,
    result: Grupo[] = []
  ) {
    const isString = (value: unknown): value is string =>
      typeof value === 'string';

    for (const group of groups) {
      const userOnRoot = group.usuarios?.some((user) => {
        const userTarget = user[where];

        if (isString(userTarget) && isString(value)) {
          return userTarget.toLowerCase().includes(value.toLowerCase());
        }

        return userTarget === value;
      });

      const { subGrupos, ...groupWithoutSub } = group;

      if (userOnRoot) {
        result = result.concat(groupWithoutSub);
      }

      if (subGrupos) {
        result = this.searchUser(where, value, subGrupos, result);
      }
    }

    return result;
  }

  public searchGroup<T = unknown>(
    where: GroupWhere,
    value: T,
    groups: Grupo[] = grupos,
    usuarios: Usuario[] = []
  ): Usuario[] {
    for (const group of groups) {
      const isRootGroup = group[where] === value;

      if (isRootGroup) {
        usuarios = usuarios.concat(group.usuarios as Usuario[]);
      }

      if (group.subGrupos) {
        usuarios = this.searchGroup(where, value, group.subGrupos, usuarios);
      }
    }

    return usuarios;
  }
}

export const groupManager = new GroupManager();
