/* eslint-disable no-cond-assign */
import PropTypes from 'prop-types';
import React, {useState} from 'react';

import TextInput from '../../../../common/components/TextInput';
import {REPORT_OBJECTS_PANEL_FILTERS_ICONS} from '../../../../common/constants/reportDesigner/reportObjectsPanelFiltersIcons';
import Magnifier from '../../../../layout/assets/reportObjectsPanelFiltersIcons/magnifier.svg';
import styles from './ReportObjectsPanelFilters.module.scss';

const ReportObjectsPanelFilters = ({searchValue, setSearchValue}) => {
    const [showInput, setShowInput] = useState(false);
    // eslint-disable-next-line prefer-const
    const [arr, setArr] = useState(REPORT_OBJECTS_PANEL_FILTERS_ICONS);

    const handleToggleIcon = (item) => {
        const newArr = arr.map((el) =>
            el.title === item.title
                ? {...el, enable: true}
                : {...el, enable: false},
        );
        setArr(newArr);
    };

    const actions = {
        objects: handleToggleIcon,
        structure: handleToggleIcon,
        map: handleToggleIcon,
        comments: handleToggleIcon,
        properties: handleToggleIcon,
        magnifier: () => setShowInput(!showInput),
    };

    return (
        <div className={styles.root}>
            {!showInput && (
                <>
                    {arr.map((item) => {
                        return (
                            <div
                                key={item.title}
                                className={styles.actionWrapper}
                                title={item.title || ''}
                                onClick={() =>
                                    actions[item.action]
                                        ? actions[item.action](item)
                                        : null
                                }
                            >
                                {item.enable ? item.icon : item.disIcon}
                            </div>
                        );
                    })}
                </>
            )}
            {showInput && (
                <>
                    <TextInput
                        className={styles.filterNameInput}
                        value={searchValue}
                        onChange={(event) => {
                            setSearchValue(event.target.value);
                        }}
                    />
                    <Magnifier
                        className={styles.magnifier}
                        onClick={() => setShowInput(!showInput)}
                    />
                </>
            )}
        </div>
    );
};

export default ReportObjectsPanelFilters;

ReportObjectsPanelFilters.propTypes = {
    searchValue: PropTypes.string,
    setSearchValue: PropTypes.func,
};
