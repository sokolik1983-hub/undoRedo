import { ReactComponent as Save } from '../../../layout/assets/reportPageIcons/save.svg';
import { ReactComponent as Undo } from '../../../layout/assets/reportPageIcons/undo.svg';
import { ReactComponent as Redo } from '../../../layout/assets/reportPageIcons/redo.svg';
import { ReactComponent as One } from '../../../layout/assets/reportPageIcons/1.svg';
import { ReactComponent as Two } from '../../../layout/assets/reportPageIcons/2.svg';
import { ReactComponent as Dots } from '../../../layout/assets/reportPageIcons/reportDots.svg';
import { ReactComponent as Three } from '../../../layout/assets/reportPageIcons/3.svg';
import { ReactComponent as Four } from '../../../layout/assets/reportPageIcons/4.svg';
import { ReactComponent as Five } from '../../../layout/assets/reportPageIcons/5.svg';
import { ReactComponent as Six } from '../../../layout/assets/reportPageIcons/6.svg';
import { ReactComponent as Seven } from '../../../layout/assets/reportPageIcons/7.svg';
import { ReactComponent as Eight } from '../../../layout/assets/reportPageIcons/8.svg';
import { ReactComponent as Table } from '../../../layout/assets/reportPageIcons/table.svg';
import { ReactComponent as Graph } from '../../../layout/assets/reportPageIcons/graph.svg';
import { ReactComponent as Cell } from '../../../layout/assets/reportPageIcons/cell.svg';

// eslint-disable-next-line import/prefer-default-export
export const REPORT_PAGE_ACTIONS = [

  {
    icon: <Dots />,
    enable: true
  },
  {
    // action: 'save',
    title: 'Сохранить',
    icon: <Save />,
    enable: true
  },
  {
    action: 'undo',
    title: 'Отмена изменений',
    icon: <Undo />,
    enable: true
  },
  {
    action: 'redo',
    title: 'Вернуть изменения',
    icon: <Redo />,
    enable: true
  },
  {
    icon: <Dots />,
    enable: true
  },
  {
    // action: '',
    title: '1',
    icon: <One />,
    enable: true
  },
  {
    // action: '',
    title: '2',
    icon: <Two />,
    enable: true
  },
  {
    // action: '',
    title: '3',
    icon: <Three />,
    enable: true
  },
  {
    // action: '',
    title: '4',
    icon: <Four />,
    enable: true
  },
  {
    icon: <Dots />,
    enable: true
  },
  {
    action: 'setTable',
    title: 'Вставить таблицу',
    icon: <Table />,
    enable: true
  },
  {
    action: 'setGraph',
    title: 'Вставить график',
    icon: <Graph />,
    enable: true
  },
  {
    // action: 'setCell',
    title: 'Вставить ячейку',
    icon: <Cell />,
    enable: true
  },
  {
    action: '',
    title: '5',
    icon: <Five />,
    enable: true
  },
  {
    action: '',
    title: '6',
    icon: <Six />,
    enable: true
  },
  {
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
];