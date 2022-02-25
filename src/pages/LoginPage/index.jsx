import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../data/actions/auth';
import { REDIRECT_LINKS } from '../../common/constants/common';
import TextInput from '../../common/components/TextInput';
import Button from '../../common/components/Button';
import logo from '../../layout/assets/login-page-logo.svg';
import avatar from '../../layout/assets/login-page-avatar.svg';
import styles from './LoginPage.module.scss';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector(state => state.app.auth);

  useEffect(() => {
    if (auth) {
      if (auth.isAuth) {
        navigate(REDIRECT_LINKS.HOME_PAGE, { replace: false });
      }
    }
  }, [auth]);

  return (
    <div title="Login">
      <div className={styles.box}>
        <img className={styles.logo} src={logo} alt="logo" />
        <img className={styles.avatar} src={avatar} alt="avatar" />
        <Formik
          initialValues={{
            login: 'test1',
            password: 'test1'
          }}
          validationSchema={Yup.object().shape({
            login: Yup.string()
              .max(255)
              .required('Login is required'),
            password: Yup.string()
              .max(255)
              .required('Password is required')
          })}
          onSubmit={values => dispatch(loginUser(values))}
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
                id="login"
                type="text"
                label="Имя пользователя" 
                value={values.login}
                onBlur={handleBlur}
                onChange={handleChange}
                error={touched.login && errors.login}
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
