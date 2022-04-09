/* eslint-disable */ import PropTypes from 'prop-types';
import IconButton from '../../../../common/components/IconButton';
import { ReactComponent as Magnifier } from '../../../../layout/assets/magnifier.svg';
import { ReactComponent as GaugeIcon } from '../../../../layout/assets/queryPanel/gauge-icon.svg';
import { ReactComponent as MeasurementIcon } from '../../../../layout/assets/queryPanel/measurement-icon.svg';
import { ReactComponent as AttributeIcon } from '../../../../layout/assets/queryPanel/attribute-icon.svg';
import styles from './ObjectsPanelFilters.module.scss';
import TextInput from '../../../../common/components/TextInput';

const ObjectsPanelFilters = ({
  setFilterName,
  value,
  setFilterId,
  filterId
}) => {

  /**
   * Обработчик события добавления фильтра по objectType_id
   * 
   * @param id objectType_id, который зашит в каждом элементе и по которуму сортируем список
  */
  const onChangeFilterIdHandler = id => {
    if (!filterId.includes(id)) {
      setFilterId([...filterId, id]);
    } else {
      setFilterId(prevState =>
        prevState.filter(objectTypeId => objectTypeId !== id)
      );
    }
  };

  return (
    <div className={styles.root}>
      <TextInput
        value={value}
        onChange={event => {
          setFilterName(event.target.value);
        }}
        className={styles.filterNameInput}
      />
      <IconButton
        active={value.length}
        className={styles.iconBtn}
        icon={<Magnifier />}
      />
      <IconButton
        onClick={() => onChangeFilterIdHandler(1)}
        className={styles.iconBtn}
        icon={<GaugeIcon />}
        active={filterId.includes(1) ? true : false}
      />
      <IconButton
        onClick={() => onChangeFilterIdHandler(3)}
        className={styles.iconBtn}
        icon={<AttributeIcon />}
        active={filterId.includes(3) ? true : false}
      />
      <IconButton
        onClick={() => onChangeFilterIdHandler(2)}
        className={styles.iconBtn}
        icon={<MeasurementIcon />}
        active={filterId.includes(2) ? true : false}
      />
    </div>
  );
};

export default ObjectsPanelFilters;

ObjectsPanelFilters.propTypes = {
  setFilterName: PropTypes.func,
  value: PropTypes.string,
  setFilterId: PropTypes.func
};
