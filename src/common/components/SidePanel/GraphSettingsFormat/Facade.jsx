/* eslint-disable import/prefer-default-export */
import styles from '../SidePanel.module.scss';

export const Facade = () => {

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
          Фон
        </summary>
      </details>
      <details>
        <summary className={styles.heading}>
          Граница
        </summary>
      </details>
    </div>
  )
}