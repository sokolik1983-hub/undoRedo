import PropTypes from 'prop-types';
import Button from '../../../common/components/Button';
import styles from './QueryPanelControls.module.scss';

const QueryPanelControls = ({ onRun, onApply, onCancel, onToggleClick }) => {
  return (
    <div className={styles.buttonsWrapper}>
      {/* eslint-disable-next-line react/jsx-indent */}
      {/* ↓ временно, пока не вольется модалка Свойства подсказки */}
      <Button onClick={onToggleClick}>Список значений</Button>
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
  onRun: PropTypes.func,
  onApply: PropTypes.func,
  onCancel: PropTypes.func,
  onToggleClick: PropTypes.func
};
