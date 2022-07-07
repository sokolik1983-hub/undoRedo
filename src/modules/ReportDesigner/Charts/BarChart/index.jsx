/* eslint-disable import/prefer-default-export */
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';

const data = [
  {
    "name": "Page A",
    "uv": 4000,
    "pv": 2400
  },
  {
    "name": "Page B",
    "uv": 3000,
    "pv": 1398
  },
  {
    "name": "Page C",
    "uv": 2000,
    "pv": 9800
  },
  {
    "name": "Page D",
    "uv": 2780,
    "pv": 3908
  },
  {
    "name": "Page E",
    "uv": 1890,
    "pv": 4800
  },
  {
    "name": "Page F",
    "uv": 2390,
    "pv": 3800
  },
  {
    "name": "Page G",
    "uv": 3490,
    "pv": 4300
  }
]
    
export const BarGraph = () => {
  return (
    <BarChart width={730} height={250} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="pv" fill="#8884d8" />
      <Bar dataKey="uv" fill="#82ca9d" />
    </BarChart>
  )
}
                          




// import React, { useEffect, useState, useRef } from 'react';
// import {
//   Cell,
//   ResponsiveContainer,
//   CartesianGrid,
//   XAxis,
//   YAxis,
//   Legend,
//   Bar,
//   BarChart,
//   Tooltip
// } from 'recharts';
// import lodash from 'lodash';
// import { useReportState } from '../../reportProvider';
// import formatNumber from './formatNumber';
// import { MenuContext } from '../menuContext';
// import CustomTooltip from './CustomTooltip';

// const BarGraph = ({
//   data,
//   id,
//   setGrapgType,
//   grapgType,
//   params,
//   setData,
//   setTableSelectione,
//   selectedFieldsOX,
//   selectedFieldsOY,
//   renderSelectedFields,
//   renderSelectedFieldsOX,
//   renderSelectedFieldsOY,
//   handleDropObjectOX,
//   handleDropObjectOY,
//   renderSelectedFieldsTable,
//   type,
//   setGraphView,
//   onActiveTable,
//   setHier,
//   setActiveNodes
// }) => {
//   const [widthName, setWidthName] = useState(0);
//   const [verticalLegend, setVerticalLegend] = useState('bottom'); // расположение легенды по вертикали сверху, снизу, посередине
//   const [horizontalLegend, setHorizontalLegend] = useState('center'); // расположение по горизонтали слева, в центре. справа
//   const [typeLegend, setTypeLegend] = useState('horizontal'); // тип легенды, вертикальная или горизонтальная
//   const [name, setName] = useState(''); // название графика
//   // const responseCont = useRef()
//   const [visible, setVisible] = useState(false);

//   const [selectedFields, setSelectedFields] = useState([]);
//   const [openModalToRemove, setOpenModalToRemove] = useState(false); // открытие модального окна, кнопки удалить
//   const [color, setColor] = useState('#b32aa9');
//   const [dataBar, setDataBar] = useState([]);
//   const [typeY, setTypeY] = useState(null);

//   const { reportStructure, dataset } = useReportState();
//   const [hasError, setHasError] = useState(false);

//   function getDataFromStore() {
//     if (dataset) {
//       const { fields, data } = dataset;

//       const selectedGraph = lodash.find(
//         reportStructure.blocks,
//         item => item.id == id
//       );

//       if (selectedGraph && selectedGraph.objects) {
//         const yAxis = selectedGraph.objects.filter(item => item.axis === 'Y');
//         const xAxis = selectedGraph.objects.filter(item => item.axis === 'X');
//         const xData = [];
//         const yData = [];

//         xAxis.forEach(xField => {
//           const dataIndex = lodash.findIndex(
//             fields,
//             it => it.name === xField.select
//           );
//           xData.push(data.map(dataItem => dataItem[dataIndex]));
//         });
//         yAxis.forEach(yField => {
//           const dataIndex = lodash.findIndex(
//             fields,
//             it => it.name === yField.select
//           );
//           yData.push(data.map(dataItem => dataItem[dataIndex]));
//         });
//         if (xData.length === 0 || yData.length === 0) {
//           setHasError(true);
//           return [];
//         }

//         const graphData = yData[0].map((yItem, idx) => {
//           return {
//             name: xData[0][idx],
//             value: yItem,
//             color: yAxis.length === 1 ? '#8884d8' : COLORS[idx]
//           };
//         });

//         if (hasError) {
//           setHasError(false);
//         }

//         return graphData;
//       }
//     }

//     return [];
//   }


//   useEffect(() => {
//     setDataBar(getDataFromStore());
//   }, []);

//   useEffect(() => {
//     setDataBar(getDataFromStore());
//   }, [reportStructure.blocks]);

//   // useEffect(() => {
//   //   // if (params.nameChurt){
//   //   //     setNameChurt(params.nameChurt)
//   //   // }
//   //   // if (params.horizontal){
//   //   //     setHorizontal(params.horizontal)
//   //   // }
//   //   // if (params.vertical){
//   //   //     setVertical(params.vertical)
//   //   // }
//   //   // if (params.verticalLegend){
//   //   //     setVerticalLegend(params.verticalLegend)
//   //   // }
//   //   // if (params.horizontalLegend){
//   //   //     setHorizontalLegend(params.horizontalLegend)
//   //   // }
//   //   // if (params.typeLegend){
//   //   //     setTypeLegend(params.typeLegend)
//   //   // }

//   //   setDataBar(data);
//   // }, []);

//   // React.useEffect(() => {
//   //   setDataBar(data);
//   // }, [data]);

//   const mouseMoveHandler = () => {
//     setVisible(true);
//   };
//   const moseoutHendler = () => {
//     setVisible(false);
//   };
//   function handleDropObject(event) {
//     const selectedEl = JSON.parse(event.dataTransfer.getData('text'));
//     setSelectedFields([...selectedFields, selectedEl.item]);
//   }
//   function allowDrop(ev) {
//     ev.preventDefault();
//   }

//   const handleClickModalToRemove = () => {
//     onActiveTable();
//     setOpenModalToRemove(true);
//   };

//   const CustomizedAxisTick = props => {
//     const { x, y, stroke, payload } = props;

//     return (
//       <g transform={`translate(${x},${y})`}>
//         <text
//           x={0}
//           y={5}
//           dy={5}
//           textAnchor="end"
//           fill="#666"
//           style={{ fontSize: '0.6vw' }}
//           transform="rotate(-40)"
//         >
//           {payload.value}
//         </text>
//       </g>
//     );
//   };
//   const CustomizedYAxisTick = props => {
//     const { x, y, stroke, payload } = props;
//     let value = null;
//     if (typeof payload.value === 'string') {
//       value = payload.value;
//     } else {
//       value = formatNumber(payload.value);
//     }
//     return (
//       <g transform={`translate(${x},${y})`}>
//         <text
//           x={0}
//           y={5}
//           dy={0}
//           textAnchor="end"
//           fill="#666"
//           style={{ fontSize: '0.6vw' }}
//           transform="rotate(0)"
//         >
//           {value}
//         </text>
//       </g>
//     );
//   };

//   // берем ширину контейнера и передаем в график, так чиобы график занимал 80% высоты контейнера
//   const container = useRef();
//   let heightContainer = 0;
//   // берет высоту контейнера для графиков
//   if (container.current) {
//     heightContainer =
//       parseInt(container.current.parentNode.parentNode.style.height) * 0.8;
//     // берет высоту контейнера для графиков в внутри таблицы
//     if (isNaN(heightContainer)) {
//       heightContainer =
//         parseInt(
//           container.current.parentNode.parentNode.parentNode.parentNode.style
//             .height
//         ) * 0.8;
//     }
//   }

//   // функция изменния данных на графике. Срабатывает при нажатии кнопки "Применить" если в меню графика перетащить объектына  ось OX и ось OY
//   const applyInGraphics = () => {
//     const newArrOXendOY = [];
//     // ось Х это name
//     // ось Y это value
//     selectedFieldsOX.forEach(item => {
//       data.forEach(elem => {
//         if (item.field === elem.fieldValue) {
//           newArrOXendOY.push({
//             name: elem.value,
//             fieldName: elem.fieldValue,
//             value: elem.name,
//             fieldValue: elem.fieldName,
//             color: elem.color
//           });
//         }
//         if (item.field === elem.fieldName) {
//           newArrOXendOY.push({
//             name: elem.name,
//             fieldName: elem.fieldName,
//             value: elem.value,
//             fieldValue: elem.fieldValue,
//             color: elem.color
//           });
//         }
//       });
//     });
//     setDataBar(newArrOXendOY);
//   };

//   useEffect(() => {
//     dataBar.forEach(elem => {
//       if (typeof elem.value !== 'number') {
//         setTypeY('category');
//       } else {
//         setTypeY('number');
//       }
//     });
//   }, [dataBar]);

//   return (
//     <MenuContext.Provider
//       value={{
//         applyInGraphics
//       }}
//     >
//       <div
//         ref={container}
//         onMouseOver={mouseMoveHandler}
//         onMouseOut={moseoutHendler}
//         style={{ overflow: 'hidden' }}
//         onDrop={handleDropObject}
//         onDragOver={allowDrop}
//         id={id}
//       >
        
//           <ResponsiveContainer minWidth={300} height={heightContainer}>
//             {data && data.length > 0 && (
//               <BarChart
//                 data={dataBar}
//                 margin={{
//                   top: 25,
//                   right: 10,
//                   left: 35,
//                   bottom: 35
//                 }}
//               >
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis
//                   dataKey="name"
//                   interval={0}
//                   tick={<CustomizedAxisTick />}
//                   padding={{ left: 0, right: 10 }}
//                 />

//                 <YAxis
//                   yAxisId="left"
//                   type={typeY}
//                   interval={0}
//                   orientation="left"
//                   stroke="#8884d8"
//                   tick={<CustomizedYAxisTick />}
//                 />
//                 {params && params.tooltip === 'show' && (
//                   <Tooltip content={<CustomTooltip />} />
//                 )}
//                 <Bar dataKey="value" yAxisId="left" barSize={30} fill="#fff">
//                   {dataBar &&
//                     dataBar.length > 0 &&
//                     dataBar.map((elem, index) => (
//                       <Cell
//                         dataKey={elem.value}
//                         key={`cell-${index}`}
//                         fill={elem.color}
//                         strokeWidth={index === 2 ? 4 : 1}
//                       />
//                     ))}
//                 </Bar>
//               </BarChart>
//             )}
//           </ResponsiveContainer>
//         )}
//       </div>
//     </MenuContext.Provider>
//   );
// };

// export default BarGraph;
