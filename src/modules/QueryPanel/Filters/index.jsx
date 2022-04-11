/* eslint-disable no-unused-expressions */
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
    },
    {
      id: 2,
      title: 'Банковские проводки',
      type: 'gauge',
      inputValue: '',
      optionsText: 'равно',
    },
    {
      id: 3,
      title: 'Измерение 2',
      type: 'measurement',
      inputValue: '',
      optionsText: 'равно',
    },
    {
      type: 'AND',
      children: [
        {
          id: 4,
          title: 'Квартал',
          type: 'gauge',
          inputValue: '',
          optionsText: 'равно',
        }, {
          id: 5,
          title: 'Измерение 3',
          type: 'measurement',
          inputValue: '',
          optionsText: 'равно',
        },
        {
          type: 'OR',
          children: [
            {
              id: 6,
              title: 'Год',
              type: 'gauge',
              inputValue: '',
              optionsText: 'равно',
            }, {
              id: 7,
              title: 'Измерение 4',
              type: 'measurement',
              inputValue: '',
              optionsText: 'равно',
            },
          ]
        }
      ]
    }
  ]
}];

const findItemByType = (children) => {
  for (let i = 0; i < children?.length; i++) {
    const item = children[i];
    if (item.children) {
      children.splice(i, 1);
      return [item, children];
    }
  }

  return [undefined, children];
};



const Filters = ({ title }) => {
  const [filtersArr, setFiltersArr] = useState(arr);
  const [level, setLevel] = useState(1);

  const onDeleteFilterItem = (id) => {
    
      const filterChildren = item => {
        if (typeof item['children'] !== 'undefined') {
          item.children = item.children.filter(i => i.id !== id);
          // eslint-disable-next-line array-callback-return
          item.children.map(el => {
            if (el.children) {
              el.children = el.children.filter(i => i.id !== id);
              filterChildren(el);
            }
          });
        }
        return item;
      }

      const updateFilters = filtersArr.map(item => {
        if (item.children) {
          item.children = item.children.filter(i => i.id !== id);
          filterChildren(item);
        }
        return item;
      });
  
      setFiltersArr(updateFilters);
  };

  const onDeleteFilters = () => {
    setFiltersArr(null);
  };

  const handleGroupClick = () => {
    setLevel(level);

    if (level === 0 && (filtersArr.length === 0 || (filtersArr.length === 1 && !filtersArr[0].type))) {
      return;
    }
  
    function createGroup(array, curLvl) {

      const [item, modifiedArr] = findItemByType(array);
      
      
      if (item && item?.children?.length && curLvl < level) {
        return [
          ...modifiedArr,
          {
            ...item,
            children: [
              ...item.children,
              createGroup(item.children, level + 1)
            ]
          }
        ]
      }

      const group = {
        type: 'AND',
        children: []
      };

      return level > 0 ? group : [group]
    }

    setFiltersArr(createGroup(filtersArr, 0));
  };

  const render = (data) => {

    if(!data.length) {
      return null;
    }

    return (
      <div className={styles.filterWrapper}>
        {data?.map((element) => {

          return (
            <>
              {Boolean(element.type) && Boolean(element.children.length > 1) &&
              <ConditionBlock conditionType={element.type} />}
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
              <Group className={styles.groupIcon} onClick={handleGroupClick} />
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
