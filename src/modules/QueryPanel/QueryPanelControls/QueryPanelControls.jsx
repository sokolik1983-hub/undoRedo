import PropTypes from 'prop-types';
import Button from '../../../common/components/Button';
import styles from './QueryPanelControls.module.scss';

const QueryPanelControls = ({ onSql, onRun, onApply, onCancel }) => {
  return (
    <div className={styles.buttonsWrapper}>
      <Button onClick={onSql} className={styles.sql}>
        Показать SQL
      </Button>
      <Button onClick={onRun} className={styles.run}>
        Запустить
      </Button>
      <Button onClick={onApply} className={styles.apply}>
        Применить
      </Button>
      <Button onClick={onCancel} className={styles.cancel}>
        Отмена
      </Button>
    </div>
  );
};

export default QueryPanelControls;

QueryPanelControls.propTypes = {
  onSql: PropTypes.func,
  onRun: PropTypes.func,
  onApply: PropTypes.func,
  onCancel: PropTypes.func
};
