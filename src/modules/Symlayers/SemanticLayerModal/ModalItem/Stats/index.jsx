import React from 'react';
import ModalItem from '..';
import styles from './Stats.module.scss';

const someData = [
  { name: 'Классов',
    value: '1'
  },
  { name: 'Объектов',
    value: '31'
  },
  { name: 'Условий',
    value: '321'
  },
  { name: 'Таблиц',
    value: '3212'
  }
];
const someData2 = [
  { name: 'Алиасов',
    value: '1'
  },
  { name: 'Соединений',
    value: '321'
  },
  { name: 'Контекстов',
    value: '31'
  },
  { name: 'Иерархий',
    value: '3231'
  }
];

const dotCount = (data) => {
  const param = data.map(i => i.value.length);
  const maxLength = Math.max(...param);
  return param.map(i => `${'..'.repeat(maxLength - i) }...........`)
}

const Stats = () => {
  return (
    <ModalItem title='Статистика'>
      <div className={styles.wrapper}>
        <ul className={styles.list}>
          {someData.map((item, index) => (
            <li className={styles.text}>
              {item.value}
              {dotCount(someData)[index]}
              {item.name}
            </li>
             ))}
        </ul>
        <ul className={styles.list}>
          {someData2.map((item, index) => (
            <li className={styles.text}>
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