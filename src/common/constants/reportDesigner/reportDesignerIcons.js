/* eslint-disable no-unused-vars */
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
  // {
  //   text: 'Таблица',
  //   type: 'table',
  //   icon: <Table />,
  // },
  {
    text: 'Кросс',
    type: 'xTable',
    icon: <CrossTable />
  },
  {
    text: 'Вертикальная',
    type: 'vTable',
    icon: <VerticalTable />
  },
  {
    text: 'Горизонтальная',
    type: 'hTable',
    icon: <HorizontalTable />
  },
];

export const GRAPH_ICONS = [
  {
    text: 'Сравнения',
    type: 'barChart',
    icon: <Compare />,
  },
  {
    text: 'Тренд',
    type: 'lineChart',
    icon: <Trend />
  },
  {
    text: 'Пропорция',
    type: 'pieChart',
    icon: <Proportion />
  },
  // {
  //   text: 'Распределение',
  //   type: 'distribution',
  //   icon: <Distribution />
  // },{
  //   text: 'Корреляция',
  //   type: 'correlation',
  //   icon: <Correlation />
  // },
  // {
  //   text: 'География',
  //   type: 'geography',
  //   icon: <Geography />
  // },
  // {
  //   text: 'Индикатор',
  //   type: 'indicator',
  //   icon: <Indicator />
  // },
];