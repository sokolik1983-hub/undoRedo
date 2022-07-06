/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import lodash from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import Block from '../../Block';
import styles from './ReportBody.module.scss';
import { getCurrentReport } from '../../helpers';
import {
  setActiveNodes,
  setConfigPanelVisible,
  setStructure
} from '../../../../data/reducers/new_reportDesigner';
import { setReportStructure } from '../../../../data/actions/newReportDesigner';

const ReportBody = ({ data, onSelect, isActiveNode }) => {
  const dispatch = useDispatch();
  const reportDesigner = useSelector(state => state.app.reportDesigner);
  const currentReport = getCurrentReport(
    reportDesigner.reportsData.present.reports,
    reportDesigner.reportsData.present.activeReport
  );

  const children = data?.content?.children;

  

  function handleChangePosition(id, newPosition) {
    const newStructure = lodash.cloneDeep(currentReport.structure);
    const currentBlock = lodash.find(
      newStructure.pgBody.content.children,
      item => item.id === id
    );
    if (currentBlock) {
      currentBlock.position = { ...currentBlock.position, ...newPosition };
    }

    dispatch(setStructure(newStructure));
    // dispatch(
    //   setReportStructure({
    //     report_id: currentReport.id,
    //     structure: newStructure
    //   })
    // );
  }

  function handleChangeScales(id, newScales) {
    const newStructure = lodash.cloneDeep(currentReport.structure);
    const currentBlock = lodash.find(
      newStructure.pgBody.content.children,
      item => item.id === id
    );
    if (currentBlock) {
      currentBlock.scales = {
        width: newScales.width,
        height: newScales.height
      };
      currentBlock.position = {
        ...currentBlock.position,
        x: newScales.x,
        y: newScales.y
      };
    }

    dispatch(setStructure(newStructure));
    // dispatch(
    //   setReportStructure({
    //     report_id: currentReport.id,
    //     structure: newStructure
    //   })
    // );
  }

  return (
    <div className={styles.root}>
      {children?.map(item => {
        return (
          <Block
            {...item}
            key={item.id}
            structureItem={item}
            onChangePosition={handleChangePosition}
            onChangeScales={handleChangeScales}
            onSelect={onSelect}
            isActiveNode={isActiveNode(item.id)}
          />
        );
      })}
    </div>
  );
};

export default ReportBody;
