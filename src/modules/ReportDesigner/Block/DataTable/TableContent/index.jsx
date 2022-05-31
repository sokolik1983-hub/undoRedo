/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import TableBody from './TableBody';
import styles from './TableContent.module.scss';
import TableFooter from './TableFooter';
import TableHeader from './TableHeader';

const TableContent = ({
  layout,
  displayMode,
  blockStyles,
  reportData,
  variables,
  ...props
}) => {
  const { headerZone, bodyZone, footerZone } = layout;
  const dpData = reportData?.dpData;
  const dpObjects = reportData?.dpObjects;

  return (
    <table style={{ ...blockStyles }}>
      <TableHeader
        data={headerZone}
        displayMode={displayMode}
        reportData={{ dpData, dpObjects }}
        variables={variables}
      />
      <TableBody
        data={bodyZone}
        displayMode={displayMode}
        reportData={{ dpData, dpObjects }}
        variables={variables}
      />
      <TableFooter data={footerZone} displayMode={displayMode} />
    </table>
  );
};

export default TableContent;
