import './App.css';

import React, { FC, ReactNode, useEffect } from 'react';
import { useNavigate, useRoutes } from 'react-router-dom';

import { REDIRECT_LINKS } from './common/constants/common';
import { logout } from './data/auth/authReducers';
import { useAppDispatch, useAppSelector } from './data/hooks/redux';
import routes from './routes';

interface IAuthProviderProps {
  children: ReactNode;
}

const AuthProvider: FC<IAuthProviderProps> = ({ children }) => {
  return <>{children}</>;
};

const App: FC = () => {
  const routing = useRoutes(routes);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.app.auth);

  useEffect(() => {
    if (auth && !auth.isAuth) {
      dispatch(logout());
      navigate(REDIRECT_LINKS.LOGIN_PAGE, { replace: false });
    }
  }, []);

  return (
    <AuthProvider>
      <div>{routing}</div>
    </AuthProvider>
  );
};

export default App;
