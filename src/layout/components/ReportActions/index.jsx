import { Tooltip } from "@material-ui/core";
import React from "react";
import styles from "./ReportActions.module.scss";

import SaveIcon from "@material-ui/icons/Save";
import UndoIcon from "@material-ui/icons/Undo";
import RedoIcon from "@material-ui/icons/Redo";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import RefreshIcon from "@material-ui/icons/Refresh";
import TableChartIcon from "@material-ui/icons/TableChart";
import PieChartIcon from "@material-ui/icons/PieChart";
import TextFieldsIcon from "@material-ui/icons/TextFields";

import PermDataSettingIcon from "@material-ui/icons/PermDataSetting";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import { showQueryPanel, hideQueryPanel } from "../../../data/reducers/ui";
import { showNotification } from "../../../data/reducers/notifications";
import { useDispatch, useSelector } from "react-redux";
import {
  showReportPanel,
  showConfigPanel,
} from "../../../data/reducers/reportDesigner";
import ActionsGroup from "../../../common/components/ActionsGroup";

function ReportActions() {
  const dispatch = useDispatch();
  const reportUi = useSelector((state) => state.reportDesigner.ui);

  return (
    <div className={styles.root}>
      <div className={styles.leftActions}>
        <ActionsGroup
          title="File"
          titleClassName={styles.text}
          actions={[
            {
              id: "SAVE",
              name: "Save",
              icon: <SaveIcon className={styles.icon} />,
            },
            {
              id: "UNDO",
              name: "Undo",
              icon: <UndoIcon className={styles.icon} />,
            },
            {
              id: "REDO",
              name: "Redo",
              icon: <RedoIcon className={styles.icon} />,
            },
          ]}
        />
        <ActionsGroup
          title="Data"
          titleClassName={styles.text}
          actions={[
            {
              id: "DATA",
              name: "Change data",
              icon: <EqualizerIcon className={styles.icon} />,
              action: () => dispatch(showQueryPanel()),
            },
            {
              id: "REFRESH",
              name: "Refresh data",
              icon: <RefreshIcon className={styles.icon} />,
              action: () =>
                dispatch(
                  showNotification({ message: "alloha", messageType: "error" })
                ),
            },
          ]}
        />
        <ActionsGroup
          title="Insert"
          titleClassName={styles.text}
          actions={[
            {
              id: "TABLE",
              name: "Insert table",
              icon: <TableChartIcon className={styles.icon} />,
            },
            {
              id: "GRAPH",
              name: "Insert graph",
              icon: <PieChartIcon className={styles.icon} />,
            },
            {
              id: "TEXT",
              name: "Insert text",
              icon: <TextFieldsIcon className={styles.icon} />,
            },
          ]}
        />
      </div>
      <div className={styles.rightActions}>
        <ActionsGroup
          titleClassName={styles.text}
          actions={[
            {
              id: "CONFIG",
              name: "Show config panel",
              icon: <PermDataSettingIcon className={styles.icon} />,
              action: () => dispatch(showConfigPanel()),
              isActive: reportUi && reportUi.showConfigPanel,
            },
            {
              id: "NAVIGATION",
              name: "Show report navigation",
              icon: <AccountTreeIcon className={styles.icon} />,
              action: () => dispatch(showReportPanel()),
              isActive: reportUi && reportUi.showReportPanel,
            },
          ]}
        />
      </div>
    </div>
  );
}

export default ReportActions;
