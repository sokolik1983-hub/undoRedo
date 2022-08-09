// @ts-ignore
import uuid from 'react-uuid';

export const SQL_OPERATORS = [
  { action: 'LESS', text: '<' },
  { action: 'LESS_EQUALS', text: '<=' },
  { action: 'NO_EQUALS', text: '!=' },
  { action: 'EQUALS', text: '=' },
  { action: 'LARGER', text: '>' },
  { action: 'LARGER_EQUALS', text: '>=' },
  { action: 'AND', text: 'And' },
  { action: 'BETWEEN_AND', text: 'Between and' },
];

export const TABLE4_EXAMPLE = {
  id: 1,
  name: 'Table1',
  columns: [
    { id: uuid(), name: 'column1', type: 'Measure' },
    { id: uuid(), name: 'column2', type: 'Dimension' },
    { id: uuid(), name: 'column3', type: 'Dimension' },
    { id: uuid(), name: 'column4', type: 'Filter' },
    { id: uuid(), name: 'column5', type: 'Measure' },
    { id: uuid(), name: 'column1', type: 'Measure' },
    { id: uuid(), name: 'column2', type: 'Filter' },
    { id: uuid(), name: 'column3', type: 'Dimension' },
    { id: uuid(), name: 'column4', type: 'Measure' },
    { id: uuid(), name: 'column5', type: 'Filter' },
    { id: uuid(), name: 'column1', type: 'Dimension' },
    { id: uuid(), name: 'column2', type: 'Dimension' },
    { id: uuid(), name: 'column3', type: 'Filter' },
    { id: uuid(), name: 'column4', type: 'Measure' },
    { id: uuid(), name: 'column5', type: 'Dimension' },
  ],
};

export const TABLE1_EXAMPLE = {
  id: 1,
  name: 'Table1',
  columns: [
    { id: 1, name: 'column6' },
    { id: 2, name: 'column7' },
    { id: 3, name: 'column8' },
    { id: 4, name: 'column9' },
    { id: 5, name: 'column10' },
  ],
};

export const TABLE2_EXAMPLE = {
  id: 2,
  name: 'Table2',
  columns: [
    { id: 1, name: 'column6' },
    { id: 2, name: 'column7' },
    { id: 3, name: 'column8' },
    { id: 4, name: 'column9' },
    { id: 5, name: 'column10' },
  ],
};

export const TABLE3_EXAMPLE = {
  id: 3,
  name: 'Table3',
  columns: [
    { id: 1, name: 'column11' },
    { id: 2, name: 'column12' },
    { id: 3, name: 'column13' },
    { id: 4, name: 'column14' },
    { id: 5, name: 'column15' },
  ],
};

export const TABLES_NAME_FOR_CONNECT = {
  TABLE_A: 'Таблица А',
  TABLE_B: 'Таблица В',
};
