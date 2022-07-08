/* eslint-disable react/prop-types */
import { GRAPH_ICONS } from '../../../constants/reportDesigner/reportDesignerIcons';
import styles from '../SidePanel.module.scss';
import SimpleDropDown from '../../SimpleDropDown';

const GraphSettingsData = ({ setVariant }) => {

  const graphItems = [{
    id: 1
  }, {
    id: 2
  },{
    id: 3
  }]

  return (
    <>
      <div>
        <div className={styles.heading}>Преобразовать в</div>
        <div className={styles.iconsContainer}>
          {GRAPH_ICONS.map(i => (
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
        <div className={styles.itemsWrapper}>
          <SimpleDropDown
            title='Ось значений'
            titleClassName={styles.text}
          >
            {graphItems?.map(object => {
            return (
              <div 
                className={styles.chartObjectItem}
                key={object.id}
                draggable
                onDragStart={event => {
                  event.dataTransfer.setData(
                    'text/plain',
                    JSON.stringify({
                      object,
                      source: 'graph'
                    })
                  );
                }}
              >
                Перетащите объект из списка объектов
              </div>
          )})}
          </SimpleDropDown>
          <SimpleDropDown
            title='Ось категории'
            titleClassName={styles.text}
          >
            {graphItems?.map(object => {
            return (
              <div 
                className={styles.chartObjectItem}
                key={object.id}
                draggable
                onDragStart={event => {
                  event.dataTransfer.setData(
                    'text/plain',
                    JSON.stringify({
                      object,
                      source: 'graph'
                    })
                  );
                }}
              >
                Перетащите объект из списка объектов
              </div>
          )})}
          </SimpleDropDown>
          <SimpleDropDown
            title='Цвет'
            titleClassName={styles.text}
          >
            {graphItems?.map(object => {
            return (
              <div 
                className={styles.chartObjectItem}
                key={object.id}
                draggable
                onDragStart={event => {
                  event.dataTransfer.setData(
                    'text/plain',
                    JSON.stringify({
                      object,
                      source: 'graph'
                    })
                  );
                }}
              >
                Перетащите объект из списка объектов
              </div>
          )})}
          </SimpleDropDown>
        </div>
      </div>
    </>
  )
}

export default GraphSettingsData;