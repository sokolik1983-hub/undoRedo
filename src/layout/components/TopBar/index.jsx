import styles from './TopBar.module.scss';
import Logo from './Logo';
import UserMenu from './UserMenu';
import PageActions from './PageActions';

const TopBar = () => {
  return (
    <header className={styles.header}>
      <Logo />
      <div className={styles.actions}>
        <PageActions />
      </div>
      <div className={styles.userMenuWrapper}>
        <UserMenu />
      </div>
    </header>
  );
}

export default TopBar;
