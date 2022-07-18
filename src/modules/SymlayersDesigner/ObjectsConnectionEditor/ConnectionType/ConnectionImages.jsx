import PropTypes from 'prop-types';

import ConnectorManyIcon from '../../../../layout/assets/connectorMany.svg';
import ConnectorOneIcon from '../../../../layout/assets/connectorOne.svg';
import styles from '../ObjectsConnectionsEditor.module.scss';

const ConnectionImages = ({ side, connectSeveral }) => {
  return (
    <div className={styles.connectImagesWrapper}>
      <div className={side === 'right' && styles.switchSide}>
        {connectSeveral ? <ConnectorManyIcon /> : <ConnectorOneIcon />}
      </div>
    </div>
  );
};

export default ConnectionImages;

ConnectionImages.propTypes = {
  connectSeveral: PropTypes.bool,
  side: PropTypes.string.isRequired,
};
