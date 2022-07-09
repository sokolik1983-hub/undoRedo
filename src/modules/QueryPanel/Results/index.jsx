import PropTypes from 'prop-types';
/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Divider from '../../../common/components/Divider';
import {EMPTY_STRING} from '../../../common/constants/common';
import {
    createQuery,
    getResultFromQuery,
    semanticLayerDataQuery,
} from '../../../data/actions/universes';
import Reload from '../../../layout/assets/queryPanel/reload.svg';
import {useDragNDrop} from '../context/DragNDropContext';
import {getCondition} from '../helper';
import styles from './Results.module.scss';
import ResultsTable from './ResultsTable';

const Results = ({title, isQueryExecute, onQueryTextCreate, onObjFilEdit}) => {
    const dispatch = useDispatch();
    const [errorText, setError] = useState(EMPTY_STRING);

    const symLayerData = useSelector((state) => state.app?.data?.symLayersData);
    const queryData = useSelector((state) => state.app?.data?.queryData);
    const connectorId = useSelector((state) => {
        const {currentLayerTitle, data} =
            state.app?.data?.queryPanelSymlayersData;
        const currentLayer = data.find(
            (i) => i.queryTitle === currentLayerTitle,
        );
        return currentLayer?.connector_id || null;
    });

    const queryResult = useSelector((state) => state.app?.data?.queryResult);

    const {objectsDesk, filtersDesk} = useDragNDrop();

    useEffect(() => {
        if (objectsDesk) {
            onObjFilEdit(objectsDesk, filtersDesk);
        }
    }, [objectsDesk, filtersDesk]);

    useEffect(() => {
        onQueryTextCreate(queryData?.dpSql);
        // TODO: сделать проверку передаваемых параметров в semanticLayerDataQuery
        // if (queryData) {
        //   dispatch(
        //     semanticLayerDataQuery({
        //       connect_id: symLayerData.data.connector_id,
        //       sql: queryData.data,
        //       max_rows: 25,
        //       fields: objectsDesk
        //     })
        //   );
        // }
    }, [queryData]);

    // useEffect(() => {
    //   if (connectorId) {
    //     dispatch(
    //       getResultFromQuery({
    //         // TODO: id заменить на connectorId
    //         id: 'TA',
    //         dataType: 'Query',
    //         // catalog,
    //         // schema,
    //         // objectName,: 'Query'
    //         // fieldName,
    //         // query,
    //         // isDistinct,
    //         maxRows: 100
    //       })
    //     );
    //   }
    // }, [connectorId]);

    const handleExecute = () => {
        const resultConditions = filtersDesk ? getCondition([filtersDesk]) : {};

        if (resultConditions === 'Empty Value') {
            setError('Пустой фильтр');
        } else {
            setError(EMPTY_STRING);
            dispatch(
                createQuery({
                    symlayer_id: symLayerData.symlayer_id,
                    data: objectsDesk.map(
                        (item) => `${item.parent_folder}.${item.field}`,
                    ),
                    conditions: resultConditions,
                }),
            );
        }
    };

    useEffect(() => {
        if (isQueryExecute) {
            handleExecute();
        }
    }, [isQueryExecute]);

    return (
        <div className={styles.wrapper}>
            <Divider color="#FFFFFF" />
            <div className={styles.top}>
                <div className={styles.title}>{title}</div>
                <div className={styles.icon}>
                    <div className={styles.reloadWrapper}>
                        <Reload className={styles.reloadIcon} />
                        <div className={styles.hide}>
                            <p className={styles.reload}>обновить</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.content}>
                {queryResult && (
                    <ResultsTable
                        size="small"
                        className={styles.table}
                        headersArr={queryResult.description}
                        bodyArr={queryResult.data}
                    />
                )}
            </div>
            <span style={{color: 'red'}}>{errorText}</span>
        </div>
    );
};

export default Results;

Results.propTypes = {
    title: PropTypes.string,
    isQueryExecute: PropTypes.bool,
    onQueryTextCreate: PropTypes.func,
    onObjFilEdit: PropTypes.func,
};
