import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Divider from '../../../common/components/Divider';
import styles from './Filters.module.scss';
import FilterItem from './FilterItem';
import ConditionBlock from './FilterItem/ConditionBlock/index';
import { ReactComponent as Group } from '../../../layout/assets/queryPanel/group.svg';
import { ReactComponent as Arrow } from '../../../layout/assets/queryPanel/arrowBold.svg';
import { ReactComponent as Basket } from '../../../layout/assets/queryPanel/basket.svg';

const arr = [{
  type: 'OR',
  children: [
    {
      id: 1,
      title: 'Транспорт 200',
      type: 'attribute',
      inputValue: '',
      optionsText: 'равно',
      order: 1,
    },
    {
      id: 2,
      title: 'Банковские проводки',
      type: 'gauge',
      inputValue: '',
      optionsText: 'равно',
      order: 2,
    },
    {
      id: 3,
      title: 'Измерение 2',
      type: 'measurement',
      inputValue: '',
      optionsText: 'равно',
      order: 3,
    },
    {
      type: 'AND',
      children: [
        {
          id: 2,
          title: 'Банковские проводки',
          type: 'gauge',
          inputValue: '',
          optionsText: 'равно',
          order: 2,
        }, {
          id: 3,
          title: 'Измерение 2',
          type: 'measurement',
          inputValue: '',
          optionsText: 'равно',
          order: 3,
        },
        {
          type: 'OR',
          children: [
            {
              id: 2,
              title: 'Банковские проводки',
              type: 'gauge',
              inputValue: '',
              optionsText: 'равно',
              order: 2,
            }, {
              id: 3,
              title: 'Измерение 2',
              type: 'measurement',
              inputValue: '',
              optionsText: 'равно',
              order: 3,
            },
            
          ]
        }
      ]
    }
  ]
}];

const Filters = ({ title }) => {
  const [filtersArr, setFiltersArr] = useState(arr);

  const onDeleteFilterItem = (id) => {
    setFiltersArr(filtersArr.filter(item => item.id !== id));
  };

  const onDeleteFilters = () => {
    setFiltersArr(null);
  };

  // const onDragStart = (id) => {
  //   setCurrentFilter(filtersArr.find(filter => filter.id === id));
  // };

  // const onDragNDrop = (id) => {
  //   const dropObj = filtersArr.find(filter => filter.id === id);

  //   setFiltersArr(filtersArr.map(filter => {
  //     if (filter.id === dropObj.id) {
  //       return { ...filter, order: currentFilter.order };
  //     }
  //     if (filter.id === currentFilter.id) {
  //       return { ...filter, order: dropObj.order };
  //     }
  //     return filter;
  //   }));
  // };

  const addFilterGroup = () => {
    console.log('group')
  };

  // const sortFilters = (a, b) => {
  //   return a.order > b.order ? 1 : -1;
  // };

  const render = (data) => {

      return (
        <div className={styles.filterWrapper}>
          {data.map((element) => {
  
            return (
              <>
                {Boolean(element.type) && <ConditionBlock conditionType={element.type} />}
                <div className={styles.filterItems}>
                  {Boolean(element.children?.length) && element.children.map((filter) => {
  
                    if (filter.children) {
                      return render([filter])
                    }
  
                    return (
                      <FilterItem
                        key={filter.id}
                        id={filter.id}
                        title={filter.title}
                        type={filter.type}
                        conditionType={element.conditionType}
                        text={filter.optionsText}
                        value={filter.inputValue}
                        onDeleteFilterItem={onDeleteFilterItem}
                      //   onDragStart={onDragStart}
                      //   onDragNDrop={onDragNDrop}
                      />
                    )
                  })}
                </div>
              </>
            )
          })}
        </div>
    )
  }

  return (
    <div className={styles.wrapper}>
      <Divider color="#FFFFFF" />
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.title}>{title}</div>
          <div className={styles.icons}>
            <div className={styles.groupWrapper}>
              <Group className={styles.groupIcon} onClick={addFilterGroup} />
              <div className={styles.hide}>
                <p className={styles.group}>группа</p>
              </div>
            </div>
            <Arrow className={clsx(styles.iconsIndents, styles.hide)} />
            <Arrow
              className={clsx(styles.iconsIndents, styles.rotate, styles.hide)}
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
      <div id="filters-block" className={styles.filtersBlock}>
        {filtersArr ? render(filtersArr) : <div />}
      </div>
    </div>
  );
};

export default Filters;

Filters.propTypes = {
  title: PropTypes.string
};
