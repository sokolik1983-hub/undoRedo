import { Formik } from 'formik';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import Button from '../../common/components/Button';
import TextInput from '../../common/components/TextInput';
import { BUTTON, REDIRECT_LINKS } from '../../common/constants/common';
import { loginUser } from '../../data/auth/authActions';
import AvatarIcon from '../../layout/assets/loginPageAvatar.svg';
import LogoIcon from '../../layout/assets/loginPageLogo.svg';
import styles from './LoginPage.module.scss';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.app.auth);

  useEffect(() => {
    if (auth) {
      if (auth.isAuth) {
        navigate(REDIRECT_LINKS.HOME_PAGE, { replace: false });
      }
    }
  }, [auth]);

  return (
    <div>
      <div className={styles.box}>
        <LogoIcon className={styles.logo} />
        <AvatarIcon className={styles.avatar} />
        <Formik
          initialValues={{
            userName: 'test',
            password: 'test',
          }}
          validationSchema={Yup.object().shape({
            userName: Yup.string().max(255).required(),
            password: Yup.string().max(255).required(),
          })}
          onSubmit={(values) => dispatch(loginUser(values))}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            touched,
            values,
          }) => (
            <form onSubmit={handleSubmit} className={styles.form}>
              <TextInput
                className={styles.textInput}
                wrapperClassName={styles.inputWrapper}
                id="userName"
                type="text"
                label="Имя пользователя"
                value={values.userName}
                onBlur={handleBlur}
                onChange={handleChange}
                error={touched.userName && errors.userName}
              />
              <TextInput
                className={styles.textInput}
                wrapperClassName={styles.inputWrapper}
                id="password"
                type="password"
                label="Пароль"
                value={values.password}
                onBlur={handleBlur}
                onChange={handleChange}
                error={touched.password && errors.password}
              />
              <Button
                type="submit"
                buttonStyle={BUTTON.BIG_BLUE}
                className={styles.btn}
                disabled={isSubmitting}
              >
                Войти в систему
              </Button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginPage;
