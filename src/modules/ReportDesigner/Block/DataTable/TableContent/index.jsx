/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';

import {structureUpdatedChecker} from './helpers'

import TableBody from './TableBody';
import styles from './TableContent.module.scss';
import TableFooter from './TableFooter';
import TableHeader from './TableHeader';

const structureChecker = structureUpdatedChecker()

const TableContent = ({
  layout,
  displayMode,
  blockStyles,
  // reportData,
  variables,
  tableType,
  ...props
}) => {
  // const dpData = reportData?.dpData;
  // const dpObjects = reportData?.dpObjects;

  const [needRefresh, setNeedRefresh] = useState(true)

  const headerZone = layout.zones.filter(item => item.vType === 'header');
  const bodyZone = layout.zones.filter(item => item.vType === 'body');
  const footerZone = layout.zones.filter(item => item.vType === 'footer');

  useEffect(async () => {
    const checkResult = structureChecker(layout.zones)

    setNeedRefresh(checkResult)
  }, [layout, displayMode]);


  return (
    <table style={{ ...blockStyles }}>
      <TableHeader
        data={headerZone}
        displayMode={displayMode}
        // reportData={{ dpData, dpObjects }}
        variables={variables}
        tableType={tableType}
        needRefresh={needRefresh}
      />
      <TableBody
        bodyZone={bodyZone}
        headerZone={headerZone}
        footerZone={footerZone}
        displayMode={displayMode}
        // reportData={{ dpData, dpObjects }}
        variables={variables}
        tableType={tableType}
        needRefresh={needRefresh}
      />
      <TableFooter
        data={footerZone}
        displayMode={displayMode}
        // reportData={{ dpData, dpObjects }}
        variables={variables}
        tableType={tableType}
        needRefresh={needRefresh}
      />
    </table>
  );
};

export default TableContent;
