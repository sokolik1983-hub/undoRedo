import React, { useState } from 'react';
import { ReactComponent as NavIcon } from '../../../assets/reportDesigner/nav.svg';
import { ReactComponent as ArrowIcon } from '../../../assets/reportDesigner/arrow.svg';
import styles from '../ReportActions.module.scss';
import TextInput from '../../../../common/components/TextInput';

const PagesNav = () => {
  
  const [curPage, setCurPage] = useState(1);
  const pages = 27; 
  
  const handlePageChange = (e) => {
    setCurPage(Number(e.target.value.replace(/\D/g, '')));
  };

  const validateCurPage = (page) => {
    // eslint-disable-next-line no-nested-ternary
    return page === 0 ? '' : pages - page < 0 ? setCurPage(pages) : page;
  };
  return (
    <div className={styles.navigation}>
      <div className={styles.firstPage} onClick={() => setCurPage(1)}>
        <p className={styles.firstPageText}>1</p> 
        <NavIcon />
      </div>
      <div className={styles.indents} onClick={() => curPage > 1 ? setCurPage(curPage-1) : curPage}>
        <ArrowIcon />
      </div>
      <div className={styles.input}>
        <TextInput value={validateCurPage(curPage)} onChange={handlePageChange} className={styles.inpitValue} id='23' />
      </div>
      <div className={styles.indents} onClick={() => curPage < pages ? setCurPage(curPage+1) : curPage}>
        <ArrowIcon className={styles.rotate} />
      </div>
      <div className={styles.lastPage} onClick={() => setCurPage(pages)}>
        <NavIcon className={styles.rotate} />
        <p className={styles.lastPageText}>{pages}</p>
      </div>
    </div>
  )
}

export default PagesNav;