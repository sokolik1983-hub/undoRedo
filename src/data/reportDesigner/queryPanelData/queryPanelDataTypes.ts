export interface IPromptQp {
  id: number;
  code: string;
  name: string;
  dataType: string | number | Date;
  isMultiple: 0 | 1;
  defaultValue: string;
  list_id: number;
  isSaveLast: 0 | 1;
}

export interface IPropertiesQp {
  maxTime_sec: number;
  maxRows: number;
}

export enum OBJECT_TYPES_QP {
  FOLDER = 'Folder',
  MEASURE = 'Measure',
  DIMENSION = 'Dimension',
  ATTRIBUTE = 'Attribute',
  FILTER = 'Filter',
}

export interface IObjectsQp {
  id: number;
  parent_id: number;
  name: string;
  description: string;
  dataType: string | number | Date;
  objectType: OBJECT_TYPES_QP;
  mask: string;
}

export interface IRootFolderQp extends IObjectsQp {
  children: (IRootFolderQp | IObjectsQp)[];
}

export interface IListQp {
  id: number;
  name: string;
}

export interface ICcQpData {
  connector_id: number;
  properties: IPropertiesQp;
  objects: IObjectsQp[];
  lists: IListQp[];
  prompts: IPromptQp[];
}

export interface IUnvGetDataQpRes {
  qpData: ICcQpData;
  result: 0 | 1;
}

export interface IQueryData {
  result: number;
  dpSql: string;
}

export interface IQueryResult {
  result: 0 | 1;
  description: any[];
  name: string;
  type: string | number | Date;
  data: string[];
}

export interface IData {
  symLayerData: IRootFolderQp | IObjectsQp;
  symLayerName: string;
  symlayer_id: number;
  objects: any;
  filters: any;
  queryTitle: string;
  dpId: string;
  connector_id: number;
  universeId: number;
  queryData: IQueryData | null;
  queryResult: IQueryResult | null;
  symanticLayerQueryResult: any;
}

export interface IInitialState {
  currentLayerTitle: null;
  data: IData[];
}

//===================== UNV.GET_SQL=====================
export enum OPERAND_CODES {
  EQUAL = 'EQUAL',
  NOT_EQUAL = 'NOT_EQUAL',
  IN_LIST = 'IN_LIST',
  NOT_IN_LIST = 'NOT_IN_LIST',
  BETWEEN = 'BETWEEN',
  NOT_BETWEEN = 'NOT_BETWEEN',
  MORE = 'MORE',
  MORE_OR_EQUAL = 'MORE_OR_EQUAL',
  LESS = 'LESS',
  LESS_OR_EQUAL = 'LESS_OR_EQUAL',
  LIKE = 'LIKE',
  NOT_LIKE = 'NOT_LIKE',
  NOT_NULL = 'NOT_NULL',
  IS_NULL = 'IS_NULL',
}

export interface IUnvGetSqlQueryParamsFilter {
  id: number;
  folder_id: number;
  parentDimension_id: number | null;
  name: string;
  folderName: string;
  parentDimensionName: string | null;
  dataType: string;
  objectType: OBJECT_TYPES_QP;
}

export interface IUnvGetSqlQueryParams {
  dpUniverse_id: number;
  dpSpec: {
    queryType: string;
    querySetType: string | null;
    queries: IUnvGetSqlQueryParams[] | null;
    select: IUnvGetSqlQueryParamsFilter[] | null;
    filter: {
      type: string;
      blockOperator: 'AND' | 'OR';
      // TODO: типизировать все закоментированные поля
      // blockContent: ;
      // filterTarget: ;
      // filterOperator: ;
      // filterOperand1: ;
      // filterOperand2: ;
    };
    dpProperties: {
      maxRows: number;
      maxTime_sec: number;
      lastConetxt_id: number | null;
      keepLastContext: 0 | 1;
    };
    context_id: number;
  };
}

export interface IUnvGetSqlQueryResSuccess {
  result: 1;
  dpSql: string;
}

export interface IUnvGetSqlQueryResError {
  result: 0;
  contexts: any[];
  id: number;
  name: string;
}

export type IUnvGetSqlQueryRes =
  | IUnvGetSqlQueryResSuccess
  | IUnvGetSqlQueryResError;
