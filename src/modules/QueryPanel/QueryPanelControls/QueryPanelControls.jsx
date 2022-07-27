import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import Button from '../../../common/components/Button';
import styles from './QueryPanelControls.module.scss';

const QueryPanelControls = ({ onSql, onRun, onApply, onClose }) => {
  const currentLayer = useSelector((state) => {
    const { currentLayerTitle, data } =
      state?.app?.reportDesigner?.queryPanelData;
    return data?.find((i) => i.queryTitle === currentLayerTitle);
  });

  const isDisabled = !currentLayer?.objects.length;

  return (
    <div className={styles.buttonsWrapper}>
      <Button onClick={onSql} className={styles.sql} disabled={isDisabled}>
        Показать SQL
      </Button>
      <Button onClick={onRun} className={styles.run} disabled={isDisabled}>
        Запустить
      </Button>
      <Button onClick={onApply} className={styles.apply} disabled={isDisabled}>
        Применить
      </Button>
      <Button onClick={onClose} className={styles.cancel}>
        Свернуть
      </Button>
    </div>
  );
};

export default QueryPanelControls;

QueryPanelControls.propTypes = {
  onSql: PropTypes.func,
  onRun: PropTypes.func,
  onApply: PropTypes.func,
  onClose: PropTypes.func,
};
