const translitNames = (word) => {
  switch (word) {
    case 'Символ':
      return 'String';
    case 'Дата':
      return 'Datetime';
    case 'Номер':
      return 'Number';
    case 'Текст':
      return 'String';
    case 'Показатель':
      return 'Measure';
    case 'Измерение':
      return 'Dimension';
    case 'Атрибут':
      return 'Attribute';
    case 'Datetime':
      return 'Дата';
    case 'Number':
      return 'Номер';
    case 'String':
      return 'Текст';
    case 'Measure':
      return 'Показатель';
    case 'Dimension':
      return 'Измерение';
    case 'Attribute':
      return 'Атрибут';
    default:
      return null;
  }
};
export default translitNames;
