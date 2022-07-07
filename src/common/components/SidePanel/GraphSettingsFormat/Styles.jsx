/* eslint-disable import/prefer-default-export */
import styles from '../SidePanel.module.scss';

export const Styles = () => {

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
          Стиль показателя
        </summary>
      </details>
      <details>
        <summary className={styles.heading}>
          Палитры
        </summary>
      </details>
      <details>
        <summary className={styles.heading}>
          Маркеры
        </summary>
        <div className={styles.indents}>
          <details>
            <summary className={styles.text}>
              Граница символа
            </summary>
          </details>
          <details>
            <summary className={styles.text}>
              Палитра символа
            </summary>
          </details>
        </div>
      </details>
      <details>
        <summary className={styles.heading}>
          Гистограмма
        </summary>
      </details>
      <details>
        <summary className={styles.heading}>
          3D
        </summary>
      </details>
      <details>
        <summary className={styles.heading}>
          Эффекты света и тени
        </summary>
      </details>
    </div>
  )
}