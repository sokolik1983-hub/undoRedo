import React from "react";
import UserActions from "../UserActions";
import styles from "./TopBar.module.scss";
import Logo from "../Logo";

function TopBar() {
  return (
    <header className={styles.header}>
      <Logo />
      <UserActions />
    </header>
  );
}

export default TopBar;
