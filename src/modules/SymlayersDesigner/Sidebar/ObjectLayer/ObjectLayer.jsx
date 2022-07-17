import clsx from 'clsx';
import PropTypes from 'prop-types';
import {useRef, useState} from 'react';
import {useDispatch} from 'react-redux';

import Dropdown from '../../../../common/components/Dropdown';
import DropdownItem from '../../../../common/components/Dropdown/DropdownItem';
import Tooltip from '../../../../common/components/Tooltip';
import useClickOutside from '../../../../common/helpers/useClickOutside';
import {showToast} from '../../../../data/actions/app';
import {setEditObjectModal} from '../../../../data/actions/universes';
import {deleteObjectLayer} from '../../../../data/reducers/schemaDesigner';
import AttrIcon from '../../../../layout/assets/queryPanel/attributeIcon.svg';
import GaugeIcon from '../../../../layout/assets/queryPanel/gauge_icon.svg';
import MeasIcon from '../../../../layout/assets/queryPanel/measurementIcon.svg';
import DeleteObjectModal from '../DeleteObjectModal';
import FOLDER_ITEM_DROPDOWN_ACTIONS from '../helper';
import styles from './ObjectLayer.module.scss';

const ObjectLayer = ({field, onSelect}) => {
    const dispatch = useDispatch();
    const {name, objectType, id} = field;
    const [isDelModalOpened, setDelModelOpened] = useState(false);
    const [isTooltipVisible, setIsTooltipVisible] = useState(false);
    const [isActive, setIsActive] = useState();
    const clickRef = useRef();
    const nameRef = useRef();

    const handleVisibility = (visible) => {
        const isNeedToDisplay =
            nameRef?.current?.scrollWidth > nameRef?.current?.offsetWidth;
        if (isNeedToDisplay) setIsTooltipVisible(true);
        if (!visible) setIsTooltipVisible(false);
    };

    useClickOutside(clickRef, () => setIsActive(false));

    const root = clsx(styles.root, {
        [styles.active]: isActive,
    });

    const selectIcon = (type) => {
        switch (type) {
            case 'Измерение':
                return <MeasIcon />;
            case 'Показатель':
                return <GaugeIcon />;
            case 'Атрибут':
                return <AttrIcon />;
            default:
                return <MeasIcon />;
        }
    };

    const handleDeleteObject = () => {
        dispatch(deleteObjectLayer(id));
        dispatch(showToast('success', 'Объект удален'));
        setDelModelOpened(false);
    };

    const handleObjectClick = (action) => {
        onSelect(id);
        switch (action) {
            case 'edit':
                dispatch(setEditObjectModal(field));
                break;
            case 'delete':
                setDelModelOpened(true);
                break;
            default:
                console.log(action);
        }
    };

    const menu = (
        <div className={styles.menuContainer}>
            {FOLDER_ITEM_DROPDOWN_ACTIONS.map((item) => (
                <Tooltip
                    key={item.title}
                    overlay={<div>{item.title}</div>}
                    trigger={['hover']}
                >
                    <DropdownItem
                        className={styles.menuItem}
                        onClick={(action) => handleObjectClick(action)}
                        item={item}
                    />
                </Tooltip>
            ))}
        </div>
    );

    return (
        <>
            <Dropdown
                overlay={menu}
                trigger={['click']}
                alignPoint
                align={{
                    offset: [0, 20],
                }}
            >
                <Tooltip
                    placement="topLeft"
                    overlay={<div className={styles.tooltip}>{name}</div>}
                    visible={isTooltipVisible}
                    onVisibleChange={handleVisibility}
                    mouseEnterDelay={0.5}
                >
                    <div
                        className={root}
                        onClick={() => setIsActive((prev) => !prev)}
                        ref={clickRef}
                    >
                        <div className={styles.icon}>
                            {selectIcon(objectType)}
                        </div>
                        <div className={styles.text} ref={nameRef}>
                            {name}
                        </div>
                    </div>
                </Tooltip>
            </Dropdown>

            <DeleteObjectModal
                isOpen={isDelModalOpened}
                onDelete={handleDeleteObject}
                onClose={() => setDelModelOpened(false)}
            />
        </>
    );
};

ObjectLayer.propTypes = {
    field: PropTypes.object,
    onSelect: PropTypes.func,
};

export default ObjectLayer;
