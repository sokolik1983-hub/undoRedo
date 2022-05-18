import React from 'react';
import { ReactComponent as ConnectorsIcon } from './layout/assets/connectorsIcon.svg';
import { ReactComponent as LayersIcon } from './layout/assets/layersIcon.svg';
import { ReactComponent as AuditIcon } from './layout/assets/auditIcon.svg';
import { ReactComponent as RolesIcon } from './layout/assets/rolesIcon.svg';
import { ReactComponent as DesighIcon } from './layout/assets/designIcon.svg';
import { ReactComponent as UsersIcon } from './layout/assets/usersIcon.svg';
import { ReactComponent as BinIcon } from './layout/assets/icons/bin.svg';
import { ReactComponent as ExplorerIcon } from './layout/assets/icons/explorer.svg';

const navigationMenu = [
  {
    href: '/Universe/connectors',
    icon: <ConnectorsIcon />,
    title: 'Соединения',
    id: 'connectors'
  },
  {
    href: '/Universe/symlayers',
    icon: <LayersIcon />,
    title: 'Семантика',
    id: 'symlayers'
  },
  {
    href: '/Universe/audit',
    icon: <AuditIcon />,
    title: 'Аудит',
    id: 'audit'
  },
  {
    href: '/Universe/reports',
    icon: <DesighIcon />,
    title: 'Дизайнер',
    id: 'reports'
  },
  {
    href: '/Universe/roles',
    icon: <RolesIcon />,
    title: 'Роли',
    id: 'roles'
  },
  {
    href: '/Universe/users',
    icon: <UsersIcon />,
    title: 'Пользователи',
    id: 'users'
  },
  {
    href: '/Universe/explorer',
    icon: <ExplorerIcon />,
    title: 'Документы',
    id: 'explorer'
  },
  {
    href: '/Universe/trash',
    icon: <BinIcon />,
    title: 'Корзина',
    id: 'recycle'
  }
];

export default navigationMenu;
