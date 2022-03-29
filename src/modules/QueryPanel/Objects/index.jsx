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
    title: 'Транспорт 200',
    type: 'green',
    order: 1 
  }
  const objItem2 = {
    id: 2,
    title: 'Банковские проводки',
    type: 'orange',
    order: 2
  }
  const objItem3 = {
    id: 3,
    title:'Опа 200',
    type: 'blue',
    order: 3
  }

  const [objArr, setObjArr] = useState(null);
  const [currentObj, setCurrentObj] = useState(null);

  useEffect(() => {
    setObjArr([objItem, objItem2, objItem3]);
  }, []);

  const onDeleteObjItem = (id) => {
    setObjArr(objArr.filter(item => item.id !== id));
  };

  const onDragStart = (id) => {
    setCurrentObj(objArr.find(obj => obj.id === id));
  }

  const onDragNDrop = (id) => {
    const dropObj = objArr.find(obj => obj.id === id);
    
    setObjArr(objArr.map(obj => {
      if (obj.id === dropObj.id) {
        return {...obj, order: currentObj.order};
      }
      if (obj.id === currentObj.id) {
        return {...obj, order: dropObj.order}
      }
      return obj;
    }))
  };

  const sortObjects = (a, b) => {
    return a.order > b.order ? 1 : -1;
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
        {objArr?.sort(sortObjects).map(obj => (
          <ObjectItem 
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

export default Objects;

Objects.propTypes = {
  title: PropTypes.string
};