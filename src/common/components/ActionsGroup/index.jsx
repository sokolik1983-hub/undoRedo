import {Tooltip} from '@material-ui/core';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './ActionsGroup.module.scss';

function ActionsGroup({actions, title, ...props}) {
    return (
        <div className={styles.root}>
            <div className={clsx(styles.title, props.titleClassName)}>
                {title}
            </div>
            <div className={styles.actions}>
                {actions &&
                    actions.map((item) => (
                        <div
                            className={clsx(styles['actionsBtn'], {
                                [styles['actionsBtnActive']]: item.isActive,
                            })}
                            onClick={item.action}
                            key={item.id}
                        >
                            <Tooltip
                                key={item.id}
                                placement="top"
                                title={item.name}
                                arrow
                            >
                                {item.icon}
                            </Tooltip>
                        </div>
                    ))}
            </div>
        </div>
    );
}

ActionsGroup.propTypes = {
    actions: PropTypes.array,
    title: PropTypes.string,
    titleClassName: PropTypes.string,
};

export default ActionsGroup;
