export const ViewItems = [
  { value: 'viewTitle', label: 'Заголовок' },
  { value: 'dataLabel', label: 'Метка данных' },
];

export const CategoryAxisItems = [
  { value: 'categoryAxis', label: 'Ось категории' },
  { value: 'categoryAxisTitle', label: 'Заголовок' },
];

export const ValueAxisItems = [
  { value: 'valueAxis', label: 'Ось значений' },
  { value: 'valueAxisTitle', label: 'Заголовок' },
];

export const HideItems = [
  { value: 'hideWhenEmpty', label: 'Скрывать, когда пусто' },
  { value: 'hideAlways', label: 'Скрывать всегда' },
  { value: 'hideWhenFormulaIsCorrect', label: 'Скрывать, когда формула верна' },
];

export const MeasureGaugeItems = [
  {
    value: 'avoidDuplicateRowAggregation',
    label: 'Избегать агрегирования дубликатов строк',
  },
  {
    value: 'showMeasureValuesWithEmptyGaugeValues',
    label: 'Показывать значения показателя с пустыми значениями измерения',
  },
  {
    value: 'showGaugeValuesWithEmptyMeasureValues',
    label: 'Показывать значения измерения с пустыми значениями показателя',
  },
  {
    value: 'showGaugeValuesWithZeroValue',
    label: 'Показывать значения показателя, когда значение = 0',
  },
  {
    value: 'showGaugeValuesWithSumOfZeroValues',
    label: 'Показывать значения показателя, для которых сумма значений = 0',
  },
];

export const FormatVerticalItems = [
  { value: 'avoidPageBreaks', label: 'Избегать разрывов страниц' },
  { value: 'startOnNewPage', label: 'Начало на новой странице' },
  { value: 'repeatOnEveryPage', label: 'Повторять на каждой странице' },
];

export const FormatHorizontalItems = [
  { value: 'avoidPageBreaks', label: 'Избегать разрывов страниц' },
  { value: 'startOnNewPage', label: 'Начало на новой странице' },
  { value: 'repeatOnEveryPage', label: 'Повторять на каждой странице' },
];

export const values = {
  name: '',
  value: '',
  label: '',
};
