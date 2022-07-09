import Eight from '../../../layout/assets/reportDesigner/reportPageIcons/8.svg';
import AddTextIcon from '../../../layout/assets/reportDesigner/reportPageIcons/cell.svg';
import Filters from '../../../layout/assets/reportDesigner/reportPageIcons/filters.svg';
// import ChangeSourceIcon from '../../../layout/assets/reportDesigner/reportPageIcons/сhangeSourceIcon.svg';
// import ClearDataIcon from '../../../layout/assets/reportDesigner/reportPageIcons/сlearDataIcon.svg';
import Formula from '../../../layout/assets/reportDesigner/reportPageIcons/formula.svg';
import AddGraphIcon from '../../../layout/assets/reportDesigner/reportPageIcons/graph.svg';
import QueryPanelIcon from '../../../layout/assets/reportDesigner/reportPageIcons/queryPanelIcon.svg';
import Redo from '../../../layout/assets/reportDesigner/reportPageIcons/redo.svg';
import Dots from '../../../layout/assets/reportDesigner/reportPageIcons/reportDots.svg';
import Save from '../../../layout/assets/reportDesigner/reportPageIcons/save.svg';
import Zoom from '../../../layout/assets/reportDesigner/reportPageIcons/scale.svg';
import AddTableIcon from '../../../layout/assets/reportDesigner/reportPageIcons/table.svg';
import Undo from '../../../layout/assets/reportDesigner/reportPageIcons/undo.svg';
import UpdateIcon from '../../../layout/assets/reportDesigner/reportPageIcons/updateIcon.svg';

export const REPORT_PAGE_ACTIONS = [
    {
        type: 'divider',
        icon: <Dots />,
        enable: true,
    },
    {
        action: 'save',
        title: 'сохранить [Ctrl+S]',
        icon: <Save />,
        enable: true,
    },
    {
        action: 'undo',
        title: 'отменить [Ctrl+Z]',
        icon: <Undo />,
        enable: true,
    },
    {
        action: 'redo',
        title: 'вернуть [Ctrl+Y]',
        icon: <Redo />,
        enable: true,
    },
    {
        type: 'divider',
        icon: <Dots />,
        enable: true,
    },
    {
        action: 'showQueryPanel',
        title: 'панель запросов [Ctrl+Q]',
        icon: <QueryPanelIcon />,
        enable: true,
    },
    {
        // action: '',
        title: 'обновить [Ctrl+R]',
        icon: <UpdateIcon />,
        enable: true,
    },
    //   // action: '',
    //   title: 'изменить источник [Ctrl+K]',
    //   icon: <ChangeSourceIcon />,
    //   enable: true
    // },
    // {
    //   // action: '',
    //   title: 'очистить данные [Ctrl+E]',
    //   icon: <ClearDataIcon />,
    //   enable: true
    // },
    {
        type: 'divider',
        icon: <Dots />,
        enable: true,
    },
    {
        action: 'setTable',
        title: 'добавить таблицу [Ctrl+T]',
        icon: <AddTableIcon />,
        enable: true,
    },
    {
        action: 'setGraph',
        title: 'добавить диаграмму [Ctrl+D]',
        icon: <AddGraphIcon />,
        enable: true,
    },
    {
        action: 'addCell',
        title: 'добавить ячейку [Ctrl+T]',
        icon: <AddTextIcon />,
        enable: true,
    },
    {
        type: 'divider',
        icon: <Dots />,
        enable: true,
    },
    {
        action: 'formula',
        title: 'показать формулу',
        icon: <Formula />,
        enable: true,
    },
    {
        action: '',
        title: '',
        icon: <Filters />,
        enable: true,
    },
    {
        type: 'divider',
        icon: <Dots />,
        enable: true,
    },
    {
        action: 'zoom',
        title: 'масштаб',
        icon: <Zoom />,
        enable: true,
    },
    {
        action: '',
        title: '8',
        icon: <Eight />,
        enable: true,
    },
    {
        type: 'divider',
        icon: <Dots />,
        enable: true,
    },
];
