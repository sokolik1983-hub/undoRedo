import { ReactComponent as Table } from '../../../layout/assets/reportDesigner/reportPageIcons/table.svg';
import { ReactComponent as CrossTable } from '../../../layout/assets/reportDesigner/reportPageIcons/crossTable.svg';
import { ReactComponent as VerticalTable } from '../../../layout/assets/reportDesigner/reportPageIcons/verticalTable.svg';
import { ReactComponent as HorizontalTable } from '../../../layout/assets/reportDesigner/reportPageIcons/horizontalTable.svg';

import { ReactComponent as Compare } from '../../../layout/assets/reportDesigner/reportPageIcons/compare.svg';
import { ReactComponent as Trend } from '../../../layout/assets/reportDesigner/reportPageIcons/trend.svg';
import { ReactComponent as Proportion } from '../../../layout/assets/reportDesigner/reportPageIcons/proportion.svg';
import { ReactComponent as Distribution } from '../../../layout/assets/reportDesigner/reportPageIcons/distribution.svg';
import { ReactComponent as Correlation } from '../../../layout/assets/reportDesigner/reportPageIcons/correlation.svg';
import { ReactComponent as Geography } from '../../../layout/assets/reportDesigner/reportPageIcons/geography.svg';
import { ReactComponent as Indicator } from '../../../layout/assets/reportDesigner/reportPageIcons/indicator.svg';

export const TABLE_ICONS = [
  {
    text: 'Таблица',
    type: 'table',
    icon: <Table />,
  },
  {
    text: 'Кросс',
    type: 'table_cross',
    icon: <CrossTable />
  },
  {
    text: 'Вертикальная',
    type: 'table_vertical',
    icon: <VerticalTable />
  },
  {
    text: 'Горизонтальная',
    type: 'table_horizontal',
    icon: <HorizontalTable />
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
    icon: <Trend />
  },
  {
    text: 'Пропорция',
    type: 'proportion',
    icon: <Proportion />
  },
  {
    text: 'Распределение',
    type: 'distribution',
    icon: <Distribution />
  },{
    text: 'Корреляция',
    type: 'correlation',
    icon: <Correlation />
  },
  {
    text: 'География',
    type: 'geography',
    icon: <Geography />
  },
  {
    text: 'Индикатор',
    type: 'indicator',
    icon: <Indicator />
  },
];