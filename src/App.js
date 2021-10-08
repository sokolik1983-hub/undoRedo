import React, { useEffect } from 'react';
import { useRoutes, useNavigate } from 'react-router-dom';
import './App.css';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import routes from './routes';
import { REDIRECT_LINKS } from './common/constants/common';

function AuthProvider({ children }) {
  return <>{children}</>;
}

AuthProvider.propTypes = {
  children: PropTypes.any
};

function App() {
  const routing = useRoutes(routes);
  const navigate = useNavigate();
  const auth = useSelector(state => state.app.auth);

  useEffect(() => {
    if (auth) {
      if (!auth.isAuth) {
        navigate(REDIRECT_LINKS.LOGIN_PAGE, { replace: false });
      }
    }
  }, [auth]);

  return <AuthProvider>{routing}</AuthProvider>;
}

export default App;
