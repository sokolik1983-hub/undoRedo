import IconButton from '../../../../common/components/IconButton';
import { ReactComponent as Magnifier } from '../../../../layout/assets/magnifier.svg';
import { ReactComponent as OrangeIcon } from '../../../../layout/assets/queryPanel/orangeIcon.svg';
import { ReactComponent as GreenIcon } from '../../../../layout/assets/queryPanel/greenIcon.svg';
import { ReactComponent as BlueIcon } from '../../../../layout/assets/queryPanel/blueIcon.svg';
import styles from './ObjectsPanelFilters.module.scss';

const ObjectsPanelFilters = () => {
  return (
    <div className={styles.root}>
      <IconButton className={styles.iconBtn} icon={<Magnifier />} />
      <IconButton className={styles.iconBtn} icon={<OrangeIcon />} />
      <IconButton className={styles.iconBtn} icon={<GreenIcon />} />
      <IconButton className={styles.iconBtn} icon={<BlueIcon />} />
    </div>
  );
};

export default ObjectsPanelFilters;
