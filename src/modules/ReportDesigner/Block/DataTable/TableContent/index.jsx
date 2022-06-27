/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */


// const xTableZones = [
//   {
//     "cells": [
//       {
//         "col": 1,
//         "expression": {
//           "dataType": "String",
//           "formula": "Тип учредителя",
//           "type": "Const"
//         },
//         "id": "R1.B.2.HH.1_1",
//         "row": 1,
//         "size": {
//           "minimalHeight": 12,
//           "minimalWidth": 100
//         },
//         "style": {
//           "background": {
//             "color": "#555555"
//           },
//           "font": {
//             "size": 12
//           }
//         }
//       },
//       {
//         "col": 2,
//         "expression": {
//           "dataType": "String",
//           "formula": "Наименование учредителя",
//           "type": "Const"
//         },
//         "id": "R1.B.2.HH.1_2",
//         "row": 1,
//         "size": {
//           "minimalWidth": 120
//         },
//         "style": {
//           "background": {
//             "color": "#555555"
//           },
//           "font": {
//             "size": 12
//           }
//         }
//       }
//     ],
//     "hType": "header",
//     "id": "R1.B.2.HH",
//     "shown": true,
//     "vType": "header"
//   },
//   {
//     "cells": [
//       {
//         "col": 1,
//         "expression": {
//           "dataType": "Date",
//           "formula": "=[Месяц]",
//           "parsedFormula": "=[DP0.D7]",
//           "type": "Dimension",
//           "variable_id": "DP0.D7"
//         },
//         "id": "R1.B.2.BH.1_1",
//         "row": 1,
//         "size": {
//           "minimalWidth": 70
//         },
//         "style": {
//           "background": {
//             "color": "#555555"
//           },
//           "font": {
//             "size": 12
//           }
//         }
//       }
//     ],
//     "hType": "body",
//     "id": "R1.B.2.BH",
//     "shown": true,
//     "vType": "header"
//   },
//   {
//     "cells": [
//       {
//         "col": 1,
//         "expression": {
//           "dataType": "String",
//           "formula": "Сумма:",
//           "type": "Const"
//         },
//         "id": "R1.B.2.FH.1_1",
//         "row": 1,
//         "style": {
//           "background": {
//             "color": "#555555"
//           },
//           "font": {
//             "size": 12
//           }
//         }
//       }
//     ],
//     "hType": "footer",
//     "id": "R1.B.2.FH",
//     "shown": true,
//     "vType": "header"
//   },
//   {
//     "cells": [
//       {
//         "col": 1,
//         "expression": {
//           "dataType": "String",
//           "formula": "=[Тип учредителя]",
//           "parsedFormula": "=[DP0.D2]",
//           "type": "Dimension",
//           "variable_id": "DP0.D2"
//         },
//         "id": "R1.B.2.HB.1_1",
//         "row": 1,
//         "size": {
//           "minimalHeight": 12
//         },
//         "style": {
//           "font": {
//             "size": 12
//           }
//         }
//       },
//       {
//         "col": 2,
//         "expression": {
//           "dataType": "String",
//           "formula": "=[Наименование учредителя]",
//           "parsedFormula": "=[DP0.D3]",
//           "type": "Dimension",
//           "variable_id": "DP0.D3"
//         },
//         "id": "R1.B.2.HB.1_2",
//         "row": 1,
//         "style": {
//           "font": {
//             "size": 12
//           }
//         }
//       }
//     ],
//     "hType": "header",
//     "id": "R1.B.2.HB",
//     "shown": true,
//     "vType": "body"
//   },
//   {
//     "cells": [
//       {
//         "col": 1,
//         "expression": {
//           "dataType": "Number",
//           "formula": "=[Доля(руб)]",
//           "parsedFormula": "=[DP0.M4]",
//           "type": "Measure",
//           "variable_id": "DP0.M4"
//         },
//         "id": "R1.B.2.BB.1_1",
//         "row": 1,
//         "size": {
//           "minimalWidth": 70
//         },
//         "style": {
//           "font": {
//             "size": 10
//           }
//         }
//       }
//     ],
//     "hType": "body",
//     "id": "R1.B.2.BB",
//     "shown": true,
//     "vType": "body"
//   },
//   {
//     "cells": [
//       {
//         "col": 1,
//         "expression": {
//           "dataType": "Number",
//           "formula": "=[Доля(руб)]",
//           "parsedFormula": "=[DP0.M4]",
//           "type": "Measure",
//           "variable_id": "DP0.M4"
//         },
//         "id": "R1.B.2.FB.1_1",
//         "row": 1,
//         "style": {
//           "font": {
//             "size": 11
//           }
//         }
//       }
//     ],
//     "hType": "footer",
//     "id": "R1.B.2.FB",
//     "shown": true,
//     "vType": "body"
//   },
//   {
//     "cells": [
//       {
//         "col": 1,
//         "expression": {
//           "dataType": "String",
//           "formula": "Все:",
//           "type": "Const"
//         },
//         "id": "R1.B.2.HF.1_1",
//         "row": 1,
//         "size": {
//           "minimalHeight": 12
//         },
//         "style": {
//           "background": {
//             "color": "#222222"
//           },
//           "font": {
//             "size": 12
//           }
//         }
//       },
//       {
//         "col": 2,
//         "id": "R1.B.2.HF.1_2",
//         "row": 1,
//         "style": {
//           "background": {
//             "color": "#222222"
//           },
//           "font": {
//             "size": 12
//           }
//         }
//       }
//     ],
//     "hType": "header",
//     "id": "R1.B.2.HF",
//     "shown": true,
//     "vType": "footer"
//   },
//   {
//     "cells": [
//       {
//         "col": 1,
//         "id": "R1.B.2.BH.1_1",
//         "row": 1,
//         "style": {
//           "background": {
//             "color": "#222222"
//           },
//           "font": {
//             "size": 12
//           }
//         }
//       }
//     ],
//     "hType": "body",
//     "id": "R1.B.2.BF",
//     "shown": true,
//     "vType": "footer"
//   },
//   {
//     "cells": [
//       {
//         "col": 1,
//         "expression": {
//           "dataType": "Number",
//           "formula": "=[Доля(руб)]",
//           "parsedFormula": "=[DP0.M4]",
//           "type": "Measure",
//           "variable_id": "DP0.M4"
//         },
//         "id": "R1.B.2.FF.1_1",
//         "row": 1,
//         "style": {
//           "background": {
//             "color": "#222222"
//           },
//           "font": {
//             "size": 12
//           }
//         }
//       }
//     ],
//     "hType": "footer",
//     "id": "R1.B.2.FF",
//     "shown": true,
//     "vType": "footer"
//   }
// ]


import TableBody from './TableBody';
import styles from './TableContent.module.scss';
import TableFooter from './TableFooter';
import TableHeader from './TableHeader';

const TableContent = ({
  layout,
  displayMode,
  blockStyles,
  // reportData,
  variables,
  tableType,
  ...props
}) => {
  // const dpData = reportData?.dpData;
  // const dpObjects = reportData?.dpObjects;

  const headerZone = layout.zones.filter(item => item.vType === 'header');
  const bodyZone = layout.zones.filter(item => item.vType === 'body');
  const footerZone = layout.zones.filter(item => item.vType === 'footer');

  return (
    <table style={{ ...blockStyles }}>
      <TableHeader
        data={headerZone}
        displayMode={displayMode}
        // reportData={{ dpData, dpObjects }}
        variables={variables}
        tableType={tableType}
      />
      <TableBody
        bodyZone={bodyZone}
        headerZone={headerZone}
        footerZone={footerZone}
        displayMode={displayMode}
        // reportData={{ dpData, dpObjects }}
        variables={variables}
        tableType={tableType}
      />
      <TableFooter
        data={footerZone}
        displayMode={displayMode}
        // reportData={{ dpData, dpObjects }}
        variables={variables}
        tableType={tableType}
      />
    </table>
  );
};

export default TableContent;
