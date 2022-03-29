import IconButton from '../../../../common/components/IconButton';
import { ReactComponent as Magnifier } from '../../../../layout/assets/magnifier.svg';
import { ReactComponent as GaugeIcon } from '../../../../layout/assets/queryPanel/gauge-icon.svg';
import { ReactComponent as MeasurementIcon } from '../../../../layout/assets/queryPanel/measurement-icon.svg';
import { ReactComponent as AttributeIcon } from '../../../../layout/assets/queryPanel/attribute-icon.svg';
import styles from './ObjectsPanelFilters.module.scss';

const ObjectsPanelFilters = () => {
  return (
    <div className={styles.root}>
      <IconButton className={styles.iconBtn} icon={<Magnifier />} />
      <IconButton className={styles.iconBtn} icon={<GaugeIcon />} />
      <IconButton className={styles.iconBtn} icon={<AttributeIcon />} />
      <IconButton className={styles.iconBtn} icon={<MeasurementIcon />} />
    </div>
  );
};

export default ObjectsPanelFilters;
