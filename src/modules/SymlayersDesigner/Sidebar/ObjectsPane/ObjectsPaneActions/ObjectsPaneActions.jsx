import PropTypes from 'prop-types';
import { useState } from 'react';
import TextInput from '../../../../../common/components/TextInput';
import IconButton from '../../../../../common/components/IconButton';
import { ReactComponent as GaugeIcon } from '../../../../../layout/assets/queryPanel/gauge_icon.svg';
import { ReactComponent as MeasIcon } from '../../../../../layout/assets/queryPanel/measurementIcon.svg';
import { ReactComponent as AttrIcon } from '../../../../../layout/assets/queryPanel/attributeIcon.svg';
import { ReactComponent as Magnifier } from '../../../../../layout/assets/magnifier.svg';
import { EMPTY_STRING } from '../../../../../common/constants/common';
import styles from './ObjectsPaneActions.module.scss';

const ObjectsPaneActions = ({
  objectsLayers,
  setObjectsList,
  filterObjectsMode,
  setFilterObjectMode
}) => {
  const [searchValue, setSearchValue] = useState(EMPTY_STRING);

  const searchObject = event => {
    if (event.key === 'Enter' && searchValue.length) {
      const result = JSON.parse(
        JSON.stringify(
          objectsLayers.filter(object =>
            object.name.toUpperCase().includes(searchValue.toUpperCase())
          )
        )
      );
      setObjectsList(result);
    } else if (event.key === 'Enter') {
      setObjectsList(objectsLayers);
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.searchGroup}>
        <TextInput
          className={styles.input}
          onKeyPress={searchObject}
          value={searchValue}
          onChange={event => setSearchValue(event.target.value)}
        />
        <IconButton
          className={styles.iconBtn}
          icon={<Magnifier />}
          onClick={searchObject}
        />
      </div>
      <div className={styles.filtersGroup}>
        <IconButton
          className={styles.iconBtn}
          active={filterObjectsMode === 'GAUGE'}
          icon={<GaugeIcon />}
          onClick={() => {
            if (filterObjectsMode === 'GAUGE') {
              setFilterObjectMode(null);
            } else setFilterObjectMode('GAUGE');
          }}
        />
        <IconButton
          className={styles.iconBtn}
          active={filterObjectsMode === 'ATTR'}
          icon={<AttrIcon />}
          onClick={() => {
            if (filterObjectsMode === 'ATTR') {
              setFilterObjectMode(null);
            } else setFilterObjectMode('ATTR');
          }}
        />
        <IconButton
          className={styles.iconBtn}
          active={filterObjectsMode === 'MEAS'}
          icon={<MeasIcon />}
          onClick={() => {
            if (filterObjectsMode === 'MEAS') {
              setFilterObjectMode(null);
            } else setFilterObjectMode('MEAS');
          }}
        />
      </div>
    </div>
  );
};

export default ObjectsPaneActions;

ObjectsPaneActions.propTypes = {
  objectsLayers: PropTypes.array,
  setObjectsList: PropTypes.func,
  filterObjectsMode: PropTypes.string,
  setFilterObjectMode: PropTypes.func
};
