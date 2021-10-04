import React from "react";
import { Outlet } from "react-router-dom";
import styles from "./Layout.module.scss";
import TopBar from "./components/TopBar";
import Notifications from "../common/components/Notifications";
import PopupDispatcher from "./components/PopupDispatcher";

function Layout() {
  return (
    <div className={styles.root}>
      <TopBar />
      <main className={styles.content}>
        <Outlet />
      </main>
      <PopupDispatcher />
      <Notifications />
    </div>
  );
}

export default Layout;
