import React, { DragEvent, FC, useState } from 'react';

import DeleteIcon from '../../../../layout/assets/closeWhite.svg';
import { getIconByItemType } from '../../../../modules/QueryPanel/queryPanelHelper';
import { GRAPH_ICONS } from '../../../constants/reportDesigner/reportDesignerIcons';
import IconButton from '../../IconButton';
import SimpleDropDown from '../../SimpleDropDown';
import styles from '../SidePanel.module.scss';

interface IGraphSettingsDataProps {
  setVariant: (el: string) => string;
}

interface IObject {
  id: string | number;
  type: string;
  name: string;
}

interface IMapperItem {
  name: string;
  currentArr: Array<IObject>;
  currentFunc: (arr: Array<IObject>) => void;
  id: number;
}

const GraphSettingsData: FC<IGraphSettingsDataProps> = ({ setVariant }) => {
  const [objectsCategory, setObjectsCategory] = useState<Array<IObject>>([]);
  const [objectsValues, setObjectsValues] = useState<Array<IObject>>([]);
  const [objectsColor, setObjectsColor] = useState<Array<IObject>>([]);

  const mapper: Array<IMapperItem> = [
    {
      name: `Ось значений (${objectsValues.length})`,
      currentArr: objectsValues,
      currentFunc: setObjectsValues,
      id: 1,
    },
    {
      name: `Ось категории (${objectsCategory.length})`,
      currentArr: objectsCategory,
      currentFunc: setObjectsCategory,
      id: 2,
    },
    {
      name: `Цвет (${objectsColor.length})`,
      currentArr: objectsColor,
      currentFunc: setObjectsColor,
      id: 3,
    },
  ];

  const handleDrop =
    (arr: Array<IObject>, curFunc: (arr: Array<IObject>) => void) =>
    (e: DragEvent<HTMLDivElement>): void => {
      e.preventDefault();

      const currentItem = JSON.parse(e.dataTransfer.getData('text'));
      if (!arr.map((i) => i.id).includes(currentItem.id)) {
        curFunc([...arr, currentItem]);
      }
    };

  const handleDragOver = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
  };

  const onDeleteItem = (
    currArr: Array<IObject>,
    currFunc: (arr: Array<IObject>) => void,
    id: string | number,
  ) => currFunc(currArr.filter((item) => item.id !== id));

  return (
    <>
      <div>
        <div className={styles.heading}>Преобразовать в</div>
        <div className={styles.iconsContainer}>
          {GRAPH_ICONS.map((i) => (
            <div
              className={styles.icon}
              onClick={() => setVariant(i.type)}
              key={i.text}
            >
              {i.icon}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.heading}>
        Присвоение данных
        {mapper.map((i: IMapperItem) => {
          return (
            <div key={i.id} className={styles.ind}>
              <SimpleDropDown title={i.name} titleClassName={styles.text}>
                {i.currentArr?.map((obj) => {
                  return (
                    <div className={styles.droppedObject} key={obj.id}>
                      <div className={styles.flex}>
                        {getIconByItemType(obj.type)}
                        <span className={styles.title}>{obj.name}</span>
                      </div>
                      <IconButton
                        className={styles.btn}
                        icon={<DeleteIcon />}
                        onClick={() => {
                          onDeleteItem(i.currentArr, i.currentFunc, obj.id);
                        }}
                      />
                    </div>
                  );
                })}
                <div
                  className={styles.chartObjectItem}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop(i.currentArr, i.currentFunc)}
                >
                  Перетащите объект из списка объектов
                </div>
              </SimpleDropDown>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default GraphSettingsData;
