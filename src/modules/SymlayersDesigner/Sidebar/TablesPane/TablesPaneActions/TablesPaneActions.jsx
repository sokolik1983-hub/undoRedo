/* eslint-disable react/jsx-curly-newline */
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import IconButton from '../../../../../common/components/IconButton';
import TextInput from '../../../../../common/components/TextInput';
import Tooltip from '../../../../../common/components/Tooltip';
import { EMPTY_STRING } from '../../../../../common/constants/common';
import {
  setColoredValue,
  setShowDataList,
} from '../../../../../data/reducers/schemaDesigner';
import AddTableIcon from '../../../../../layout/assets/icons/tablesAdd.svg';
import FiltersIcon from '../../../../../layout/assets/icons/tablesFilters.svg';
import ViewsIcon from '../../../../../layout/assets/icons/viewsShow.svg';
import Magnifier from '../../../../../layout/assets/magnifier.svg';
import styles from './TablesPaneActions.module.scss';

const TablesPaneActions = ({
  setSelectedSchemes,
  setFindedSchemes,
  searchMod,
  onSwitchSearchMod,
}) => {
  const dispatch = useDispatch();
  const { coloredValue, connectorObjects, selectedTablesArray } = useSelector(
    (state) => state.app.schemaDesigner,
  );
  const [searchValue, setSearchValue] = useState(EMPTY_STRING);

  const handleShowDataList = (event) => {
    if (event.key === 'Enter' && coloredValue.length) {
      event.preventDefault();
      dispatch(setShowDataList(true));
    } else if (event.key === 'Enter') {
      dispatch(setShowDataList(false));
    }
  };

  useEffect(() => {
    if (searchMod) {
      const selectedSchemesArr = [];
      connectorObjects.forEach((obj) => {
        selectedTablesArray.forEach((tab) => {
          if (`${obj.schema}_${obj.objectName}` === tab.name) {
            selectedSchemesArr.push(obj);
          }
        });
      });
      setSelectedSchemes(selectedSchemesArr);
    }
  }, [selectedTablesArray, connectorObjects, searchMod]);

  const searchTable = (event) => {
    if (event.key === 'Enter' && searchValue.length) {
      let result = JSON.parse(
        JSON.stringify(
          connectorObjects.filter((connector) =>
            connector.objectName
              .toUpperCase()
              .includes(searchValue.toUpperCase()),
          ),
        ),
      );
      result = result.map((item) => {
        item.opened = true;
        return item;
      });
      setFindedSchemes(result);
    } else if (event.key === 'Enter') {
      setFindedSchemes([]);
    }
  };

  return (
    <div className={styles.root}>
      <Tooltip placement="rightBottom" overlay="Поиск по таблицам на схеме">
        <IconButton
          className={searchMod ? styles.actIconBtn : styles.iconBtn}
          icon={<AddTableIcon />}
          onClick={() => onSwitchSearchMod(!searchMod)}
          active
        />
      </Tooltip>
      <div className={styles.searchGroup}>
        <TextInput
          className={styles.searchInput}
          onKeyPress={(event) =>
            searchMod
              ? handleShowDataList(event)
              : searchTable(event, searchValue)
          }
          value={searchMod ? coloredValue : searchValue}
          onChange={(event) => {
            if (searchMod) {
              dispatch(setColoredValue(event.target.value));
            } else {
              setSearchValue(event.target.value);
            }
          }}
        />
        <IconButton
          className={styles.iconBtn}
          icon={<Magnifier />}
          onClick={() => {
            if (searchMod) dispatch(setShowDataList());
          }}
        />
      </div>
      <div className={styles.btnGroup}>
        <IconButton
          className={styles.iconBtn}
          icon={<ViewsIcon />}
          onClick={() => {
            // some action
          }}
        />
        <IconButton
          className={styles.iconBtn}
          icon={<FiltersIcon />}
          onClick={() => {
            // some action
          }}
        />
      </div>
    </div>
  );
};

export default TablesPaneActions;

TablesPaneActions.propTypes = {
  setSelectedSchemes: PropTypes.func,
  searchMod: PropTypes.bool,
  onSwitchSearchMod: PropTypes.func,
};
