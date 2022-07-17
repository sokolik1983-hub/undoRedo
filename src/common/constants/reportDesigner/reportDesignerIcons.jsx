import Compare from '../../../layout/assets/reportDesigner/reportPageIcons/compare.svg';
import Correlation from '../../../layout/assets/reportDesigner/reportPageIcons/correlation.svg';
import CrossTable from '../../../layout/assets/reportDesigner/reportPageIcons/crossTable.svg';
import Distribution from '../../../layout/assets/reportDesigner/reportPageIcons/distribution.svg';
import Geography from '../../../layout/assets/reportDesigner/reportPageIcons/geography.svg';
import HorizontalTable from '../../../layout/assets/reportDesigner/reportPageIcons/horizontalTable.svg';
import Indicator from '../../../layout/assets/reportDesigner/reportPageIcons/indicator.svg';
import Proportion from '../../../layout/assets/reportDesigner/reportPageIcons/proportion.svg';
import Table from '../../../layout/assets/reportDesigner/reportPageIcons/table.svg';
import Trend from '../../../layout/assets/reportDesigner/reportPageIcons/trend.svg';
import VerticalTable from '../../../layout/assets/reportDesigner/reportPageIcons/verticalTable.svg';

export const TABLE_ICONS = [
    {
        text: 'Таблица',
        type: 'table',
        icon: <Table />,
    },
    {
        text: 'Кросс',
        type: 'xTable',
        icon: <CrossTable />,
    },
    {
        text: 'Вертикальная',
        type: 'vTable',
        icon: <VerticalTable />,
    },
    {
        text: 'Горизонтальная',
        type: 'hTable',
        icon: <HorizontalTable />,
    },
];

export const GRAPH_ICONS = [
    {
        text: 'Сравнения',
        type: 'compare',
        icon: <Compare />,
    },
    {
        text: 'Тренд',
        type: 'trend',
        icon: <Trend />,
    },
    {
        text: 'Пропорция',
        type: 'proportion',
        icon: <Proportion />,
    },
    {
        text: 'Распределение',
        type: 'distribution',
        icon: <Distribution />,
    },
    {
        text: 'Корреляция',
        type: 'correlation',
        icon: <Correlation />,
    },
    {
        text: 'География',
        type: 'geography',
        icon: <Geography />,
    },
    {
        text: 'Индикатор',
        type: 'indicator',
        icon: <Indicator />,
    },
];
