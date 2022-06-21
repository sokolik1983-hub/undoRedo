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

const ReportBody = ({ data }) => {
  const dispatch = useDispatch();
  const reportDesigner = useSelector(state => state.app.reportDesigner);
  const currentReport = getCurrentReport(
    reportDesigner.reportsData.present.reports,
    reportDesigner.reportsData.present.activeReport
  );

  const children = data?.content?.children;

  function checkIsActiveNode(id) {
    return !lodash.isEmpty(
      lodash.find(
        reportDesigner.reportsData.present.activeNodes,
        item => item.id === id
      )
    );
  }

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
    console.log(newScales)

    dispatch(setStructure(newStructure));
  }

  const handleSelect = (structureItem, addItem) => {
    if (
      lodash.find(reportDesigner.reportsData.present.activeNodes, structureItem)
    ) {
      const filteredNodes = reportDesigner.reportsData.present.activeNodes.filter(
        item => item.id !== structureItem.id
      );
      dispatch(setActiveNodes(filteredNodes));
      dispatch(setConfigPanelVisible(false));
    } else {
      let newActiveNodes = [structureItem];
      if (addItem) {
        newActiveNodes = [
          ...reportDesigner.reportsData.present.activeNodes,
          structureItem
        ];
      }
      dispatch(setActiveNodes(newActiveNodes));
      dispatch(setConfigPanelVisible(true));
    }
  };

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
            onSelect={handleSelect}
            isActiveNode={checkIsActiveNode(item.id)}
          />
        );
      })}
    </div>
  );
};

export default ReportBody;
