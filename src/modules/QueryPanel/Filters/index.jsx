import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Divider from '../../../common/components/Divider';
import styles from './Filters.module.scss';
import FilterItem from './FilterItem';
import { ReactComponent as Group } from '../../../layout/assets/queryPanel/group.svg';
import { ReactComponent as Arrow } from '../../../layout/assets/queryPanel/arrowBold.svg';
import { ReactComponent as Basket } from '../../../layout/assets/queryPanel/basket.svg';

const objItem = {
  id: 1,
  title: 'Транспорт 200',
  type: 'attribute',
  order: 1 
};
const objItem2 = {
  id: 2,
  title: 'Банковские проводки',
  type: 'gauge',
  order: 2
};
const objItem3 = {
  id: 3,
  title:'Измерение 2',
  type: 'measurement',
  order: 3
};

const Filters = ({ title }) => {

  const [objArr, setObjArr] = useState(null);
  const [currentObj, setCurrentObj] = useState(null);

  useEffect(() => {
    setObjArr([objItem, objItem2, objItem3]);
  }, []);

  const onDeleteObjItem = (id) => {
    setObjArr(objArr.filter(item => item.id !== id));
  };

  const onDeleteFilters = () => {
    setObjArr(null);
  };

  const onDragStart = (id) => {
    setCurrentObj(objArr.find(obj => obj.id === id));
  };

  const onDragNDrop = (id) => {
    const dropObj = objArr.find(obj => obj.id === id);
  
  setObjArr(objArr.map(obj => {
    if (obj.id === dropObj.id) {
      return {...obj, order: currentObj.order};
    }
    if (obj.id === currentObj.id) {
      return {...obj, order: dropObj.order};
    }
    return obj;
    }));
  };

  const addFilterGroup = () => {
    console.log('group')
  }

  const sortObjects = (a, b) => {
    return a.order > b.order ? 1 : -1;
  };

  return (
    <div className={styles.wrapper}>
      <Divider color="#FFFFFF" />
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.title}>{title}</div>
          <div className={styles.icons}>
            <Group className={styles.iconsIndents} onClick={addFilterGroup} />
            <Arrow className={styles.iconsIndents} />
            <Arrow 
              className={clsx(styles.iconsIndents, styles.rotate)}
            />
            <div className={styles.basketWrapper}>
              <Basket className={styles.basket} onClick={onDeleteFilters} />
              <div className={styles.hide}>
                <p className={styles.clear}>очистить всё</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.objectList}>
        {objArr?.sort(sortObjects).map(obj => (
          <FilterItem 
            id={obj.id} 
            title={obj.title} 
            type={obj.type} 
            onDeleteObjItem={onDeleteObjItem} 
            onDragStart={onDragStart}
            onDragNDrop={onDragNDrop}
          />
        ))}
      </div>
    </div>
  );
};

export default Filters;

Filters.propTypes = {
  title: PropTypes.string
};
