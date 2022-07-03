import PropTypes from 'prop-types';
import IconButton from '../../../../common/components/IconButton';
import { ReactComponent as SaveIcon } from '../../../../layout/assets/icons/tableSave.svg';
import styles from './SideBarTabContent.module.scss';

const SideBarTabContent = ({ title, desc, action }) => {
  return (
    <div>
      <div className={styles.description}>{desc}</div>
      <div className={styles.titleGroup}>
        <div className={styles.title}>{title}</div>
        <IconButton
          className={styles.icon}
          icon={<SaveIcon />}
          onClick={action}
        />
      </div>
    </div>
  );
};

export default SideBarTabContent;

SideBarTabContent.propTypes = {
  title: PropTypes.string,
  desc: PropTypes.string,
  action: PropTypes.func
};
