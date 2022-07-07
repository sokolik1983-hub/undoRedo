/* eslint-disable import/prefer-default-export */
import styles from '../SidePanel.module.scss';

export const View = () => {

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
          Просмотр
        </summary>
        <div className={styles.indents}>
          <details>
            <summary className={styles.text}>
              Условные обозначения
            </summary>
          </details>
          <details>
            <summary className={styles.text}>
              Ось категории
            </summary>
          </details>
          <details>
            <summary className={styles.text}>
              Ось значений
            </summary>
          </details>
          <details>
            <summary className={styles.text}>
              Скрыть диаграмму
            </summary>
          </details>
          <details>
            <summary className={styles.text}>
              Измерения и показатели
            </summary>
          </details>
        </div>
      </details>
      <details>
        <summary className={styles.heading}>
          Ошибки и предупреждения
        </summary>
      </details>
    </div>
  )
}