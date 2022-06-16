import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../data/actions/auth';
import { REDIRECT_LINKS, BUTTON } from '../../common/constants/common';
import TextInput from '../../common/components/TextInput';
import Button from '../../common/components/Button';
import { ReactComponent as LogoIcon } from '../../layout/assets/loginPageLogo.svg';
import { ReactComponent as AvatarIcon } from '../../layout/assets/loginPageAvatar.svg';
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
            password: 'test'
          }}
          validationSchema={Yup.object().shape({
            userName: Yup.string().max(255).required('Login is required'),
            password: Yup.string().max(255).required('Password is required')
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
            values
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
