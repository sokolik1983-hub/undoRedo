import React from 'react';
import SettingsInputComponentIcon from '@material-ui/icons/SettingsInputComponent';
import StorageIcon from '@material-ui/icons/Storage';
import PeopleIcon from '@material-ui/icons/People';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import AssignmentIcon from '@material-ui/icons/Assignment';
import LinkIcon from '@material-ui/icons/Link';

const navigationMenu = [
  {
    href: '/Reporting/connectors',
    icon: <LinkIcon />,
    title: 'коннекторы',
    id: 'connectors'
  },
  {
    href: '/Reporting/symlayers',
    icon: <SettingsInputComponentIcon />,
    title: 'семантика',
    id: 'symlayers'
  },
  {
    href: '/Reporting/audit',
    icon: <AssignmentIcon />,
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
