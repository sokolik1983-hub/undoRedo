import React from "react";
import UserActions from "../UserActions";
import styles from "./TopBar.module.scss";
import Logo from "../Logo";
import Select from '../../../common/components/Select';

function TopBar() {
  return (
    <header className={styles.header}>
      <Logo />
      <Select options={[{value: '1', text: '1'}, {value: '2', text: '2'}, {value: '3', text: '3'}]} />
      <UserActions />
    </header>
  );
}

export default TopBar;
