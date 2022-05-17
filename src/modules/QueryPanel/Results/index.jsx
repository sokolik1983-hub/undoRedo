import React, { useState, useEffect} from 'react';
import { useDispatch ,useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Divider from '../../../common/components/Divider';
import styles from './Results.module.scss';
import { ReactComponent as Reload } from '../../../layout/assets/queryPanel/reload.svg';
import { createQuery, getResultFromQuery, semanticLayerDataQuery } from '../../../data/actions/universes';
import { getCondition } from '../helper';
import ResultsTable from './ResultsTable';
import { useDragNDrop } from '../context/DragNDropContex';

const Results = ({ title, isQueryExecute, onQueryTextCreate, onObjFilEdit }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [queryResult, setQueryResult] = useState(null);
  const [timerValue, setTimerValue] = useState(null);
  const [errorText, setError] = useState('');

  const symLayerData = useSelector(state => state.app?.data?.symLayersData);
  const queryData = useSelector(state => state.app?.data?.queryData);
  const symLayerDataFromQuery = useSelector(state => state.app?.data?.symanticLayerQueryResult);
  const fetchingDataResult = useSelector(state => state.app?.data?.queryResult);

  const { objectsDesk, filtersDesk } = useDragNDrop();

  useEffect(() => {
    if (objectsDesk) {
      onObjFilEdit(objectsDesk, filtersDesk);
    }
  }, [objectsDesk, filtersDesk]);

  useEffect(() => {
    onQueryTextCreate(queryData?.data);
    if (queryData) {
      dispatch(semanticLayerDataQuery({
        connect_id: symLayerData.data.connector_id,
        sql: queryData.data,
        max_rows: 25,
        fields: objectsDesk
      }))
    }
  }, [queryData]);

  useEffect(() => {
    if (fetchingDataResult) {
      setQueryResult({...fetchingDataResult});
    } 
    clearInterval(timerValue);
    setTimerValue(null);
    setIsLoading(false);
  }, [fetchingDataResult]);

  const startFetchingData = (id) => {
    const timerVal = setInterval(() => {
      dispatch(getResultFromQuery({ id }));
    }, 1000);

    setTimerValue(timerVal);
  };

  useEffect(() => {
    if(symLayerDataFromQuery && isLoading) startFetchingData(symLayerDataFromQuery.id);
  }, [symLayerDataFromQuery]);

  const handleExecute = () => {
    const resultConditions = filtersDesk ? getCondition([filtersDesk]) : {};

    if (resultConditions === 'Empty Value') {
      setError('Пустой фильтр');
    } else {
      setError('');
      dispatch(createQuery({
        symlayer_id: symLayerData.symlayer_id,
        data: objectsDesk.map(item => `${item.parent_folder}.${item.field}`),
        conditions: resultConditions 
      }));
    }
  };
  
  useEffect(() => {
    if (isQueryExecute) {
      handleExecute();
      setIsLoading(true);
    }
  }, [isQueryExecute]);

  return (
    <div className={styles.wrapper}>
      <Divider color='#FFFFFF' />
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
        { queryResult && (
          <ResultsTable
            size='small'
            className={styles.table} 
            headersArr={queryResult.fields}
            bodyArr={queryResult.data}
          />
        )}
      </div>
      <span style={{color: 'red'}}>
        {errorText}
      </span>
    </div>
  );
};

export default Results;

Results.propTypes = {
  title: PropTypes.string,
  isQueryExecute: PropTypes.bool,
  onQueryTextCreate: PropTypes.func,
  onObjFilEdit: PropTypes.func
};