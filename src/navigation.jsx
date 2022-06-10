import React from 'react';

import AuditIcon from './layout/assets/auditIcon.svg';
import ConnectorsIcon from './layout/assets/connectorsIcon.svg';
import DesighIcon from './layout/assets/designIcon.svg';
import BinIcon from './layout/assets/icons/bin.svg';
import ExplorerIcon from './layout/assets/icons/explorer.svg';
import LayersIcon from './layout/assets/layersIcon.svg';
import RolesIcon from './layout/assets/rolesIcon.svg';
import UsersIcon from './layout/assets/usersIcon.svg';

const navigationMenu = [
    {
        href: '/connectors',
        icon: <ConnectorsIcon />,
        title: 'Соединения',
        id: 'connectors',
    },
    {
        href: '/symlayers',
        icon: <LayersIcon />,
        title: 'Семантика',
        id: 'symlayers',
    },
    {
        href: '/audit',
        icon: <AuditIcon />,
        title: 'Аудит',
        id: 'audit',
    },
    {
        href: '/reports',
        icon: <DesighIcon />,
        title: 'Дизайнер',
        id: 'reports',
    },
    {
        href: '/roles',
        icon: <RolesIcon />,
        title: 'Роли',
        id: 'roles',
    },
    {
        href: '/users',
        icon: <UsersIcon />,
        title: 'Пользователи',
        id: 'users',
    },
    {
        href: '/explorer',
        icon: <ExplorerIcon />,
        title: 'Документы',
        id: 'explorer',
    },
    {
        href: '/trash',
        icon: <BinIcon />,
        title: 'Корзина',
        id: 'recycle',
    },
];

export default navigationMenu;
