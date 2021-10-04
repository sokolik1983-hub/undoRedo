import React from "react";
// import {
//   AlertCircle as AlertCircleIcon,
// } from "react-feather";
import SettingsInputComponentIcon from "@material-ui/icons/SettingsInputComponent";
import StorageIcon from "@material-ui/icons/Storage";
import PeopleIcon from "@material-ui/icons/People";
import DeleteSweepIcon from "@material-ui/icons/DeleteSweep";

const navigationMenu = [
  {
    href: "/Reporting/audit",
    icon: <SettingsInputComponentIcon />,
    title: "Аудит",
  },
  {
    href: "/Reporting/roles",
    icon: <StorageIcon />,
    title: "Роли",
  },
  {
    href: "/Reporting/users",
    icon: <PeopleIcon />,
    title: "Пользователи и полномочия",
  },
  {
    href: "/Reporting/trash",
    icon: <DeleteSweepIcon />,
    title: "Корзина",
  },
];

export default navigationMenu;
