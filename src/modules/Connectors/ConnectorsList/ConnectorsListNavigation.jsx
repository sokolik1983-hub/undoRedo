import IconButton from '../../../common/components/IconButton';
import TextInput from '../../../common/components/TextInput';
import styles from './ConnectorsList.module.scss';

function ConnectorsListNavigation() {
  const handleClick = () => {};
  return (
    <div className={styles.navigation}>
      <div className={styles.navigationActions}>
        <IconButton onClick={handleClick} />
        <IconButton onClick={handleClick} />
        <IconButton onClick={handleClick} />
      </div>

      <div className={styles.breadcrumbs}>
        <TextInput />
      </div>

      <div className={styles.view_toggle}>
        <IconButton onClick={handleClick} />
        <IconButton onClick={handleClick} />
      </div>

      <div className={styles.search}>
        <TextInput />
      </div>
    </div>
  );
}

export default ConnectorsListNavigation;
