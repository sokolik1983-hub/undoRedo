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
import TrendingUpIcon from '@material-ui/icons/TrendingUp';

import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';
import FormatAlignJustifyIcon from '@material-ui/icons/FormatAlignJustify';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatClearIcon from '@material-ui/icons/FormatClear';
import FormatColorFillIcon from '@material-ui/icons/FormatColorFill';
import FormatColorTextIcon from '@material-ui/icons/FormatColorText';
import FormatSizeIcon from '@material-ui/icons/FormatSize';

import { ActionCreators } from 'redux-undo';
import { useDispatch, useSelector } from 'react-redux';
import {
  setReportPanelVisible,
  setCreatingElement,
  setConfigPanelVisible,
  setFormulaEditorVisible,
  setActiveNodeStyle
} from '../../../data/reducers/reportDesigner';
import ActionsGroup from '../../../common/components/ActionsGroup';
import styles from './ReportActions.module.scss';
import { showNotification } from '../../../data/reducers/notifications';
import { showQueryPanel } from '../../../data/reducers/ui';
import ColorPicker from '../../../common/components/ColorPicker';

function ReportActions() {
  const dispatch = useDispatch();
  const reportDesigner = useSelector(state => state.app.reportDesigner);

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
              icon: <UndoIcon className={styles.icon} />,
              action: () => dispatch(ActionCreators.undo())
            },
            {
              id: 'REDO',
              name: 'Redo',
              icon: <RedoIcon className={styles.icon} />,
              action: () => dispatch(ActionCreators.redo())
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
              isActive: reportDesigner.reportsUi?.ui.creatingElement === 'table'
            },
            {
              id: 'GRAPH',
              name: 'Insert graph',
              icon: <PieChartIcon className={styles.icon} />,
              action: () => dispatch(setCreatingElement('graph')),
              isActive: reportDesigner.reportsUi?.ui.creatingElement === 'graph'
            },
            {
              id: 'TEXT',
              name: 'Insert text',
              icon: <TextFieldsIcon className={styles.icon} />,
              action: () => dispatch(setCreatingElement('text')),
              isActive: reportDesigner.reportsUi?.ui.creatingElement === 'text'
            },
            {
              id: 'SHAPE',
              name: 'Insert shape',
              icon: <TrendingUpIcon className={styles.icon} />,
              action: () => dispatch(setCreatingElement('shape')),
              isActive: reportDesigner.reportsUi?.ui.creatingElement === 'shape'
            }
          ]}
        />
        {reportDesigner.reportsData.present.activeNodes.length > 0 && (
          <ActionsGroup
            title="Format"
            titleClassName={styles.text}
            actions={[
              {
                id: 'BOLD',
                name: 'Bold Text',
                icon: <FormatBoldIcon className={styles.icon} />,
                action: () =>
                  dispatch(setActiveNodeStyle({ fontWeight: 'bold' })),
              },
              {
                id: 'ITALIC',
                name: 'Insert graph',
                icon: <FormatItalicIcon className={styles.icon} />,
                action: () =>
                  dispatch(setActiveNodeStyle({ fontStyle: 'italic' })),
              },
              {
                id: 'LEFT_ALIGN',
                name: 'Insert text',
                icon: <FormatAlignLeftIcon className={styles.icon} />,
                action: () =>
                  dispatch(setActiveNodeStyle({ textAlign: 'left' })),
                
              },
              {
                id: 'CENTER_ALIGN',
                name: 'Insert text',
                icon: <FormatAlignCenterIcon className={styles.icon} />,
                action: () =>
                  dispatch(setActiveNodeStyle({ textAlign: 'center' })),
               
              },
              {
                id: 'JUSTIFY_ALIGN',
                name: 'Insert text',
                icon: <FormatAlignJustifyIcon className={styles.icon} />,
                action: () =>
                  dispatch(setActiveNodeStyle({ textAlign: 'justify' })),
              
              },
              {
                id: 'RIGHT_ALIGN',
                name: 'Insert text',
                icon: <FormatAlignRightIcon className={styles.icon} />,
                action: () =>
                  dispatch(setActiveNodeStyle({ textAlign: 'right' })),
               
              },
              {
                id: 'BACK_COLOR',
                name: 'Insert text',
                icon: (
                  <ColorPicker
                    icon={<FormatColorFillIcon />}
                    className={styles.icon}
                    onChangeColor={color => {
                      dispatch(setActiveNodeStyle({ backgroundColor: color }));
                    }}
                  />
                ),
               
              },
              {
                id: 'FONT_COLOR',
                name: 'Insert text',
                icon: (
                  <ColorPicker
                    icon={<FormatColorTextIcon />}
                    className={styles.icon}
                    onChangeColor={color => {
                      dispatch(setActiveNodeStyle({ color }));
                    }}
                  />
                ),
              
              },
              {
                id: 'FONT_SIZE',
                name: 'Insert text',
                icon: <FormatSizeIcon className={styles.icon} />,
                action: () =>
                  dispatch(setActiveNodeStyle({ fontSize: '24px' })),
            
              },
              {
                id: 'CLEAR_STYLE',
                name: 'Insert text',
                icon: <FormatClearIcon className={styles.icon} />,
                action: () => dispatch(setActiveNodeStyle({})),
             
              }
            ]}
          />
        )}
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
              isActive: reportDesigner.reportsUi?.ui.showFormulaEditor
            },
            {
              id: 'CONFIG',
              name: 'Show config panel',
              icon: <PermDataSettingIcon className={styles.icon} />,
              action: () => dispatch(setConfigPanelVisible()),
              isActive: reportDesigner.reportsUi?.ui.showConfigPanel
            },
            {
              id: 'NAVIGATION',
              name: 'Show report navigation',
              icon: <AccountTreeIcon className={styles.icon} />,
              action: () => dispatch(setReportPanelVisible()),
              isActive: reportDesigner.reportsUi?.ui.showReportPanel
            }
          ]}
        />
      </div>
    </div>
  );
}

export default ReportActions;
