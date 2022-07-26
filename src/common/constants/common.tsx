import { ReactNode } from 'react';
import React from 'react';

import ChangeUserIcon from '../../layout/assets/changeUser.svg';
import ExchangeDataIcon from '../../layout/assets/exchange.svg';
import EditIcon from '../../layout/assets/folderItemEdit.svg';
import GearIcon from '../../layout/assets/gear.svg';
import Divider from '../../layout/assets/headerActionsDivider.svg';
import LogoutIcon from '../../layout/assets/logout.svg';
import FaceIcon from '../../layout/assets/personCircle.svg';
import PrinterIcon from '../../layout/assets/printer.svg';
import RemoveFromFavoritesIcon from '../../layout/assets/removeFromFavorites.svg';
import AddConnection from '../../layout/assets/semanticActionsIcons/addConnection.svg';
import ConnectionsPanel from '../../layout/assets/semanticActionsIcons/connectionsPanel.svg';
import ContextPanel from '../../layout/assets/semanticActionsIcons/contextPanel.svg';
import DefineConnections from '../../layout/assets/semanticActionsIcons/defineConnections.svg';
import DisableAddConnection from '../../layout/assets/semanticActionsIcons/disAddConnection.svg';
import DisableConnectionsPanel from '../../layout/assets/semanticActionsIcons/disConnectionsPanel.svg';
import DisableContextPanel from '../../layout/assets/semanticActionsIcons/disContextPanel.svg';
import DisableDefineConnections from '../../layout/assets/semanticActionsIcons/disDefineConnections.svg';
import DisableRefreshStructure from '../../layout/assets/semanticActionsIcons/disRefreshStructure.svg';
import OpenSymLayer from '../../layout/assets/semanticActionsIcons/openSemantic.svg';
import RefreshStructure from '../../layout/assets/semanticActionsIcons/refreshStructure.svg';
import SaveSymLayer from '../../layout/assets/semanticActionsIcons/saveSemantic.svg';
import OpenTabsPanel from '../../layout/assets/semanticActionsIcons/tabsPanelIcon.svg';

export const TABLE_CELL_EMPTY_VALUE = '-';
export const BREADCRUMBS_ROOT = '..';
export const EMPTY_STRING = '';

export const REDIRECT_LINKS = {
  HOME_PAGE: '/dashboard',
  LOGIN_PAGE: '/login',
  SYMLAEYERS: '/symlayers/create',
  REPORT_CREATE: '/report',
  REPORT_SHOW: '/report',
};

export const PAGE_TITLES = {
  DASHBOARD: 'Главная страница',
  AUDIT: 'Аудит',
  TRASH: 'Корзина',
  SEMANTIC: 'Семантика',
  REPORT_DESIGNER: 'Дизайнер отчетов',
  ROLES: 'Роли',
  USERS: 'Пользователи',
  CONNECTORS: 'Коннекторы',
  REPORTS: 'Отчеты',
  QUERY_PANEL: 'Панель запросов',
  ADMIN: 'Управление',
};

export const FONT_LIST = [
  'Arial',
  'Times New Roman',
  'Book Antiqua',
  'Calibri',
  'Calisto MT',
  'Cambria',
  'Candara',
  'Century Gothic',
  'Comic Sans MS',
  'Consolas',
  'Constantia',
  'Copperplate Gothic',
  'Corbel',
  'Courier New',
  'Franklin Gothic',
  'Gabriola',
  'Georgia',
  'Impact',
  'Lucida Console',
  'Lucida Handwriting',
  'Lucida Sans Unicode',
  'Microsoft Sans Serif',
  'Palatino Linotype',
  'Segoe Print',
  'Segoe Script',
  'Segoe SD',
  'Segoe UI',
  'Segoe UI Historic',
  'Segoe UI Symbol',
  'Tahoma',
  'Trebuchet MS',
  'Verdana',
];

export const FONT_SIZE = [
  '9px',
  '10px',
  '11px',
  '12px',
  '14px',
  '16px',
  '18px',
  '20px',
  '22px',
  '24px',
  '26px',
  '28px',
  '36px',
  '48px',
  '72px',
];

export const SIDE_PANEL_TYPES = {
  CONFIG_MENU: 'CONFIG_MENU',
  BLOCK_MENU: 'BLOCK_MENU',
};

const userName = window.localStorage.getItem('userInfo');

export interface IDefaultUserActions {
  action: string;
  title: string;
  text: string | null;
  icon: ReactNode;
}

export const DEFAULT_USER_ACTIONS: IDefaultUserActions[] = [
  {
    action: 'user',
    title: 'Профиль',
    text: userName,
    icon: <FaceIcon />,
  },
  {
    action: 'print',
    title: 'Печать',
    text: 'Печать',
    icon: <PrinterIcon />,
  },
  {
    action: 'metadata',
    title: 'Обмен метаданными',
    text: 'Обмен метаданными',
    icon: <ExchangeDataIcon />,
  },
  {
    action: 'settings',
    title: 'Настройки',
    text: 'Настройки',
    icon: <GearIcon />,
  },
  {
    action: 'exit',
    title: 'Смена пользователя',
    text: 'Смена пользователя',
    icon: <ChangeUserIcon />,
  },
  {
    action: 'logout',
    title: 'Выход',
    text: 'Выход',
    icon: <LogoutIcon />,
  },
];

export const SEMANTIC_PAGE_ACTIONS = [
  {
    action: 'saveSymLayer',
    title: 'Сохранить семантический слой',
    // text: 'Сохранить семантический слой',
    icon: <SaveSymLayer />,
    enable: true,
    disIcon: <DisableAddConnection />,
  },
  {
    action: 'openSymLayer',
    title: 'Открыть семантический слой',
    // text: 'Открыть семантический слой',
    icon: <OpenSymLayer />,
    enable: true,
    disIcon: <DisableAddConnection />,
  },
  {
    type: 'divider',
    enable: true,
  },
  {
    action: 'tabsPanel',
    title: 'Панель таблиц и объектов',
    // text: 'Панель таблиц и объектов',
    icon: <OpenTabsPanel />,
    enable: true,
    disIcon: <DisableContextPanel />,
  },
  {
    action: 'connectionsPanel',
    title: 'Панель связей',
    // text: 'Панель связей',
    icon: <ConnectionsPanel />,
    enable: true,
    disIcon: <DisableConnectionsPanel />,
  },
  {
    action: 'contextPanel',
    title: 'Панель контекстов',
    // text: 'Панель контекстов',
    icon: <ContextPanel />,
    enable: true,
    disIcon: <DisableContextPanel />,
  },
  {
    type: 'divider',
    enable: true,
  },
  {
    action: 'refreshStructure',
    title: 'Обновить структуру',
    // text: 'Обновить структуру',
    icon: <RefreshStructure />,
    enable: true,
    disIcon: <DisableRefreshStructure />,
  },
  {
    type: 'divider',
    enable: true,
  },
  {
    action: 'defineConnections',
    title: 'Определить связи',
    // text: 'Определить связи',
    icon: <DefineConnections />,
    enable: true,
    disIcon: <DisableDefineConnections />,
  },
  {
    action: 'addConnection',
    title: 'Добавить связь',
    // text: 'Добавить связь',
    icon: <AddConnection />,
    enable: true,
    disIcon: <DisableAddConnection />,
  },
];

export enum BUTTON {
  BIG_BLUE = 'BIG_BLUE',
  BIG_ORANGE = 'BIG_ORANGE',
  BIG_GRAY = 'BIG_GRAY',
  BROWN = 'BROWN',
  BLUE = 'BLUE',
  GRAY = 'GRAY',
  BROWN_DARKER = 'BROWN_DARKER',
  RED = 'RED',
  BIG_RED = 'BIG_RED',
  SMALL_ORANGE = 'SMALL_ORANGE',
}

export const DRAG_PARENT_SECTION = {
  TREE: 'TREE',
  OBJECTS: 'OBJECTS',
  FILTERS: 'FILTERS',
};

// Значения типов временных уведомлений.
export const TOAST_TYPE = {
  SUCCESS: 'success',
  DANGER: 'danger',
};

export const HOME_PAGE_BUTTON_ACTIONS = [
  {
    title: 'Открыть',
    text: 'Открыть',
    icon: <EditIcon />,
    action: 'open',
  },
  {
    title: 'Удалить из избранного',
    text: 'Удалить из избранного',
    icon: <RemoveFromFavoritesIcon />,
    action: 'removeFromFavorites',
  },
];
