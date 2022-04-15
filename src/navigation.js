import React from 'react';
import { ReactComponent as ConnectorsIcon } from './layout/assets/connectorsIcon.svg';
import { ReactComponent as LayersIcon } from './layout/assets/layersIcon.svg';
import { ReactComponent as AuditIcon } from './layout/assets/auditIcon.svg';
import { ReactComponent as RolesIcon } from './layout/assets/rolesIcon.svg';
import { ReactComponent as UsersIcon } from './layout/assets/usersIcon.svg';
import { ReactComponent as BinIcon } from './layout/assets/icons/bin.svg';
import { ReactComponent as ExplorerIcon } from './layout/assets/icons/explorer.svg';

const navigationMenu = [
  {
    href: '/Universe/connectors',
    icon: <ConnectorsIcon />,
    title: 'соединения',
    id: 'connectors'
  },
  {
    href: '/Universe/symlayers',
    icon: <LayersIcon />,
    title: 'слои',
    id: 'symlayers'
  },
  {
    href: '/Universe/audit',
    icon: <AuditIcon />,
    title: 'аудит',
    id: 'audit'
  },
  {
    href: '/Universe/reports',
    icon: <RolesIcon />,
    title: 'дизайнер',
    id: 'reports'
  },
  {
    href: '/Universe/roles',
    icon: <RolesIcon />,
    title: 'роли',
    id: 'roles'
  },
  {
    href: '/Universe/users',
    icon: <UsersIcon />,
    title: 'пользователи',
    id: 'users'
  },
  {
    href: '/Universe/explorer',
    icon: <ExplorerIcon />,
    title: 'документы',
    id: 'explorer'
  },
  {
    href: '/Universe/trash',
    icon: <BinIcon />,
    title: 'корзина',
    id: 'recycle'
  }
];

export default navigationMenu;
