import React from 'react';

import SaveIcon from '@material-ui/icons/Save';
import UndoIcon from '@material-ui/icons/Undo';
import RedoIcon from '@material-ui/icons/Redo';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import RefreshIcon from '@material-ui/icons/Refresh';
import TableChartIcon from '@material-ui/icons/TableChart';
import PieChartIcon from '@material-ui/icons/PieChart';
import TextFieldsIcon from '@material-ui/icons/TextFields';

import PermDataSettingIcon from '@material-ui/icons/PermDataSetting';
import AccountTreeIcon from '@material-ui/icons/AccountTree';

import { useDispatch, useSelector } from 'react-redux';
import {
  setReportPanelVisible,
  setCreatingElement,
  setConfigPanelVisible,
  setFormulaEditorVisible
} from '../../../data/reducers/reportDesigner';
import ActionsGroup from '../../../common/components/ActionsGroup';
import styles from './ReportActions.module.scss';
import { showNotification } from '../../../data/reducers/notifications';
import { showQueryPanel } from '../../../data/reducers/ui';

function ReportActions() {
  const dispatch = useDispatch();
  const reportUi = useSelector(state => state.app.reportDesigner.ui);

  return (
    <div className={styles.root}>
      <div className={styles.leftActions}>
        <ActionsGroup
          title="File"
          titleClassName={styles.text}
          actions={[
            {
              id: 'SAVE',
              name: 'Save',
              icon: <SaveIcon className={styles.icon} />
            },
            {
              id: 'UNDO',
              name: 'Undo',
              icon: <UndoIcon className={styles.icon} />
            },
            {
              id: 'REDO',
              name: 'Redo',
              icon: <RedoIcon className={styles.icon} />
            }
          ]}
        />
        <ActionsGroup
          title="Data"
          titleClassName={styles.text}
          actions={[
            {
              id: 'DATA',
              name: 'Change data',
              icon: <EqualizerIcon className={styles.icon} />,
              action: () => dispatch(showQueryPanel())
            },
            {
              id: 'REFRESH',
              name: 'Refresh data',
              icon: <RefreshIcon className={styles.icon} />,
              action: () =>
                dispatch(
                  showNotification({ message: 'alloha', messageType: 'error' })
                )
            }
          ]}
        />
        <ActionsGroup
          title="Insert"
          titleClassName={styles.text}
          actions={[
            {
              id: 'TABLE',
              name: 'Insert table',
              icon: <TableChartIcon className={styles.icon} />,
              action: () => dispatch(setCreatingElement('table')),
              isActive: reportUi && reportUi.creatingElement === 'table'
            },
            {
              id: 'GRAPH',
              name: 'Insert graph',
              icon: <PieChartIcon className={styles.icon} />,
              action: () => dispatch(setCreatingElement('graph')),
              isActive: reportUi && reportUi.creatingElement === 'graph'
            },
            {
              id: 'TEXT',
              name: 'Insert text',
              icon: <TextFieldsIcon className={styles.icon} />,
              action: () => dispatch(setCreatingElement('text')),
              isActive: reportUi && reportUi.creatingElement === 'text'
            }
          ]}
        />
      </div>
      <div className={styles.rightActions}>
        <ActionsGroup
          titleClassName={styles.text}
          actions={[
            {
              id: 'FORMULA',
              name: 'Show Formula Editor panel',
              icon: <PermDataSettingIcon className={styles.icon} />,
              action: () => dispatch(setFormulaEditorVisible()),
              isActive: reportUi && reportUi.showFormulaEditor
            },
            {
              id: 'CONFIG',
              name: 'Show config panel',
              icon: <PermDataSettingIcon className={styles.icon} />,
              action: () => dispatch(setConfigPanelVisible()),
              isActive: reportUi && reportUi.showConfigPanel
            },
            {
              id: 'NAVIGATION',
              name: 'Show report navigation',
              icon: <AccountTreeIcon className={styles.icon} />,
              action: () => dispatch(setReportPanelVisible()),
              isActive: reportUi && reportUi.showReportPanel
            }
          ]}
        />
      </div>
    </div>
  );
}

export default ReportActions;
