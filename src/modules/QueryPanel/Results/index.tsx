// @ts-nocheck
import React, { FC, useEffect, useState } from 'react';

import Divider from '../../../common/components/Divider';
import { EMPTY_STRING } from '../../../common/constants/common';
import { useAppDispatch, useAppSelector } from '../../../data/hooks/redux';
import { createQuery } from '../../../data/reportDesigner/queryPanelData/queryPanelDataActions';
import Reload from '../../../layout/assets/queryPanel/reload.svg';
import { useDragNDrop } from '../context/DragNDropContext';
import { getCondition } from '../helper';
import styles from './Results.module.scss';
import ResultsTable from './ResultsTable';

interface IResultProps {
  title: string;
  isQueryExecute: boolean;
  onQueryTextCreate: (dpSql: string) => void;
  onObjFilEdit: (objectsDesk: any, filtersDesk: any) => void;
}

const Results: FC<IResultProps> = ({
  title,
  isQueryExecute,
  onQueryTextCreate,
  onObjFilEdit,
}) => {
  const dispatch = useAppDispatch();
  const [errorText, setError] = useState<string>(EMPTY_STRING);

  const { connectorId, queryData, symLayerData, queryResult } = useAppSelector(
    (state) => {
      const { currentLayerTitle, data } =
        state.app?.reportDesigner?.queryPanelData;
      const currentLayer = data.find((i) => i.queryTitle === currentLayerTitle);
      return {
        connectorId: currentLayer?.connector_id || null,
        queryData: currentLayer?.queryData || null,
        symLayerData: currentLayer?.symLayerData || null,
        queryResult: currentLayer?.queryResult || null,
      };
    },
  );

  const { objectsDesk, filtersDesk } = useDragNDrop();

  useEffect(() => {
    if (objectsDesk) {
      onObjFilEdit(objectsDesk, filtersDesk);
    }
  }, [objectsDesk, filtersDesk]);

  useEffect(() => {
    onQueryTextCreate(queryData?.dpSql);
  }, [queryData]);

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
            headersArr={queryResult?.description}
            bodyArr={queryResult?.data}
          />
        )}
      </div>
      <span style={{ color: 'red' }}>{errorText}</span>
    </div>
  );
};

export default Results;
