import TuneIcon from '@material-ui/icons/Tune';
import BrushIcon from '@material-ui/icons/Brush';
import ExtensionIcon from '@material-ui/icons/Extension';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import ForumIcon from '@material-ui/icons/Forum';
import InfoIcon from '@material-ui/icons/Info';
// import FilterListIcon from '@material-ui/icons/FilterList';
// import SortIcon from '@material-ui/icons/Sort';
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
import PhotoIcon from '@material-ui/icons/Photo';
import PaletteIcon from '@material-ui/icons/Palette';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { SIDE_PANEL_TYPES } from '../common';

export const NAV_MENU_REPORT = [
  { id: 1, title: 'Данные', icon: <ExtensionIcon /> },
  { id: 2, title: 'Структура', icon: <AccountTreeIcon /> },
  { id: 3, title: 'Комментарии', icon: <ForumIcon /> },
  { id: 4, title: 'Экспорт', icon: <InfoIcon /> }
];

export const NAV_MENU_BLOCK = [
  { id: 1, title: 'Данные', icon: <TuneIcon /> },
  // { id: 2, title: 'Filters', icon: <FilterListIcon /> },
  // { id: 3, title: 'Сортировка', icon: <SortIcon /> },
  { id: 4, title: 'Форматирование', icon: <BrushIcon /> }
];

export const NAV_MENU_GRAPH = [
  { id: 1, title: 'Просмотр', icon: <RemoveRedEyeIcon /> },
  { id: 2, title: 'Внешний вид', icon: <PhotoIcon /> },
  { id: 3, title: 'Стили', icon: <PaletteIcon /> },
  { id: 4, title: 'Формат', icon: <DashboardIcon /> }
];

export const getNavMenu = (navType) => {
  switch (navType) {
    case SIDE_PANEL_TYPES.CONFIG_MENU:
      return NAV_MENU_REPORT;
    case SIDE_PANEL_TYPES.BLOCK_MENU:
      return NAV_MENU_BLOCK;
    default:
      return [];
  }
}