import React, { useState, useEffect} from 'react';
import { useDispatch ,useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Divider from '../../../common/components/Divider';
import styles from './Results.module.scss';
import { ReactComponent as Reload } from '../../../layout/assets/queryPanel/reload.svg';
import { createQuery, getResultFromQuery, semanticLayerDataQuery } from '../../../data/actions/universes';
import ResultsTable from './ResultsTable';
import { useDragNDrop } from '../context/DragNDropContex';

const Results = ({ title, isQueryExecute, onQueryTextCreate }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [queryResult, setQueryResult] = useState(null);
  const [timerValue, setTimerValue] = useState(null);

  const symLayerData = useSelector(state => state.app?.data?.symLayersData);
  const queryData = useSelector(state => state.app?.data?.queryData);
  const symLayerDataFromQuery = useSelector(state => state.app?.data?.symanticLayerQueryResult);
  const fetchingDataResult = useSelector(state => state.app?.data?.queryResult);

  const { objectsDesk, filtersDesk } = useDragNDrop();

  useEffect(() => {
    console.log(filtersDesk)
  }, [filtersDesk]);

  const conditionSwitcher = (cond) => {
    console.log('\n', cond,'\n', 'соответствие образцу', '\n', cond === 'соответствие образцу')
    switch (cond) {
      case 'ИЛИ' :
        return 'OR';
      case 'И' :
        return 'AND';
      case 'равно' :
        return 'EQUAL';
      case 'меньше чем':
        return 'LESS_THAN';
      case 'меньше чем или равно':
        return 'LESS_THAN_EQUAL';
      case 'более чем':
        return 'MORE_THAN';
      case 'более чем или равно':
        return 'MORE_THAN_EQUAL';
      case 'в списке':
        return 'IN';
      case 'не в списке':
        return 'NOT_IN';
      case 'между':
        return 'BETWEEN';
      case 'соответсвие образцу':
        return 'LIKE';
      default :
        return null;
    }
  }

  const getCondition = (condition) => {
    function getChildren(item) {
      return {
        children: {
          prefix: conditionSwitcher(item.condition),
          data: item.children.map(child => {
            if (child && child.fieldItem) {
              return {
                field:
                  `${child.fieldItem.parent_folder}.${child.fieldItem.field}`,
                value: child.inputValue,
                cond_type: conditionSwitcher(child.itemCondition)
              };
            }

            if (child && child.children) {
              return getChildren(child);
            }

            return null;
          })
        }
      };
    }

    const resultString = {};
    console.log(condition)

    condition.forEach(item => {
      if (item?.type === 'filter-node') {
        resultString.prefix = conditionSwitcher(item.condition);
        resultString.data = item.children.map(child => {
          if (child && child.fieldItem) {
            return {
              field:
                `${child.fieldItem.parent_folder}.${child.fieldItem.field}`,
              value: child.inputValue,
              cond_type: conditionSwitcher(child.itemCondition)
            };
          }

          if (child && child.children) {
            return getChildren(child);
          }

          return null;
        });
      }
      else if (item.type === 'filter-item') {
        resultString.prefix = 'AND';
        resultString.data = [{
          field:  `${item.fieldItem.parent_folder}.${item.fieldItem.field}`,
          value: item.inputValue,
          cond_type: conditionSwitcher(item.itemCondition)
        }]
      }
    });

    console.log(resultString, 'resultString');
    return resultString;
  };

  useEffect(() => {
    console.log(queryData?.data);
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
    dispatch(createQuery({
      symlayer_id: symLayerData.symlayer_id,
      data: objectsDesk.map(item => `${item.parent_folder}.${item.field}`),
      conditions: getCondition([filtersDesk]) 
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
    </div>
  );
};

export default Results;

Results.propTypes = {
  title: PropTypes.string,
  isQueryExecute: PropTypes.bool,
  onQueryTextCreate: PropTypes.func
};