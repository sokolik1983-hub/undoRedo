/* eslint-disable react/jsx-curly-newline */
import PropTypes from 'prop-types';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import IconButton from '../../../../../common/components/IconButton';
import TextInput from '../../../../../common/components/TextInput';
import Tooltip from '../../../../../common/components/Tooltip';
import {EMPTY_STRING} from '../../../../../common/constants/common';
import {
    setColoredValue,
    setShowDataList,
} from '../../../../../data/reducers/schemaDesigner';
import AddTableIcon from '../../../../../layout/assets/icons/tablesAdd.svg';
import FiltersIcon from '../../../../../layout/assets/icons/tablesFilters.svg';
import ViewsIcon from '../../../../../layout/assets/icons/viewsShow.svg';
import Magnifier from '../../../../../layout/assets/magnifier.svg';
import styles from './TablesPaneActions.module.scss';

const TablesPaneActions = ({setSelectedSchemes}) => {
    const dispatch = useDispatch();
    const {coloredValue, connectorObjects} = useSelector(
        (state) => state.app.schemaDesigner,
    );
    const [searchMod, setSearchMod] = useState(false);
    const [searchValue, setSearchValue] = useState(EMPTY_STRING);

    const handleShowDataList = (event) => {
        if (event.key === 'Enter' && coloredValue.length) {
            event.preventDefault();
            dispatch(setShowDataList());
        } else if (event.key === 'Enter') {
            dispatch(setShowDataList());
        }
    };

    const searchTable = (event) => {
        if (event.key === 'Enter' && searchValue.length) {
            let result = JSON.parse(
                JSON.stringify(
                    connectorObjects.filter((connector) =>
                        connector.object_name
                            .toUpperCase()
                            .includes(searchValue.toUpperCase()),
                    ),
                ),
            );
            result = result.map((item) => {
                item.opened = true;
                return item;
            });
            setSelectedSchemes(result);
        } else if (event.key === 'Enter') {
            setSelectedSchemes([]);
        }
    };

    return (
        <div className={styles.root}>
            <Tooltip
                placement="rightBottom"
                overlay="Поиск по таблицам на схеме"
            >
                <IconButton
                    className={styles.iconBtn}
                    icon={<AddTableIcon />}
                    onClick={() => setSearchMod(!searchMod)}
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
                        // действие по клику
                    }}
                />
                <IconButton
                    className={styles.iconBtn}
                    icon={<FiltersIcon />}
                    onClick={() => {
                        // действие по клику
                    }}
                />
            </div>
        </div>
    );
};

export default TablesPaneActions;

TablesPaneActions.propTypes = {
    setSelectedSchemes: PropTypes.func,
};
