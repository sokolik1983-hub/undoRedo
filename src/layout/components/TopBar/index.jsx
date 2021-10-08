import React from "react";
import UserActions from "./UserActions";
import styles from "./TopBar.module.scss";
import Logo from "./Logo";
import PageDescription from "./PageDescription";

function TopBar() {
  return (
    <header className={styles.header}>
      <Logo />
      <PageDescription />
      <UserActions />
    </header>
  );
}

export default TopBar;
