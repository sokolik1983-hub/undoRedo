import React from 'react';
import PropTypes from 'prop-types';
import ModalItem from '..';
import styles from './Stats.module.scss';

/**
 * @param title - строка для заголовка
 */

const someData = [
  { name: 'Классов',
    value: '1',
    id: 1
  },
  { name: 'Объектов',
    value: '31',
    id: 2
  },
  { name: 'Условий',
    value: '321',
    id: 3
  },
  { name: 'Таблиц',
    value: '3212',
    id: 4
  }
];
const someData2 = [
  { name: 'Алиасов',
    value: '1',
    id: 5
  },
  { name: 'Соединений',
    value: '321',
    id: 6
  },
  { name: 'Контекстов',
    value: '31',
    id: 7
  },
  { name: 'Иерархий',
    value: '3231',
    id: 8
  }
];

const dotCount = (data) => {
  const valueLength = data.map(i => i.value.length);
  const maxLength = Math.max(...valueLength);
  return valueLength.map(i => `${'..'.repeat(maxLength - i) }...........`)
}

const Stats = ({title}) => {
  return (
    <ModalItem title={title}>
      <div className={styles.wrapper}>
        <ul className={styles.list}>
          {someData.map((item, index) => (
            <li key={item.id} className={styles.text}>
              {item.value}
              {dotCount(someData)[index]}
              {item.name}
            </li>
             ))}
        </ul>
        <ul className={styles.list}>
          {someData2.map((item, index) => (
            <li key={item.id} className={styles.text}>
              {item.value}
              {dotCount(someData2)[index]}
              {item.name}
            </li>
           ))}
        </ul>
      </div>
    </ModalItem>
  );
};

export default Stats;

Stats.propTypes = {
  title: PropTypes.string
};

Stats.defaultProps = {
  title: ''
};