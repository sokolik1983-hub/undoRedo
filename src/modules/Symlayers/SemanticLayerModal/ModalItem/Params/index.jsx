import React from 'react';
import ModalItem from '..';
import styles from './Params.module.scss';
import TextInput from '../../../../../common/components/TextInput';
import Button from '../../../../../common/components/Button';

const tableData = [
  {
    name: '123',
    value: '321'
  },
  {
    name: '123',
    value: '321'
  },
  {
    name: '123',
    value: '321'
  },
  {
    name: '123',
    value: '321'
  },
  {
    name: '123',
    value: '321'
  },
];

const Params = () => {
  return (
    <ModalItem noPadding title='Параметры'>
      <div className={styles.wrapperColumn}>
        <div className={styles.table}>
          <table>
            <thead>
              <tr>
                <td className={styles.title}>
                  <div className={styles.titleBlock}>имя</div>
                </td>
                <td className={styles.title}>
                  <div className={styles.titleBlock}>значение</div>
                </td>
              </tr>
            </thead>
            <tbody>
              {tableData.map(item => (
                <tr>
                  <td className={styles.text}>
                    <div className={styles.textBlock}>{item.name}</div>
                  </td>
                  <td className={styles.text}>
                    <div className={styles.textBlock}>{item.value}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={styles.addParamBlock}>
          <div className={styles.wrapperColumn}>
            <p className={styles.text}>
              Добавить параметр
            </p>
            <div className={styles.inputsWrapper}>
              <div className={styles.inputWrapper}>
                <TextInput labelClassName={styles.label} className={styles.input} label='имя' />
              </div>
              <div className={styles.inputWrapper}>
                <TextInput labelClassName={styles.label} className={styles.input} label='значение' />
              </div>
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