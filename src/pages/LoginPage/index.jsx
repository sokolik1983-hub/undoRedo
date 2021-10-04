import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  TextField,
  makeStyles
} from '@material-ui/core';
import { SERVER_API_URL } from '../../common/constants/config';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: 82
  }
}));

const LoginPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <div className={classes.root} title="Login">
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
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
            onSubmit={values => {
              return fetch(
                `${SERVER_API_URL}authUser?login=${values.login}&password=${values.password}`,
                {
                  credentials: 'include',
                  mode: 'cors'
                }
              )
                .then(response => response.json())
                .then(json => {
                  localStorage.setItem('isAuthReporting', 'true');
                  localStorage.setItem(
                    'userInfoReporting',
                    JSON.stringify(json.userInfo)
                  );
                  navigate('/Reporting/dashboard', { replace: false });
                })
                .catch(err => {
                  localStorage.removeItem('isAuthReporting');
                  localStorage.removeItem('userInfoReporting');
                  // eslint-disable-next-line no-alert
                  alert(JSON.stringify(err.message));
                });
            }}
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
              <form onSubmit={handleSubmit}>
                <TextField
                  error={Boolean(touched.login && errors.login)}
                  fullWidth
                  helperText={touched.login && errors.login}
                  label="Логин"
                  margin="normal"
                  name="login"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.login}
                  variant="outlined"
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
                />
                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
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
