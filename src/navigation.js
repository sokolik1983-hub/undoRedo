import React from 'react';
import SettingsInputComponentIcon from '@material-ui/icons/SettingsInputComponent';
import StorageIcon from '@material-ui/icons/Storage';
import PeopleIcon from '@material-ui/icons/People';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';

const navigationMenu = [
  {
    href: '/Reporting/audit',
    icon: <SettingsInputComponentIcon />,
    title: 'аудит',
    id: 'audit'
  },
  {
    href: '/Reporting/roles',
    icon: <StorageIcon />,
    title: 'роли',
    id: 'roles'
  },
  {
    href: '/Reporting/users',
    icon: <PeopleIcon />,
    title: 'пользователи',
    id: 'users'
  },
  {
    href: '/Reporting/trash',
    icon: <DeleteSweepIcon />,
    title: 'корзина',
    id: 'recycle'
  }
];

export default navigationMenu;
