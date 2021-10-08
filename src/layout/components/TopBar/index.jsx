import React from "react";
import UserActions from "./UserActions";
import styles from "./TopBar.module.scss";
import Logo from "./Logo";
import PageDescription from "./PageDescription";
import LoadingIndicator from "./LoadingIndicator";

function TopBar() {
  return (
    <header className={styles.header}>
      <Logo />
      <PageDescription />
      <LoadingIndicator />
      <UserActions />
    </header>
  );
}

export default TopBar;
