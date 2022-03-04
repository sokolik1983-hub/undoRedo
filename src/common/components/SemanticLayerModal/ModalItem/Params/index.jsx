import React from 'react';
import ModalItem from '..';
import styles from './Params.module.scss';
import TextInput from '../../../TextInput';
import Button from '../../../Button';

const Params = () => {
  return (
    <ModalItem title='Параметры'>
      <div className={styles.wrapperColumn}>
        <div>
          <table>
            <tr>
              <td className={styles.title}>имя</td>
              <td className={styles.title}>| значение</td>
            </tr>
            <tr>
              <td className={styles.text}>1</td>
              <td className={styles.text}>1</td>
            </tr>
            <tr>
              <td className={styles.text}>1</td>
              <td className={styles.text}>1</td>
            </tr>
          </table>
        </div>
        <div className={styles.color}>
          <div className={styles.wrapperColumn}>
            <p className={styles.text}>
              Добавить параметр
            </p>
            <div className={styles.wrapperInput}>
              <TextInput label='имя' />
              <TextInput label='значение' />
            </div>
          </div>
          <div className={styles.wrapper}>
            <Button className={styles.add}>Добавить</Button>
            <Button className={styles.change}>Заменить</Button>
            <Button className={styles.delete}>Удалить</Button>
          </div>
        </div>
      </div>
    </ModalItem>
  );
};

export default Params;