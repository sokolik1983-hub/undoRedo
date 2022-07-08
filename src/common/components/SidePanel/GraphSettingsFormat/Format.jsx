import styles from '../SidePanel.module.scss';
import SimpleDropDown from '../../SimpleDropDown';

const Format = () => {
  // const graphItems = [{
  //   id: 1
  // }, {
  //   id: 2
  // },{
  //   id: 3
  // }]

  return (
    <div className={styles.itemsWrapper}>
      <SimpleDropDown
        title='Размер'
        titleClassName={styles.heading}
      />
      <SimpleDropDown
        title='Относительная позиция'
        titleClassName={styles.heading}
      />
      <SimpleDropDown
        title='Формат'
        titleClassName={styles.heading}
      />
    </div>
  )
}

export default Format;