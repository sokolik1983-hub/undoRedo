import clsx from 'clsx';
import PropTypes from 'prop-types';
import {useEffect, useState} from 'react';

import Dropdown from '../../../../common/components/Dropdown';
import DropdownItem from '../../../../common/components/Dropdown/DropdownItem';
import IconButton from '../../../../common/components/IconButton';
import TextInput from '../../../../common/components/TextInput';
import {EMPTY_STRING} from '../../../../common/constants/common';
import CloseIcon from '../../../../layout/assets/close.svg';
import Arrow from '../../../../layout/assets/queryPanel/arrowThin.svg';
import {useDragNDrop} from '../../context/DragNDropContext';
import {getIconByItemType} from '../../queryPanelHelper';
import {FILTER_TYPES, FILTER_TYPES_ARR} from './constants';
import DotsMenu from './DotsMenu/DotsMenu';
import styles from './FiltersDeskItem.module.scss';

const FiltersDeskItem = ({
    id,
    title,
    type,
    onItemClick,
    onDeleteItem,
    onEditItem,
    ...props
}) => {
    const {focused} = useDragNDrop();
    const [isActive, setIsActive] = useState(false);
    const [filterValue, setFilterValue] = useState(EMPTY_STRING);
    const [filterValueBetween, setFilterValueBetween] = useState({
        from: '',
        to: '',
    });
    const [filterType, setFilterType] = useState('равно');

    const root = clsx(styles.root, {
        [styles.active]: isActive,
        [styles.selected]: focused?.id === id,
    });

    const onEdit = (e) => {
        setFilterValue(e.target.value);
    };

    const handleChangeBetween = (event) => {
        setFilterValueBetween({
            ...filterValueBetween,
            [event.target.name]: event.target.value,
        });
    };

    const handleSelectFilterType = (typeOfFilter) => {
        setFilterType(typeOfFilter);
        setFilterValue('');
        setFilterValueBetween({from: '', to: ''});
    };

    useEffect(() => {
        onEditItem(id, filterValue, filterValueBetween, filterType);
    }, [filterValue, filterType, filterValueBetween]);

    useEffect(() => {
        if (filterValueBetween.from || filterValueBetween.to) {
            onEditItem(
                id,
                filterValueBetween.from,
                filterValueBetween.to,
                filterType,
            );
        }
    }, [filterValueBetween, filterType]);

    const menu = () => (
        <div className={styles.optionsWrapper}>
            {FILTER_TYPES_ARR.map((i) => (
                <DropdownItem
                    key={i.value}
                    item={i}
                    className={styles.optionsText}
                    onClick={() => {
                        handleSelectFilterType(i.text);
                    }}
                />
            ))}
        </div>
    );

    return (
        <div
            {...props}
            className={root}
            onClick={onItemClick}
            onMouseEnter={() => setIsActive(true)}
            onMouseLeave={() => setIsActive(false)}
            onDragEnter={() => setIsActive(true)}
            onDragLeave={() => setIsActive(false)}
        >
            <div className={styles.icon}>{getIconByItemType(type)}</div>
            <p className={styles.title}>{title}</p>
            {/* TODO: replace dropdown with custom select when ready */}
            <Dropdown trigger={['click']} overlay={menu()}>
                <div className={styles.select}>
                    <p className={styles.selectText}>{filterType}</p>
                    <Arrow className={styles.arrow} />
                </div>
            </Dropdown>
            {filterType === FILTER_TYPES.BETWEEN ? (
                <>
                    <TextInput
                        className={styles.input}
                        placeholder="введите постоянную"
                        type="text"
                        label={EMPTY_STRING}
                        name="from"
                        value={filterValueBetween.from}
                        onChange={handleChangeBetween}
                    />
                    <p className={styles.textContent}>И</p>
                    <TextInput
                        className={styles.input}
                        placeholder="введите постоянную"
                        type="text"
                        label={EMPTY_STRING}
                        name="to"
                        value={filterValueBetween.to}
                        onChange={handleChangeBetween}
                    />
                </>
            ) : (
                <TextInput
                    className={styles.input}
                    placeholder="введите постоянную"
                    type="text"
                    label={EMPTY_STRING}
                    value={filterValue}
                    onChange={(e) => onEdit(e)}
                />
            )}
            <DotsMenu />
            <IconButton
                className={styles.closeBtn}
                icon={<CloseIcon className={styles.closeBtnIcon} />}
                onClick={(e) => {
                    e.stopPropagation();
                    onDeleteItem();
                }}
            />
        </div>
    );
};

export default FiltersDeskItem;

FiltersDeskItem.propTypes = {
    id: PropTypes.number,
    title: PropTypes.string,
    type: PropTypes.number,
    onItemClick: PropTypes.func,
    onDeleteItem: PropTypes.func,
    onEditItem: PropTypes.func,
};
