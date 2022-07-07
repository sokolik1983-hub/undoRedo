/* eslint-disable react/prop-types */
/* eslint-disable import/prefer-default-export */
import { GRAPH_ICONS } from '../../../constants/reportDesigner/reportDesignerIcons';
import styles from '../SidePanel.module.scss';

export const GraphSettingsData = ({ setVariant }) => {

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
          <details>
            <summary className={styles.text}>
              Ось значений
            </summary>
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
          </details>
          <details>
            <summary className={styles.text}>
              Ось категории
            </summary>
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
          </details>
          <details>
            <summary className={styles.text}>
              Цвет
            </summary>
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
          </details>
        </div>
      </div>
    </>
  )
}