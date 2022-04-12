import PropTypes from 'prop-types';
import IconButton from '../../IconButton';
import { ReactComponent as ArrowRightIcon } from '../../../../layout/assets/arrow-right.svg';
import { ReactComponent as ArrowLeftIcon } from '../../../../layout/assets/arrowLeft.svg';
import { ReactComponent as ArrowUpIcon } from '../../../../layout/assets/arrow-up.svg';
import styles from './ListNavBarActions.module.scss';

const ListNavBarActions = ({
  onPrevClick,
  onNextClick,
  onUpClick,
  actionButtonIsDisable
}) => {
  return (
    <div className={styles.navigationActions}>
      <div>
        <IconButton
          className={styles.btnPrev}
          icon={<ArrowLeftIcon />}
          onClick={onPrevClick}
          disabled={actionButtonIsDisable.prev}
        />
        <IconButton
          className={styles.btnNext}
          icon={<ArrowRightIcon />}
          onClick={onNextClick}
          disabled={actionButtonIsDisable.next}
        />
      </div>
      <IconButton
        className={styles.btnUp}
        icon={<ArrowUpIcon />}
        onClick={onUpClick}
        disabled={actionButtonIsDisable.up}
      />
    </div>
  );
};

export default ListNavBarActions;

ListNavBarActions.propTypes = {
  onPrevClick: PropTypes.func,
  onNextClick: PropTypes.func,
  onUpClick: PropTypes.func,
  actionButtonIsDisable: PropTypes.object
};
