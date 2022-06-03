export const REP_OPEN_FILE = { result: true, thread: '4040171' };
export const REP_GET_REPORT_STRUCTURE = {
  result: true,
  structure: {
    pgBody: {
      content: {
        children: [
          {
            content: {
              expression: {
                dataType: 'String',
                formula: 'Название отчета',
                type: 'Const'
              }
            },
            id: 'R1.B.1',
            name: 'ячейка 1',
            position: { x: 20, xType: 'Absolute', y: 10, yType: 'Absolute' },
            size: {
              autofitHeight: false,
              autofitWidth: false,
              minimalHeight: 10,
              minimalWidth: 120
            },
            style: {},
            type: 'cell'
          },
          {
            content: {
              layout: {
                zones: [
                  {
                    cells: [
                      {
                        col: 1,
                        expression: {
                          dataType: 'String',
                          formula: 'Тип учредителя',
                          type: 'Const'
                        },
                        id: 'R1.B.2.H.1',
                        row: 1,
                        size: { minimalHeight: 12, minimalWidth: 100 },
                        style: { font: { size: 12 } }
                      },
                      {
                        col: 2,
                        expression: {
                          dataType: 'String',
                          formula: 'Наименование учредителя',
                          type: 'Const'
                        },
                        id: 'R1.B.2.H.2',
                        row: 1,
                        size: { minimalWidth: 200 },
                        style: { font: { size: 12 } }
                      },
                      {
                        col: 3,
                        expression: {
                          dataType: 'String',
                          formula: 'Доля(руб)',
                          type: 'Const'
                        },
                        id: 'R1.B.2.H.3',
                        row: 1,
                        size: { minimalWidth: 90 },
                        style: { font: { size: 12 } }
                      }
                    ],
                    hType: 'header',
                    id: 'R1.B.2.H',
                    shown: true,
                    vType: 'header'
                  },
                  {
                    cells: [
                      {
                        col: 1,
                        expression: {
                          dataType: 'String',
                          formula: '=[Тип учредителя]',
                          parsedFormula: '=[DP0.D2]',
                          type: 'Dimension',
                          variable_id: 'DP0.D2'
                        },
                        id: 'R1.B.2.B.1',
                        row: 1,
                        size: { minimalHeight: 11 },
                        style: { font: { size: 10 } }
                      },
                      {
                        col: 2,
                        expression: {
                          dataType: 'String',
                          formula: '=[Наименование учредителя]',
                          parsedFormula: '=[DP0.D3]',
                          type: 'Dimension',
                          variable_id: 'DP0.D3'
                        },
                        id: 'R1.B.2.B.2',
                        row: 1,
                        style: { font: { size: 8 } }
                      },
                      {
                        col: 3,
                        expression: {
                          dataType: 'Number',
                          formula: '=[Доля(руб)]',
                          parsedFormula: '=[DP0.M4]',
                          type: 'Measure',
                          variable_id: 'DP0.M4'
                        },
                        id: 'R1.B.2.B.3',
                        row: 1,
                        size: { minimalWidth: 90 },
                        style: { font: { size: 12 } }
                      }
                    ],
                    hType: 'header',
                    id: 'R1.B.2.B',
                    shown: true,
                    vType: 'body'
                  },
                  {
                    cells: [
                      {
                        col: 1,
                        id: 'R1.B.2.F.1',
                        row: 1,
                        size: { minimalHeight: 12 },
                        style: { font: { size: 11 } }
                      },
                      {
                        col: 2,
                        expression: {
                          dataType: 'String',
                          formula: 'Сумма:',
                          type: 'Const'
                        },
                        id: 'R1.B.2.F.2',
                        row: 1,
                        style: { font: { size: 11 } }
                      },
                      {
                        col: 3,
                        expression: {
                          dataType: 'Number',
                          formula: '=sum([Доля(руб)])',
                          parsedFormula: '=SUM([DP0.M4])',
                          type: 'Measure',
                          variable_id: 'DP0.M4'
                        },
                        id: 'R1.B.2.F.3',
                        row: 1,
                        style: { font: { size: 11 } }
                      }
                    ],
                    hType: 'header',
                    id: 'R1.B.2.F',
                    shown: false,
                    vType: 'footer'
                  }
                ]
              }
            },
            id: 'R1.B.2',
            name: 'таблица 1',
            position: { x: 20, xType: 'Absolute', y: 40, yType: 'Absolute' },
            size: {
              autofitHeight: false,
              autofitWidth: false,
              minimalHeight: 10
            },
            type: 'hTable'
          }
        ]
      },
      id: 'R1.B',
      name: 'тело отчета',
      size: { minimalHeight: 10 },
      type: 'pgBody'
    },
    pgFooter: {
      id: 'R1.PF',
      name: 'нижний колонтитул',
      size: { minimalHeight: 15 },
      type: 'pgFooter'
    },
    pgHeader: {
      id: 'R1.H',
      name: 'заготовок страницы',
      size: { minimalHeight: 10 },
      type: 'pgHeader'
    }
  }
};
export const REP_GET_VARIABLES = {
  result: true,
  variables: [
    {
      dataType: 'String',
      dp_id: 'DP0',
      formula: '=[Id]',
      id: 'DP0.D1',
      name: 'Id',
      parsedFormula: '=[DP0.D1]',
      type: 'Dimension',
      varType: 'DP'
    },
    {
      dataType: 'String',
      dp_id: 'DP0',
      formula: '=[Тип учредителя]',
      id: 'DP0.D2',
      name: 'Тип учредителя',
      parsedFormula: '=[DP0.D2]',
      type: 'Dimension',
      varType: 'DP'
    },
    {
      dataType: 'String',
      dp_id: 'DP0',
      formula: '=[Наименование учредителя]',
      id: 'DP0.D3',
      name: 'Наименование учредителя',
      parsedFormula: '=[DP0.D3]',
      type: 'Dimension',
      varType: 'DP'
    },
    {
      dataType: 'Number',
      dp_id: 'DP0',
      formula: '=[Доля(руб)]',
      id: 'DP0.M4',
      name: 'Доля(руб)',
      parsedFormula: '=[DP0.M4]',
      type: 'Measure',
      varType: 'DP'
    },
    {
      dataType: 'String',
      dp_id: 'DP0',
      formula: '=[Доля(%)]',
      id: 'DP0.M5',
      name: 'Доля(%)',
      parsedFormula: '=[DP0.M5]',
      type: 'Measure',
      varType: 'DP'
    },
    {
      dataType: 'Date',
      dp_id: 'DP0',
      formula: '=[Дата]',
      id: 'DP0.D6',
      name: 'Дата',
      parsedFormula: '=[DP0.D6]',
      type: 'Dimension',
      varType: 'DP'
    }
  ]
};
export const REP_GET_ELEMENT_DATA = { result: true, thread: '4040171' };
