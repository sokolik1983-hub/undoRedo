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
import { ReactComponent as FindTool } from '../../layout/assets/semanticActionsIcons/findTool.svg';
import { ReactComponent as RefreshStructure } from '../../layout/assets/semanticActionsIcons/refreshStructure.svg';
import { ReactComponent as Divider } from '../../layout/assets/headerActionsDivider.svg';


export const REDIRECT_LINKS = {
  HOME_PAGE: '/Reporting/dashboard',
  LOGIN_PAGE: '/Reporting/login'
};

export const PAGE_TITLES = {
  DASHBOARD: 'Главная страница',
  AUDIT: 'Аудит',
  TRASH: 'Корзина',
  SEMANTIC: 'Семантика',
  ROLES: 'Роли',
  USERS: 'Пользователи',
  CONNECTORS: 'Коннекторы',
  REPORTS: 'Отчеты',
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
  }
];

export const SEMANTIC_PAGE_ACTIONS = [
  {
    action: 'contextPanel',
    title: 'Панель контекстов',
    text: 'Панель контекстов',
    icon: <ContextPanel />,
  },
  {
    action: 'connectionsPanel',
    title: 'Панель связей',
    text: 'Панель связей',
    icon: <ConnectionsPanel />,
  },
  {
    type: 'divider',
    icon: <Divider />
  },
  {
    action: 'refreshStructure',
    title: 'Обновить структуру',
    text: 'Обновить структуру',
    icon: <RefreshStructure />,
  },
  {
    type: 'divider',
    icon: <Divider />
  },
  {
    action: 'defineConnections',
    title: 'Определить связи',
    text: 'Определить связи',
    icon: <DefineConnections />,
  },
  {
    action: 'addConnection',
    title: 'Добавить связь',
    text: 'Добавить связь',
    icon: <AddConnection />,
  },
  {
    type: 'divider',
    icon: <Divider />
  },
  {
    action: 'commonSearch',
    title: 'Общий поиск',
    text: 'Общий поиск',
    icon: <FindTool />,
  }
];
