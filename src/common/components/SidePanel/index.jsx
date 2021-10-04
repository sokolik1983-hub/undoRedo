import React, { useState } from "react";
import styles from "./SidePanel.module.scss";
import SettingsIcon from "@material-ui/icons/Settings";
import NavigationMenu from "./NavigationMenu";
import lodash from "lodash";

const NAV_MENU = [
  { id: 1, title: "Settings", icon: <SettingsIcon /> },
  { id: 2, title: "Data", icon: <SettingsIcon /> },
  { id: 3, title: "Export", icon: <SettingsIcon /> },
];

export default function SidePanel(props) {
  const [activePage, setActivePage] = useState(1);

  function getMenuItem() {
    const selectedMenuItem = lodash.find(
      NAV_MENU,
      (item) => item.id === activePage
    );
    return selectedMenuItem ? selectedMenuItem : {};
  }

  return (
    <div
      className={styles.root}
      style={{
        right: props.marginRight,
        marginRight: props.marginRight ? 5 : 0,
      }}
    >
      <NavigationMenu
        menu={NAV_MENU}
        onClick={setActivePage}
        activePage={activePage}
      />
      <div>{getMenuItem().title}</div>
      <div>content</div>
    </div>
  );
}
