/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {find} from 'lodash';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {getElementData} from '../../../../../../data/actions/newReportDesigner';
import {setFormattingElement} from '../../../../../../data/reducers/new_reportDesigner';
import Cell from '../../../Cell';
import styles from './TableHeader.module.scss';

const TableHeader = ({data, displayMode, reportData, tableType, ...props}) => {
    const dispatch = useDispatch();
    const [isFetching, setIsFetching] = useState(false);
    const [response, setResponse] = useState();
    const formattingElement = useSelector(
        (state) => state.app.reportDesigner?.reportsUi?.ui?.formattingElement,
    );

    useEffect(() => {
        if (displayMode === 'Data') {
            setIsFetching(true);
            dispatch(
                getElementData(
                    {report_id: 'R1', element_id: data[0].id},
                    (res) => {
                        setIsFetching(false);
                        setResponse(res);
                    },
                ),
            );
        }
    }, [displayMode]);

    if (tableType === 'hTable') return null;

    const handleClick = (zone, item) => {
        dispatch(setFormattingElement({zone, item}));
    };

    const renderData = () => {
        const getStyle = (index) => {
            return data?.[0].cells?.[index]
                ? data?.[0].cells?.[index].style
                : {};
        };

        return (
            response &&
            response?.data?.data?.map((item) => {
                return (
                    <tr key={item} data="data-row">
                        {item.map((cell, idx) => {
                            return (
                                // eslint-disable-next-line react/no-array-index-key
                                <th key={cell + idx} style={{...getStyle(idx)}}>
                                    {cell}
                                </th>
                            );
                        })}
                    </tr>
                );
            })
        );
    };

    const renderHTableCells = () => {
        return null;
        // return data?.map(zone => {
        //   return zone?.cells?.map(item => {
        //     return (
        //       <tr key={item.id}>
        //         <td onClick={() => handleClick('headerZone', item)}>
        //           <Cell
        //             displayMode={displayMode}
        //             blockStyles={item.styles}
        //             structureItem={item}
        //             id={item.id}
        //           />
        //         </td>
        //       </tr>
        //     );
        //   });
        // });
    };

    const renderCells = () => {
        if (tableType === 'hTable') return null;

        return data?.map((zone) => {
            return (
                <tr>
                    {zone?.cells?.map((item) => {
                        return (
                            <th
                                key={item.id}
                                onClick={() => handleClick('headerZone', item)}
                            >
                                <Cell
                                    displayMode={displayMode}
                                    blockStyles={item.style}
                                    structureItem={item}
                                    id={item.id}
                                    selected={
                                        formattingElement &&
                                        formattingElement.id === item.id
                                    }
                                />
                            </th>
                        );
                    })}
                </tr>
            );
        });
    };

    const renderHTable = () => {
        return (
            <thead>
                {!isFetching && displayMode === 'Data'
                    ? renderData()
                    : renderCells()}
            </thead>
        );
    };

    const renderVTable = () => {
        return (
            <thead>
                {!isFetching && displayMode === 'Data'
                    ? renderData()
                    : renderCells()}
            </thead>
        );
    };

    return (
        <thead>
            {!isFetching && displayMode === 'Data'
                ? renderData()
                : renderCells()}
        </thead>
    );
};

export default TableHeader;
