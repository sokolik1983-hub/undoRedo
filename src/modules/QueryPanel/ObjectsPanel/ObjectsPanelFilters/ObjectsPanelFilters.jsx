import PropTypes from 'prop-types';
import IconButton from '../../../../common/components/IconButton';
import { ReactComponent as Magnifier } from '../../../../layout/assets/magnifier.svg';
import { ReactComponent as GaugeIcon } from '../../../../layout/assets/queryPanel/gaugeIcon.svg';
import { ReactComponent as MeasurementIcon } from '../../../../layout/assets/queryPanel/measurementIcon.svg';
import { ReactComponent as AttributeIcon } from '../../../../layout/assets/queryPanel/attributeIcon.svg';
import styles from './ObjectsPanelFilters.module.scss';
import TextInput from '../../../../common/components/TextInput';

const ObjectsPanelFilters = ({
  searchValue,
  setSearchValue,
  filterId,
  onFiltersSwitch
}) => {
  return (
    <div className={styles.root}>
      <TextInput
        value={searchValue}
        onChange={event => {
          setSearchValue(event.target.value);
        }}
        className={styles.filterNameInput}
      />
      <IconButton
        active={searchValue.length}
        className={styles.iconBtn}
        icon={<Magnifier />}
      />
      <IconButton
        onClick={() => onFiltersSwitch(1)}
        className={styles.iconBtn}
        icon={<GaugeIcon />}
        active={filterId.includes(1)}
      />
      <IconButton
        onClick={() => onFiltersSwitch(3)}
        className={styles.iconBtn}
        icon={<AttributeIcon />}
        active={filterId.includes(3)}
      />
      <IconButton
        onClick={() => onFiltersSwitch(2)}
        className={styles.iconBtn}
        icon={<MeasurementIcon />}
        active={filterId.includes(2)}
      />
    </div>
  );
};

export default ObjectsPanelFilters;

ObjectsPanelFilters.propTypes = {
  setSearchValue: PropTypes.func,
  searchValue: PropTypes.string,
  filterId: PropTypes.arrayOf(PropTypes.number),
  onFiltersSwitch: PropTypes.func
};
