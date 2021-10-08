import React, { useEffect} from 'react';
import { useRoutes, useNavigate } from 'react-router-dom';
import './App.css';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import routes from './routes';
import { REDIRECT_LINKS } from './common/constants/common';
import { logout } from './data/reducers/auth';

function AuthProvider({ children }) {
  return <>{children}</>;
}

AuthProvider.propTypes = {
  children: PropTypes.any
};

function App() {
  const routing = useRoutes(routes);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector(state => state.app.auth);

  useEffect(() => {
    if (auth && !auth.isAuth) {
      dispatch(logout());
      navigate(REDIRECT_LINKS.LOGIN_PAGE, { replace: false });
    }
  }, []);

  return <AuthProvider>{routing}</AuthProvider>;
}

export default App;
