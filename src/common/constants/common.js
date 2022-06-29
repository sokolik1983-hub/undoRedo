import { ReactComponent as ChangeUserIcon } from '../../layout/assets/changeUser.svg';
import { ReactComponent as ExchangeDataIcon } from '../../layout/assets/exchange.svg';
import { ReactComponent as FaceIcon } from '../../layout/assets/face.svg';
import { ReactComponent as GearIcon } from '../../layout/assets/gear.svg';
import { ReactComponent as LogoutIcon } from '../../layout/assets/logout.svg';
import { ReactComponent as PrinterIcon } from '../../layout/assets/printer.svg';
import { ReactComponent as AddConnection } from '../../layout/assets/semanticActionsIcons/addConnection.svg';
import { ReactComponent as ConnectionsPanel } from '../../layout/assets/semanticActionsIcons/connectionsPanel.svg';
import { ReactComponent as ContextPanel } from '../../layout/assets/semanticActionsIcons/contextPanel.svg';
import { ReactComponent as DefineConnections } from '../../layout/assets/semanticActionsIcons/defineConnections.svg';
import { ReactComponent as RefreshStructure } from '../../layout/assets/semanticActionsIcons/refreshStructure.svg';
import { ReactComponent as Divider } from '../../layout/assets/headerActionsDivider.svg';
import { ReactComponent as DisableAddConnection } from '../../layout/assets/semanticActionsIcons/disAddConnection.svg';
import { ReactComponent as DisableConnectionsPanel } from '../../layout/assets/semanticActionsIcons/disConnectionsPanel.svg';
import { ReactComponent as DisableContextPanel } from '../../layout/assets/semanticActionsIcons/disContextPanel.svg';
import { ReactComponent as DisableDefineConnections } from '../../layout/assets/semanticActionsIcons/disDefineConnections.svg';
import { ReactComponent as DisableRefreshStructure } from '../../layout/assets/semanticActionsIcons/disRefreshStructure.svg';

export const TABLE_CELL_EMPTY_VALUE = '-';
export const BREADCRUMBS_ROOT = '..';
export const EMPTY_STRING = '';

export const REDIRECT_LINKS = {
  HOME_PAGE: '/dashboard',
  LOGIN_PAGE: '/login',
  SYMLAEYERS: '/symlayers/create',
  REPORT_CREATE: '/report/create/1'
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
  ADMIN: 'Администрирование'
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
  'Verdana'
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
  '72px'
];

export const SIDE_PANEL_TYPES = {
  CONFIG_MENU: 'CONFIG_MENU',
  BLOCK_MENU: 'BLOCK_MENU'
};

export const DEFAULT_USER_ACTIONS = [
  {
    action: 'user',
    title: 'Профиль',
    text: 'Профиль',
    icon: <FaceIcon />
  },
  {
    action: 'print',
    title: 'Печать',
    text: 'Печать',
    icon: <PrinterIcon />
  },
  {
    action: 'metadata',
    title: 'Обмен метаданными',
    text: 'Обмен метаданными',
    icon: <ExchangeDataIcon />
  },
  {
    action: 'settings',
    title: 'Настройки',
    text: 'Настройки',
    icon: <GearIcon />
  },
  {
    action: 'exit',
    title: 'Смена пользователя',
    text: 'Смена пользователя',
    icon: <ChangeUserIcon />
  },
  {
    action: 'logout',
    title: 'Выход',
    text: 'Выход',
    icon: <LogoutIcon />
  }
];

export const SEMANTIC_PAGE_ACTIONS = [
  {
    action: 'contextPanel',
    title: 'Панель контекстов',
    text: 'Панель контекстов',
    icon: <ContextPanel />,
    enable: true,
    disIcon: <DisableContextPanel />
  },
  {
    action: 'connectionsPanel',
    title: 'Панель связей',
    text: 'Панель связей',
    icon: <ConnectionsPanel />,
    enable: true,
    disIcon: <DisableConnectionsPanel />
  },
  {
    type: 'divider',
    icon: <Divider />,
    enable: true
  },
  {
    action: 'refreshStructure',
    title: 'Обновить структуру',
    text: 'Обновить структуру',
    icon: <RefreshStructure />,
    enable: false,
    disIcon: <DisableRefreshStructure />
  },
  {
    type: 'divider',
    icon: <Divider />,
    enable: true
  },
  {
    action: 'defineConnections',
    title: 'Определить связи',
    text: 'Определить связи',
    icon: <DefineConnections />,
    enable: true,
    disIcon: <DisableDefineConnections />
  },
  {
    action: 'addConnection',
    title: 'Добавить связь',
    text: 'Добавить связь',
    icon: <AddConnection />,
    enable: true,
    disIcon: <DisableAddConnection />
  }
];

export const BUTTON = {
  BIG_BLUE: 'BIG_BLUE',
  BIG_ORANGE: 'BIG_ORANGE',
  BIG_GRAY: 'BIG_GRAY',
  BROWN: 'BROWN',
  BLUE: 'BLUE',
  GRAY: 'GRAY',
  BROWN_DARKER: 'BROWN_DARKER',
  RED: 'RED',
  BIG_RED: 'BIG_RED',
  SMALL_ORANGE: 'SMALL_ORANGE'
};

export const DRAG_PARENT_SECTION = {
  TREE: 'TREE',
  OBJECTS: 'OBJECTS',
  FILTERS: 'FILTERS'
};

// Значения типов временных уведомлений.
export const TOAST_TYPE = {
  SUCCESS: 'success',
  DANGER: 'danger'
};
