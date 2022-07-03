import PropTypes from 'prop-types';
import PanelListNode from '../../../QueryPanel/ObjectsPanel/ObjectsPanelList/PanelListNode/PanelListNode';
import styles from '../../../QueryPanel/ObjectsPanel/ObjectsPanelList/ObjectsPanelList.module.scss';

const ReportObjectsPanelList = ({ variables }) => {

  return (
    <ul className={styles.root}>
      {variables &&
        variables.map(variable => (
          <li key={variable.id}>
            <ul className={styles.innerListNode}>
              <PanelListNode item={variable} />
            </ul>
          </li>
        ))}
    </ul>
  );
};

export default ReportObjectsPanelList;

ReportObjectsPanelList.propTypes = {
  variables: PropTypes.array
};
