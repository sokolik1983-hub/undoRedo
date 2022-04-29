import React from 'react';
import styles from './Navigation.module.scss';

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

const Navigation = () => {
  return (
    <div className={styles.wrapper}>
      <ul className={styles.list}>
        {someData.map((item) => (
          <li key={item.id} className={styles.text}>
            {item.name}
          </li>
      ))}
      </ul>
    </div>
  );
};

export default Navigation;
