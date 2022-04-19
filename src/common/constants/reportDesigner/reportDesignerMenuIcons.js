import { ReactComponent as Save } from '../../../layout/assets/reportDesigner/reportPageIcons/save.svg';
import { ReactComponent as Undo } from '../../../layout/assets/reportDesigner/reportPageIcons/undo.svg';
import { ReactComponent as Redo } from '../../../layout/assets/reportDesigner/reportPageIcons/redo.svg';
import { ReactComponent as QueryPanelIcon } from '../../../layout/assets/reportDesigner/reportPageIcons/queryPanelIcon.svg';
import { ReactComponent as UpdateIcon } from '../../../layout/assets/reportDesigner/reportPageIcons/updateIcon.svg';
import { ReactComponent as Dots } from '../../../layout/assets/reportDesigner/reportPageIcons/reportDots.svg';
import { ReactComponent as ChangeSourceIcon } from '../../../layout/assets/reportDesigner/reportPageIcons/сhangeSourceIcon.svg';
import { ReactComponent as ClearDataIcon } from '../../../layout/assets/reportDesigner/reportPageIcons/сlearDataIcon.svg';
import { ReactComponent as AddSection } from '../../../layout/assets/reportDesigner/reportPageIcons/addSection.svg';
import { ReactComponent as AddGap } from '../../../layout/assets/reportDesigner/reportPageIcons/addGap.svg';
import { ReactComponent as Seven } from '../../../layout/assets/reportDesigner/reportPageIcons/7.svg';
import { ReactComponent as Eight } from '../../../layout/assets/reportDesigner/reportPageIcons/8.svg';
import { ReactComponent as AddTableIcon } from '../../../layout/assets/reportDesigner/reportPageIcons/table.svg';
import { ReactComponent as AddGraphIcon } from '../../../layout/assets/reportDesigner/reportPageIcons/graph.svg';
import { ReactComponent as AddTextIcon } from '../../../layout/assets/reportDesigner/reportPageIcons/cell.svg';

// eslint-disable-next-line import/prefer-default-export
export const REPORT_PAGE_ACTIONS = [

  {
    type: 'divider',
    icon: <Dots />,
    enable: true
  },
  {
    // action: 'save',
    title: 'сохранить [Ctrl+S]',
    icon: <Save />,
    enable: true
  },
  {
    action: 'undo',
    title: 'отменить [Ctrl+Z]',
    icon: <Undo />,
    enable: true
  },
  {
    action: 'redo',
    title: 'вернуть [Ctrl+Y]',
    icon: <Redo />,
    enable: true
  },
  { 
    type: 'divider',
    icon: <Dots />,
    enable: true
  },
  {
    action: 'showQueryPanel',
    title: 'панель запросов [Ctrl+Q]',
    icon: <QueryPanelIcon />,
    enable: true
  },
  {
    // action: '',
    title: 'обновить [Ctrl+R]',
    icon: <UpdateIcon />,
    enable: true
  },
  {
    // action: '',
    title: 'изменить источник [Ctrl+K]',
    icon: <ChangeSourceIcon />,
    enable: true
  },
  {
    // action: '',
    title: 'очистить данные [Ctrl+E]',
    icon: <ClearDataIcon />,
    enable: true
  },
  { 
    type: 'divider',
    icon: <Dots />,
    enable: true
  },
  {
    action: 'setTable',
    title: 'добавить таблицу [Ctrl+T]',
    icon: <AddTableIcon />,
    enable: true
  },
  {
    action: 'setGraph',
    title: 'добавить диаграмму [Ctrl+D]',
    icon: <AddGraphIcon />,
    enable: true
  },
  {
    // action: '',
    title: 'добавить текстовое поле [Ctrl+T]',
    icon: <AddTextIcon />,
    enable: true
  },
  {
    action: '',
    title: 'добавить раздел [Ctrl+M]',
    icon: <AddSection />,
    enable: true
  },
  {
    action: '',
    title: 'добавить разрыв [Ctrl+B]',
    icon: <AddGap />,
    enable: true
  },
  {
    type: 'divider',
    icon: <Dots />,
    enable: true
  },
  {
    action: '',
    title: '7',
    icon: <Seven />,
    enable: true
  },
  {
    action: '',
    title: '8',
    icon: <Eight />,
    enable: true
  },
  {
    type: 'divider',
    icon: <Dots />,
    enable: true
  }
];