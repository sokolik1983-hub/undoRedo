import { ReactComponent as Arrow } from '../../../../layout/assets/queryPanel/arrowOk.svg';
import { ReactComponent as PlusIcon } from '../../../../layout/assets/queryPanel/plus.svg';
import styles from './ObjectsPanelHeader.module.scss';

const ObjectsPanelHeader = () => {
  const handleClick = () => {
    console.log('Данные организации');
  };

  return (
    <div className={styles.header}>
      <div className={styles.request}>Запрос</div>
      <div onClick={handleClick} className={styles.data}>
        <p className={styles.dataText}>Данные организации</p>
        <Arrow className={styles.indents} />
      </div>
      <PlusIcon className={styles.plus} />
    </div>
  );
};

export default ObjectsPanelHeader;
