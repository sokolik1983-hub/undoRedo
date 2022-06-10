import clsx from 'clsx';
import PropTypes from 'prop-types';

import MultipleColumnsActive from '../../../../layout/assets/toggleMultipleColumnsActive.svg';
import MultipleColumnsInctive from '../../../../layout/assets/toggleMultipleColumnsInactive.svg';
import SingleColumnActive from '../../../../layout/assets/toggleSingleColumnActive.svg';
import SingleColumnInactive from '../../../../layout/assets/toggleSingleColumnInactive.svg';
import IconButton from '../../IconButton';
import styles from './ListNavBarViewToggler.module.scss';

const ListNavBarViewToggler = ({isMulticolumnsView, showMultipleColumns}) => {
    const btnMultiView = clsx(styles.btn, {
        [styles.multicolumnView]: isMulticolumnsView,
    });
    const btnTableView = clsx(styles.btn, {
        [styles.tableView]: !isMulticolumnsView,
    });

    return (
        <div className={styles.viewToggle}>
            <IconButton
                className={btnMultiView}
                icon={
                    isMulticolumnsView ? (
                        <MultipleColumnsActive />
                    ) : (
                        <MultipleColumnsInctive />
                    )
                }
                onClick={() => showMultipleColumns(true)}
            />
            <IconButton
                className={btnTableView}
                icon={
                    isMulticolumnsView ? (
                        <SingleColumnInactive />
                    ) : (
                        <SingleColumnActive />
                    )
                }
                onClick={() => showMultipleColumns(false)}
            />
        </div>
    );
};

export default ListNavBarViewToggler;

ListNavBarViewToggler.propTypes = {
    showMultipleColumns: PropTypes.func,
    isMulticolumnsView: PropTypes.bool,
};
