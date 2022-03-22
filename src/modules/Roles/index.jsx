import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styles from './Roles.module.scss';
import { setCurrentPage } from '../../data/reducers/ui';
import { PAGE } from '../../common/constants/pages';
import Button from '../../common/components/Button';
import { BUTTON } from '../../common/constants/common';

function Roles() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setCurrentPage(PAGE.ROLES));
  }, []);
  return (
    <>
      <div className={styles.root}>Roles Content</div>
      <Button buttonStyle={BUTTON.SAVE} />
    </>
  );
}

export default Roles;
