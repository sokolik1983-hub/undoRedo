/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import IconButton from '../../../../common/components/IconButton';
import Select from '../../../../common/components/NewSelect/Select';
import { ReactComponent as Arrow } from '../../../../layout/assets/queryPanel/arrowOk.svg';
import { ReactComponent as PlusIcon } from '../../../../layout/assets/queryPanel/plus.svg';
import styles from './ObjectsPanelHeader.module.scss';

const ObjectsPanelHeader = ({ modalOpenHandler }) => {
  const handleClick = () => {
    console.log('Данные организации');
  };

  return (
    <div className={styles.header}>
      <div className={styles.request}>Запрос</div>
      {/* <div onClick={handleClick} className={styles.data}>
        <p className={styles.dataText}>Данные организации</p>
        <Arrow className={styles.indents} />
      </div> */}
      <Select />
      <IconButton
        className={styles.plusBtn}
        onClick={modalOpenHandler}
        icon={<PlusIcon />}
      />
    </div>
  );
};

export default ObjectsPanelHeader;

ObjectsPanelHeader.propTypes = {
  modalOpenHandler: PropTypes.func
};
