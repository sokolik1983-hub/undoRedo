import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import Gears from '../../../../../common/components/Gears';
import ModalItem from '..';
import styles from './Connect.module.scss';
import { ReactComponent as WireIcon } from '../../../../../layout/assets/semanticLayerModal/wire.svg';
import Select from '../../../../../common/components/Select';
import Button from '../../../../../common/components/Button';
import {
  getConnectorFolderChildren,
  getConnectorsFolderId
} from '../../../../../data/actions/connectors';

/**
 * @param title - строка для заголовка
 * @param connectorName - строка с названием коннектора
 */

const Connect = ({ title }) => {
  const dispatch = useDispatch();

  const [isActive, setIsActive] = useState(false);

  const onClickAction = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    dispatch(getConnectorsFolderId({ folderType: 'USER_CN' }));
  }, []);

  const connectorsFolderId = useSelector(
    state => state.app.data.connectorsFolderId
  );

  useEffect(() => {
    dispatch(getConnectorFolderChildren({ id: connectorsFolderId }));
  }, [connectorsFolderId]);

  const connectors = useSelector(state => state.app.data.connectors);

  const optionsArray = [];

  const options = () =>
    connectors?.list?.map(item => {
      if (item.kind === 'CON') {
        optionsArray.push({ text: item.name, value: item.name, key: item.id });
      }
      // eslint-disable-next-line no-useless-return, consistent-return
      return;
    });

  options();

  return (
    <ModalItem title={title}>
      <div className={styles.wrapper}>
        <div className={styles.iconWrapper}>
          <div>
            <WireIcon className={styles.wireIcon} />
            <div className={styles.hide}>
              <p className={styles.text}>создать соединение</p>
            </div>
            <Gears isSpinning={isActive} className={styles.gearsIcon} />
          </div>
        </div>
        <Select
          defaultValue={optionsArray[0]?.text || 'Получаем список…'}
          name="name1"
          options={optionsArray}
        />
        <div className={styles.buttonsWrapper}>
          <Button className={styles.edit}>Редактировать</Button>
          <Button type="button" onClick={onClickAction} className={styles.test}>
            Тест соедиения
          </Button>
        </div>
      </div>
    </ModalItem>
  );
};

export default Connect;

Connect.propTypes = {
  title: PropTypes.string,
};

Connect.defaultProps = {
  title: ''
};
