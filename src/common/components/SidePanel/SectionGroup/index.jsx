import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';

import Tooltip from '../../Tooltip';
import styles from './SectionGroup.module.scss';

function SectionGroup({actions, title, ...props}) {
    return (
        <div className={styles.root}>
            <div className={clsx(styles.title, props.titleClassName)}>
                {title}
            </div>
            <div className={styles.actions}>
                {actions &&
                    actions.map((item) => (
                        <div
                            className={clsx(styles['actions__btn'], {
                                [styles['actions__btn_active']]: item.isActive,
                            })}
                            onClick={item.action}
                            key={item.id}
                        >
                            {item.component ? (
                                item.component
                            ) : (
                                <Tooltip
                                    key={item.id}
                                    placement="top"
                                    overlay={item.name}
                                >
                                    {item.icon}
                                </Tooltip>
                            )}
                        </div>
                    ))}
            </div>
        </div>
    );
}

SectionGroup.propTypes = {
    actions: PropTypes.array,
    title: PropTypes.string,
    titleClassName: PropTypes.string,
};

export default SectionGroup;
