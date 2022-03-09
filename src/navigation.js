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
    href: '/Reporting/connectors',
    icon: <ConnectorsIcon />,
    title: 'коннекторы',
    id: 'connectors'
  },
  {
    href: '/Reporting/symlayers',
    icon: <LayersIcon />,
    title: 'семантика',
    id: 'symlayers'
  },
  {
    href: '/Reporting/audit',
    icon: <AuditIcon />,
    title: 'аудит',
    id: 'audit'
  },
  {
    href: '/Reporting/roles',
    icon: <RolesIcon />,
    title: 'роли',
    id: 'roles'
  },
  {
    href: '/Reporting/users',
    icon: <UsersIcon />,
    title: 'пользователи',
    id: 'users'
  },
  {
    href: '/Reporting/explorer',
    icon: <ExplorerIcon />,
    title: 'документы',
    id: 'explorer'
  },
  {
    href: '/Reporting/trash',
    icon: <BinIcon />,
    title: 'корзина',
    id: 'recycle'
  }
];

export default navigationMenu;
