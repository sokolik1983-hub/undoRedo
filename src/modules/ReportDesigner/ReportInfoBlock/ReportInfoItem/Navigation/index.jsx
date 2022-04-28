import React from 'react';
import PropTypes from 'prop-types';
import ReportInfoItem from '..';
import styles from './Navigation.module.scss';
import Divider from '../../../../../common/components/Divider';

/**
 * @param title - строка для заголовка
 */

 const someData = [
    { name: 'Время работы магазина',
      id: 1
    },
    { name: 'Имя менеджера',
      id: 2
    },
    { name: 'Дата открытия магазина',
      id: 3
    },
    { name: 'Принадлежность (y/n)',
      id: 4
    },
    { name: 'Размер торговой площадки постольку поскольку',
      id: 5
    },
    { name: 'Суммарный размер торговой площадки',
      id: 6
    },
    { name: 'Принадлежность (y/n)',
      id: 7
    },
    { name: 'Размер торговой площадки полный',
      id: 8
    }
  ];

const Navigation = ({ title }) => {
  return (
    <ReportInfoItem title={title}>
      <div className={styles.wrapper}>
        <Divider color="#FFFFFF" />
        <ul className={styles.list}>
          {someData.map((item) => (
            <li key={item.id} className={styles.text}>
              {item.name}
            </li>
        ))}
        </ul>
      </div>
    </ReportInfoItem>
  );
};

export default Navigation;

Navigation.propTypes = {
  title: PropTypes.string
};

Navigation.defaultProps = {
  title: ''
};