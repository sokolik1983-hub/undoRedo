import { MenuOutlined } from '@material-ui/icons';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showNav } from '../../../../data/reducers/ui';
import styles from './MenuButton.module.scss';

function MenuButton() {
  const isNavShowing = useSelector(state => state.app.ui?.isNavShowing);
  const dispatch = useDispatch();

  function handleClick() {
    dispatch(showNav(!isNavShowing));
  }

  return <MenuOutlined className={styles.root} onClick={handleClick} />;
}

export default MenuButton;
