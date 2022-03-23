import React from 'react';
import ConnectorsIcon from './layout/assets/ConnectorsIcon';
import LayersIcon from './layout/assets/LayersIcon';
import AuditIcon from './layout/assets/AuditIcon';
import RolesIcon from './layout/assets/RolesIcon';
import UsersIcon from './layout/assets/UsersIcon';
import { ReactComponent as BinIcon } from './layout/assets/icons/bin.svg';
import { ReactComponent as ExplorerIcon } from './layout/assets/icons/explorer.svg';

const navigationMenu = [
  {
    href: '/Universe/connectors',
    icon: <ConnectorsIcon />,
    title: 'коннекторы',
    id: 'connectors'
  },
  {
    href: '/Universe/symlayers',
    icon: <LayersIcon />,
    title: 'семантика',
    id: 'symlayers'
  },
  {
    href: '/Universe/audit',
    icon: <AuditIcon />,
    title: 'аудит',
    id: 'audit'
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
