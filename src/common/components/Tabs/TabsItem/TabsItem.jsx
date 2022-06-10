import clsx from 'clsx';
import PropTypes from 'prop-types';

import {useTabContext} from '../Tabs';
import styles from './TabsItem.module.scss';

const TabsItem = ({className, idx, tab}) => {
    const {activeTab, setActiveTab} = useTabContext();

    const tabsItem = clsx(styles.tabsItem, className, {
        [styles.active]: idx === activeTab,
    });

    return (
        <li className={tabsItem}>
            <button type="button" onClick={() => setActiveTab(idx)}>
                {tab}
            </button>
        </li>
    );
};

export default TabsItem;

TabsItem.propTypes = {
    className: PropTypes.string,
    idx: PropTypes.number,
    tab: PropTypes.string,
};
