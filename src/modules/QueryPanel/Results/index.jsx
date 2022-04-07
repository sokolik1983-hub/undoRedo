import React, { useState, useEffect} from 'react';
import { useDispatch ,useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Divider from '../../../common/components/Divider';
import styles from './Results.module.scss';
import { ReactComponent as Reload } from '../../../layout/assets/queryPanel/reload.svg';
import { createQuery, getResultFromQuery, semanticLayerDataQuery } from '../../../data/actions/universes';
import ResultsTable from './ResultsTable';

const Results = ({ title, isQueryExecute }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [queryResult, setQueryResult] = useState(null);
  const [timerValue, setTimerValue] = useState(null);

  console.log(isLoading);

  const symLayerData = useSelector(state => state.app?.data?.symLayersData);
  const queryData = useSelector(state => state.app?.data?.queryData);
  const symLayerDataFromQuery = useSelector(state => state.app?.data?.symanticLayerQueryResult);
  const fetchingDataResult = useSelector(state => state.app?.data?.queryResult);
  const structure = symLayerData?.data?.structure[0];

  useEffect(() => {
    if (queryData) {
      dispatch(semanticLayerDataQuery({
        connect_id: symLayerData.data.connector_id,
        sql: queryData.data,
        max_rows: 25,
        fields: structure.children?.filter(item => item.select)?.slice(0,2)
      }))
    }
  }, [queryData]);

  useEffect(() => {
    console.log('*');
    if (fetchingDataResult) {
      setQueryResult({...fetchingDataResult});
      clearInterval(timerValue);
      setTimerValue(null);
      setIsLoading(false);
    } else if(fetchingDataResult?.errors?.length > 0) {
      clearInterval(timerValue);
      setTimerValue(null);
      setIsLoading(false);
    }
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
    dispatch(createQuery({
      symlayer_id: symLayerData.symlayer_id,
      data: structure.children?.filter(item => item.select)?.slice(0,2).map(item => `${item.parent_folder}.${item.field}`),
      conditions: {}
    }));
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
        <div className={styles.icons}>
          <Reload className={styles.iconsIndents} />
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
    </div>
  );
};

export default React.memo(Results);

Results.propTypes = {
  title: PropTypes.string,
  isQueryExecute: PropTypes.bool
};