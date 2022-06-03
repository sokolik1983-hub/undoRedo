import Button from '../../common/components/Button/index';
import { ReactComponent as NotFound } from '../../layout/assets/notFound.svg';
import { BUTTON } from '../../common/constants/common';
import styles from './NotFoundPage.module.scss';

const NotFoundPage = () => {

  return (
    <div className={styles.root}>
      <h1>Ошибка 404</h1>
      <p>
        Что-то пошло не так...
        <br />
        Стоит попробовать еще раз, но проверив запрос.
      </p>
      <a href="/Universe/dashboard">
        <Button buttonStyle={BUTTON.BIG_BLUE}>
          Ок, вернуться!
        </Button>
      </a>
      <NotFound />
    </div>
  );
};

export default NotFoundPage;
