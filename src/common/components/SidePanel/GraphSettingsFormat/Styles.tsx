import React from 'react';

import SimpleDropDown from '../../SimpleDropDown';
import styles from '../SidePanel.module.scss';

const Styles = () => {
  return (
    <div>
      <SimpleDropDown title="Стиль показателя" titleClassName={styles.heading}>
        <div className={styles.text}>Ось значений 1</div>
      </SimpleDropDown>
      <SimpleDropDown title="Палитры" titleClassName={styles.heading} />
      <SimpleDropDown title="Маркеры" titleClassName={styles.heading}>
        <div className={styles.indents}>
          <SimpleDropDown
            title="Граница символа"
            titleClassName={styles.text}
          />
          <SimpleDropDown
            title="Палитра символа"
            titleClassName={styles.text}
          />
        </div>
      </SimpleDropDown>
      <SimpleDropDown title="Гистограмма" titleClassName={styles.heading} />
      <SimpleDropDown title="3D" titleClassName={styles.heading} />
      <SimpleDropDown
        title="Эффекты света и тени"
        titleClassName={styles.heading}
      />
    </div>
  );
};

export default Styles;
