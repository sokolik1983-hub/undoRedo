import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { PAGE } from '../../common/constants/pages';
import { setCurrentPage } from '../../data/reducers/ui';
import FloatingButton from '../../common/components/FloatingButton';
import { ReactComponent as CreateConnector } from '../../layout/assets/createConnector.svg';
import styles from './Reports.module.scss';

const Reports = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setCurrentPage(PAGE.REPORTS));
  }, []);

  return (
    <>
      <div className={styles.root}>Разместить контент выбора сохраненного отчета, по подобию соединений или юниверсов</div>
      <FloatingButton
        icon={<CreateConnector />}
        text="Создать отчет"
        onClick={console.log('click')}
      />
    </>
  );
}

export default Reports;
