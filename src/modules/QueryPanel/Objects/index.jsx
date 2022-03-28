import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Divider from '../../../common/components/Divider';
import styles from './Objects.module.scss';
import { ReactComponent as Filter } from '../../../layout/assets/queryPanel/filter.svg';
import { ReactComponent as Lists } from '../../../layout/assets/queryPanel/lists.svg';
import { ReactComponent as Basket } from '../../../layout/assets/queryPanel/basket.svg';
import ObjectItem from './Object/index';

const Objects = ({ title }) => {
  const objItem = {
    id: 1,
    title: 'Тестировка 200',
    type: 'green' 
  }
  const objItem2 = {
    id: 2,
    title: 'Банковские проводки',
    type: 'green'
  }
  const objItem3 = {
    id: 3,
    title:'Опа 200',
    type: 'green'
  }
  const [objArr, setObjArr] = useState(null);

  useEffect(() => {
    setObjArr([objItem, objItem2, objItem3]);
  }, []);

  const onDeleteObjItem = (id) => {
    setObjArr(objArr.filter(item => item.id !== id));
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <div className={styles.title}>{title}</div>
        <div className={styles.icons}>
          <Filter className={styles.iconsIndents} />
          <Lists className={styles.iconsIndents} />
          <Basket className={styles.iconsIndents} />
        </div>
      </div>
      <Divider color='#FFFFFF' />
      <div className={styles.objectList}>
        {objArr?.map(obj => <ObjectItem id={obj.id} title={obj.title} type={obj.type} onDeleteObjItem={onDeleteObjItem} />)}
      </div>
    </div>
  );
};

export default Objects;

Objects.propTypes = {
  title: PropTypes.string
};