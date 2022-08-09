import React from 'react';

import DateIcon from '../../../layout/assets/icons/dateIcon.svg';
import NumberIcon from '../../../layout/assets/icons/numberIcon.svg';
import SymbolIcon from '../../../layout/assets/icons/symbolIcon.svg';
import TextIcon from '../../../layout/assets/icons/textIcon.svg';
import AttributeIcon from '../../../layout/assets/queryPanel/attributeIcon.svg';
import GaugeIcon from '../../../layout/assets/queryPanel/gauge_icon.svg';
import MeasureIcon from '../../../layout/assets/queryPanel/measurementIcon.svg';

export const selectDataOptions = [
  { icon: <SymbolIcon />, text: 'Символ', value: 'Symbol', action: '' },
  { icon: <DateIcon />, text: 'Дата', value: 'Datetime', action: '' },
  { icon: <TextIcon />, text: 'Номер', value: 'Number', action: '' },
  { icon: <NumberIcon />, text: 'Текст', value: 'String', action: '' },
];

export const selectTypeOptions = [
  { icon: <GaugeIcon />, text: 'Показатель', value: 'Dimension', action: '' },
  { icon: <MeasureIcon />, text: 'Измерение', value: 'Measure', action: '' },
  { icon: <AttributeIcon />, text: 'Атрибут', value: 'Attribute', action: '' },
];
