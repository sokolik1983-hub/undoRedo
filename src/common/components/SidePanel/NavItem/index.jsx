import {Tooltip} from '@material-ui/core';
import clsx from 'clsx';
/* eslint-disable react/prop-types */
import React from 'react';

import styles from './NavItem.module.scss';

function NavItem({id, onClick, active, title, icon}) {
    function handleClick() {
        onClick(id);
    }

    const itemClass = clsx(styles.navigationItem, {
        [styles.navigationItemActive]: active,
    });

    return (
        <div className={itemClass} onClick={handleClick}>
            <Tooltip placement="top" overlay={title}>
                {icon}
            </Tooltip>
        </div>
    );
}

export default NavItem;
