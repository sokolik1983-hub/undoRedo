/* eslint-disable import/prefer-default-export */
import styles from '../SidePanel.module.scss';

export const Format = () => {
  // const graphItems = [{
  //   id: 1
  // }, {
  //   id: 2
  // },{
  //   id: 3
  // }]

  return (
    <div className={styles.itemsWrapper}>
      <details>
        <summary className={styles.heading}>
          Размер
        </summary>
      </details>
      <details>
        <summary className={styles.heading}>
          Относительная позиция
        </summary>
      </details>
      <details>
        <summary className={styles.heading}>
          Формат
        </summary>
      </details>
    </div>
  )
}