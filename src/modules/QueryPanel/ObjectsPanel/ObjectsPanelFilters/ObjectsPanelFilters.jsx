import PropTypes from 'prop-types';
import { memo } from 'react';
import IconButton from '../../../../common/components/IconButton';
import { ReactComponent as Magnifier } from '../../../../layout/assets/magnifier.svg';
import { ReactComponent as GaugeIcon } from '../../../../layout/assets/queryPanel/gauge_icon.svg';
import { ReactComponent as MeasurementIcon } from '../../../../layout/assets/queryPanel/measurementIcon.svg';
import { ReactComponent as AttributeIcon } from '../../../../layout/assets/queryPanel/attributeIcon.svg';
import TextInput from '../../../../common/components/TextInput';
import styles from './ObjectsPanelFilters.module.scss';

const ObjectsPanelFilters = ({
  searchValue,
  setSearchValue,
  filterType,
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
        className={styles.iconBtn}
        icon={<Magnifier />}
        active={Boolean(searchValue.length)}
      />
      <IconButton
        onClick={() => onFiltersSwitch('Dimension')}
        className={styles.iconBtn}
        icon={<GaugeIcon />}
        active={filterType.includes('Dimension')}
      />
      <IconButton
        onClick={() => onFiltersSwitch('Filter')}
        className={styles.iconBtn}
        icon={<AttributeIcon />}
        active={filterType.includes('Filter')}
      />
      <IconButton
        onClick={() => onFiltersSwitch('Measure')}
        className={styles.iconBtn}
        icon={<MeasurementIcon />}
        active={filterType.includes('Measure')}
      />
    </div>
  );
};

export default memo(ObjectsPanelFilters);

ObjectsPanelFilters.propTypes = {
  setSearchValue: PropTypes.func,
  searchValue: PropTypes.string,
  filterType: PropTypes.arrayOf(PropTypes.number),
  onFiltersSwitch: PropTypes.func
};
