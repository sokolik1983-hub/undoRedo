/* eslint-disable react/prop-types */
import styles from './ReportObjectsPanel.module.scss';
import { ReactComponent as StructureIcon } from '../../../../layout/assets/reportDesigner/structure.svg';
import { ReactComponent as HeaderIcon } from '../../../../layout/assets/reportDesigner/structureHeader.svg';
import { ReactComponent as BodyIcon } from '../../../../layout/assets/reportDesigner/structureBody.svg';
import { ReactComponent as FooterIcon } from '../../../../layout/assets/reportDesigner/structureFooter.svg';
import { ReactComponent as TextIcon } from '../../../../layout/assets/reportDesigner/structureText.svg';
import { ReactComponent as TableIcon } from '../../../../layout/assets/reportDesigner/structureTable.svg';

const Structure = ({currentReport}) => {

 

return (
  <div className={styles.сontainer}>
    <div className={styles.wrapper}>
      <StructureIcon />
      <p className={styles.report}>
        {currentReport?.name}
      </p>
    </div>
    <div className={styles.wrapperInner}> 
      <div className={styles.wrapperBlock}>
        <div className={styles.block}>
          <HeaderIcon />
          <p className={styles.text}>{currentReport?.structure?.pgHeader?.name}</p>
        </div>
        <div className={styles.innerBlock}>
          <TextIcon />
          <p className={styles.innerText}>Заголовок отчета</p>
        </div>
      </div>
      <div className={styles.wrapperBlock}>
        <div className={styles.block}>
          <BodyIcon />
          <p className={styles.text}>{currentReport?.structure?.pgBody?.name}</p>
        </div>
        <div className={styles.innerBlock}>
          <TableIcon />
          <p className={styles.innerText}>Кросс-таблица 15</p>
        </div>
      </div>
      <div className={styles.wrapperBlock}>
        <div className={styles.block}>
          <FooterIcon />
          <p className={styles.text}>{currentReport?.structure?.pgFooter?.name}</p>
        </div>
        <div className={styles.innerBlock}>
          <TextIcon />
          <p className={styles.innerText}>Копирайт</p>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Structure;
