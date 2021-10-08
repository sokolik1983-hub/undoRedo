import React from 'react';
import SettingsInputComponentIcon from '@material-ui/icons/SettingsInputComponent';
import StorageIcon from '@material-ui/icons/Storage';
import PeopleIcon from '@material-ui/icons/People';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';

const navigationMenu = [
  {
    href: '/Reporting/audit',
    icon: <SettingsInputComponentIcon />,
    title: 'Аудит',
    id: 'audit'
  },
  {
    href: '/Reporting/roles',
    icon: <StorageIcon />,
    title: 'Роли',
    id: 'roles'
  },
  {
    href: '/Reporting/users',
    icon: <PeopleIcon />,
    title: 'Пользователи и полномочия',
    id: 'users'
  },
  {
    href: '/Reporting/trash',
    icon: <DeleteSweepIcon />,
    title: 'Корзина',
    id: 'recycle'
  }
];

export default navigationMenu;
