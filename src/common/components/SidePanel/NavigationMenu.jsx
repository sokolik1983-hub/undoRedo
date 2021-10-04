import React, { useState } from "react";
import NavItem from "./NavItem/index.jsx";
import styles from "./SidePanel.module.scss";

export default function NavigationMenu(props) {
  function handleClick(id) {
    props.onClick(id);
  }

  return (
    <div className={styles.navigation}>
      {props.menu &&
        props.menu.map((item) => (
          <NavItem
            key={item.id}
            {...item}
            onClick={handleClick}
            active={props.activePage === item.id}
          />
        ))}
    </div>
  );
}
