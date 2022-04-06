import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Divider from '../../../common/components/Divider';
import Button from '../../../common/components/Button';
import styles from './Filters.module.scss';
import FilterItem from './FilterItem';
import { BUTTON } from '../../../common/constants/common';
import { ReactComponent as Group } from '../../../layout/assets/queryPanel/group.svg';
import { ReactComponent as Arrow } from '../../../layout/assets/queryPanel/arrowBold.svg';
import { ReactComponent as Basket } from '../../../layout/assets/queryPanel/basket.svg';

const array = [{
  id: 1,
  title: 'Транспорт 200',
  type: 'attribute',
  inputValue: '',
  optionsText: 'равно',
  order: 1 
},{
  id: 2,
  title: 'Банковские проводки',
  type: 'gauge',
  inputValue: '',
  optionsText: 'равно',
  order: 2
},{
  id: 3,
  title:'Измерение 2',
  type: 'measurement',
  inputValue: '',
  optionsText: 'равно',
  order: 3
},
{
  children: [
    {
      id: 2,
      title: 'Банковские проводки',
      type: 'gauge',
      inputValue: '',
      optionsText: 'равно',
      order: 2
    },{
      id: 3,
      title:'Измерение 2',
      type: 'measurement',
      inputValue: '',
      optionsText: 'равно',
      order: 3
    }
  ]
}
];

const Filters = ({ title }) => {
  const [filtersArr, setFiltersArr] = useState(array);
  const [currentFilter, setCurrentFilter] = useState(null);

  const onDeleteFilterItem = (id) => {
    setFiltersArr(filtersArr.filter(item => item.id !== id));
  };

  const onDeleteFilters = () => {
    setFiltersArr(null);
  };

  const onDragStart = (id) => {
    setCurrentFilter(filtersArr.find(filter => filter.id === id));
  };

  const onDragNDrop = (id) => {
    const dropObj = filtersArr.find(filter => filter.id === id);
  
    setFiltersArr(filtersArr.map(filter => {
      if (filter.id === dropObj.id) {
        return {...filter, order: currentFilter.order};
      }
      if (filter.id === currentFilter.id) {
        return {...filter, order: dropObj.order};
      }
      return filter;
      }));
  };

  const addFilterGroup = () => {
    console.log('group')
  };

  const sortFilters = (a, b) => {
    return a.order > b.order ? 1 : -1;
  };

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
      <div className={styles.filterWrapper}>
        <div className={array.length > 1 ? styles.conditionBlock : styles.hide}>
          <Button
            // onClick={buttonName==='AND' ? () => setButtonName('OR') : () => setButtonName('AND')}
            buttonStyle={BUTTON.SMALL_ORANGE}
          >
            {/* {buttonName} */}
          </Button>
          <div className={styles.verticalDivider} />
        </div>
        <div className={styles.filterItems}>
          {filtersArr?.sort(sortFilters).map(filter => {
            if (filter.children) {
              return (
                <div>
                  <div className={array.length > 1 ? styles.conditionBlock : styles.hide}>
                    <Button
                      // onClick={buttonName==='AND' ? () => setButtonName('OR') : () => setButtonName('AND')}
                      buttonStyle={BUTTON.SMALL_ORANGE}
                    >
                      {/* {buttonName} */}
                    </Button>
                    <div className={styles.verticalDivider} />
                  </div>
                  {filter.children?.map((innerFilter) => (
                    <FilterItem
                      key={innerFilter.id}
                      id={innerFilter.id}
                      title={innerFilter.title} 
                      type={innerFilter.type}
                      text={innerFilter.optionsText}
                      value={innerFilter.inputValue}
                      onDeleteFilterItem={onDeleteFilterItem}
                      onDragStart={onDragStart}
                      onDragNDrop={onDragNDrop}
                    />
                  ))}
                  
                </div>
            )}

            return (
              <FilterItem
                key={filter.id}
                id={filter.id}
                title={filter.title} 
                type={filter.type}
                text={filter.optionsText}
                value={filter.inputValue}
                onDeleteFilterItem={onDeleteFilterItem}
                onDragStart={onDragStart}
                onDragNDrop={onDragNDrop}
              />
            )
          })}
          {/* {filtersArr?.sort(sortFilters).map(filter => (
            <FilterItem 
              key={filter.id}
              id={filter.id}
              title={filter.title} 
              type={filter.type}
              text={filter.optionsText}
              value={filter.inputValue}
              onDeleteFilterItem={onDeleteFilterItem}
              onDragStart={onDragStart}
              onDragNDrop={onDragNDrop}
            />
        ))} */}
        </div>
      </div>
    </div>
  );
};

export default Filters;

Filters.propTypes = {
  title: PropTypes.string
};
