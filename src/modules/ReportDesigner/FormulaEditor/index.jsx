/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import lodash from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '../../common/components/IconButton';
import {
  setActiveNodes,
  setConfigPanelVisible,
  setActiveNodeFormula
} from '../../data/reducers/new_reportDesigner';
import { BUTTON } from '../../common/constants/common';
import Button from '../../common/components/Button';
import styles from './ReportDesigner.module.scss';
import { createReportElement, getCurrentReport } from './helpers';
// import SidePanel from '../../common/components/SidePanel';
import { setCurrentPage } from '../../data/reducers/ui';
import { PAGE } from '../../common/constants/pages';
import {
  getStreamReceiever,
  getReportStructure,
  getVariables,
  refreshServerResponse,
  getElementData
} from '../../data/actions/newReportDesigner';
// import { SIDE_PANEL_TYPES } from '../../common/constants/common';
import FormulaEditor from '../../common/components/FormulaEditor';
// import Sidebar from '../SymlayersDesigner/Sidebar';
// import ObjectsPanel from '../QueryPanel/ObjectsPanel';
// import DragNDropProvider from '../QueryPanel/context/DragNDropContext';
// import { getSymanticLayerData } from '../../data/actions/universes';
import { ReactComponent as CloseIcon } from '../../layout/assets/close.svg';
import ReportSidebar from './ReportSidebar';
import QueryPanel from '../QueryPanel';
import ReportContent from './ReportContent';
import { ReactComponent as MiniFormulaIcon } from '../../layout/assets/reportDesigner/miniFormula.svg';
import { ReactComponent as OkFormulaIcon } from '../../layout/assets/reportDesigner/okFormula.svg';
import { ReactComponent as ClearFormulaIcon } from '../../layout/assets/reportDesigner/clearFormula.svg';

const FormulaEditor = () => {
  return (
    <div className={activeTab === 1 ? formulaCompressed : styles.formula}>
      <MiniFormulaIcon />
      <textarea
        className={styles.formulaTextarea}
        type="text"
        name="formula"
        value={formula}
        onChange={handleChange}
        disabled={!activeNode}
        onKeyUp={ev => {
          if (ev.key === 'Enter') {
            dispatch(setActiveNodeFormula(ev.target.value));
            dispatch(setActiveNodes([]));
            dispatch(setConfigPanelVisible(false));
          }
        }}
      />
      <div className={styles.formulaIcons}>
        <IconButton
          size="small"
          className={styles.okFormula}
          icon={<OkFormulaIcon />}
          onClick={() => {
            dispatch(setActiveNodeFormula(formula));
            dispatch(setActiveNodes([]));
            dispatch(setConfigPanelVisible(false));
          }}
        />
        <IconButton
          size="small"
          icon={<ClearFormulaIcon />}
          onClick={() => {}}
        />
      </div>
    </div>
  );
};

export default FormulaEditor;
