import React from "react";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import styles from "./UserActions.module.scss";
import ActionsGroup from "../../../common/components/ActionsGroup";

function UserActions() {
  return (
    <div className={styles.root}>
      <ActionsGroup
        titleClassName={styles.text}
        actions={[
          {
            id: "QUIT",
            name: "Quit",
            icon: <ExitToAppIcon className={styles.icon} />,
          },
        ]}
      />
    </div>
  );
}

export default UserActions;
