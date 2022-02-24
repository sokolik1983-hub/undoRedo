import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  TextField,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../data/actions/auth';
import { REDIRECT_LINKS } from '../../common/constants/common';
import styles from './LoginPage.module.scss';
import logo from './logo.svg';
import avatar from './avatar.svg';

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
      <Box
        className={styles.box}
      >
        <img className={styles.logo} src={logo} alt="logo" />
        <img className={styles.avatar} src={avatar} alt="avatar" />
        <Container maxWidth="sm" className={styles.formContainer}>
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
                <TextField
                  error={Boolean(touched.login && errors.login)}
                  fullWidth
                  helperText={touched.login && errors.login}
                  label="Имя пользователя"
                  margin="normal"
                  name="login"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.login}
                  variant="outlined"
                  InputLabelProps={{ shrink: false }}
                  className={styles.textField}
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Пароль"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                  InputLabelProps={{ shrink: false }}
                  className={styles.textField}
                />
                <Box m={0}>
                  <Button
                    className={styles.btn}
                    disabled={isSubmitting}
                    type="submit"
                    variant="contained"
                  >
                    Войти в систему
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </div>
  );
};

export default LoginPage;
