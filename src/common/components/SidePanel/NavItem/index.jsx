import React from "react";
import styles from "./NavItem.module.scss";
import { Tooltip } from "@material-ui/core";
import clsx from "clsx";

export default function NavItem(props) {
  function handleClick() {
    props.onClick(props.id);
  }

  const itemClass = clsx(styles.navigation__item, {
    [styles.navigation__item_active]: props.active,
  });

  return (
    <div className={itemClass} onClick={handleClick}>
      <Tooltip title={props.title} placement="top">
        {props.icon}
      </Tooltip>
    </div>
  );
}
