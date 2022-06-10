import PropTypes from 'prop-types';

import IconButton from '../../../../common/components/IconButton';
import Tooltip from '../../../../common/components/Tooltip';
import Basket from '../../../../layout/assets/queryPanel/basket.svg';
import Filter from '../../../../layout/assets/queryPanel/filter.svg';
import Lists from '../../../../layout/assets/queryPanel/lists.svg';
import styles from './ObjectsHeader.module.scss';

const ObjectsHeader = ({clearObjectsDesk}) => {
    return (
        <div className={styles.root}>
            <div className={styles.title}>Объекты отчета</div>
            <div className={styles.btnGroup}>
                <Tooltip placement="topLeft" overlay="Фильтр">
                    <IconButton
                        className={styles.iconBtn}
                        icon={<Filter />}
                        onClick={() => {}}
                    />
                </Tooltip>
                <Tooltip placement="topLeft" overlay="Списки">
                    <IconButton
                        className={styles.iconBtn}
                        icon={<Lists />}
                        onClick={() => {}}
                    />
                </Tooltip>
                <Tooltip placement="topLeft" overlay="Очистить всё">
                    <IconButton
                        className={styles.iconBtn}
                        icon={<Basket />}
                        onClick={clearObjectsDesk}
                    />
                </Tooltip>
            </div>
        </div>
    );
};

export default ObjectsHeader;

ObjectsHeader.propTypes = {
    clearObjectsDesk: PropTypes.func,
};
