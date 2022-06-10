import clsx from 'clsx';
import PropTypes from 'prop-types';

import Magnifier from '../../../layout/assets/magnifier.svg';
import IconButton from '../IconButton';
import TextInput from '../TextInput';
import Tooltip from '../Tooltip';
import {ICON_POSITION} from './constant';
import styles from './Search.module.scss';

const Search = ({className, onSubmit, value, onChange, iconButtonPosition}) => {
    const classes = clsx(styles.searchForm, className);

    const getIconButton = () => {
        return (
            <Tooltip placement="topLeft" overlay="Поиск">
                <IconButton
                    className={styles.btn}
                    icon={<Magnifier />}
                    type="submit"
                />
            </Tooltip>
        );
    };

    return (
        <form className={classes} onSubmit={onSubmit}>
            {iconButtonPosition === ICON_POSITION.LEFT && getIconButton()}
            <TextInput
                className={styles.searchInput}
                id="search"
                value={value}
                onChange={onChange}
            />
            {iconButtonPosition === ICON_POSITION.RIGHT && getIconButton()}
        </form>
    );
};

export default Search;

Search.propTypes = {
    className: PropTypes.string,
    onSubmit: PropTypes.func,
    value: PropTypes.string,
    onChange: PropTypes.func,
    iconButtonPosition: PropTypes.string,
};

Search.defaultProps = {
    className: '',
    iconButtonPosition: ICON_POSITION.LEFT,
};
