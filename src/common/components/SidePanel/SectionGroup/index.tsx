import clsx from 'clsx';
import React, { FC } from 'react';

import Tooltip from '../../Tooltip';
import styles from './SectionGroup.module.scss';

interface ISectionGroupProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  actions: Array<any>;
  title: string;
  titleClassName: string;
}

const SectionGroup: FC<ISectionGroupProps> = ({
  actions,
  title,
  titleClassName,
}) => {
  return (
    <div className={styles.root}>
      <div className={clsx(styles.title, titleClassName)}>{title}</div>
      <div className={styles.actions}>
        {actions &&
          actions.map((item) => (
            <div
              className={clsx(styles.btn, {
                [styles.active]: item.isActive,
              })}
              onClick={item.action}
              key={item.id}
            >
              {item.component ? (
                item.component
              ) : (
                <Tooltip key={item.id} placement="top" overlay={item.name}>
                  {item.icon}
                </Tooltip>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default SectionGroup;
