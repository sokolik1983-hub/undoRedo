import React from 'react';

import AdminIcon from './layout/assets/adminDashboardButton.svg';
import AuditIcon from './layout/assets/auditIcon.svg';
import ConnectorsIcon from './layout/assets/connectorsIcon.svg';
import DesighIcon from './layout/assets/designIcon.svg';
import BinIcon from './layout/assets/icons/bin.svg';
import ExplorerIcon from './layout/assets/icons/explorer.svg';
import LayersIcon from './layout/assets/layersIcon.svg';

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
        title: 'Отчеты',
        id: 'reports',
    },
    {
        href: '/administrator',
        icon: <AdminIcon />,
        title: 'Управление',
        id: 'roles',
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
