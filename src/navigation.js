import React from 'react';
import { ReactComponent as ConnectorsIcon } from './layout/assets/connectorsIcon.svg';
import { ReactComponent as LayersIcon } from './layout/assets/layersIcon.svg';
import { ReactComponent as AuditIcon } from './layout/assets/auditIcon.svg';
import { ReactComponent as RolesIcon } from './layout/assets/rolesIcon.svg';
import { ReactComponent as DesighIcon } from './layout/assets/designIcon.svg';
import { ReactComponent as BinIcon } from './layout/assets/icons/bin.svg';
import { ReactComponent as ExplorerIcon } from './layout/assets/icons/explorer.svg';

const navigationMenu = [
  {
    href: '/connectors',
    icon: <ConnectorsIcon />,
    title: 'Соединения',
    id: 'connectors'
  },
  {
    href: '/symlayers',
    icon: <LayersIcon />,
    title: 'Семантика',
    id: 'symlayers'
  },
  {
    href: '/audit',
    icon: <AuditIcon />,
    title: 'Аудит',
    id: 'audit'
  },
  {
    href: '/reports',
    icon: <DesighIcon />,
    title: 'Отчеты',
    id: 'reports'
  },
  {
    href: '/explorer',
    icon: <ExplorerIcon />,
    title: 'Документы',
    id: 'explorer'
  },
  {
    href: '/trash',
    icon: <BinIcon />,
    title: 'Корзина',
    id: 'recycle'
  },
  {
    href: '/administrator',
    icon: <RolesIcon />,
    title: 'Администрирование',
    id: 'roles'
  }
];

export default navigationMenu;
