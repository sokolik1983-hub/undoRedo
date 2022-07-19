import React from 'react';
import { Navigate } from 'react-router-dom';

import Layout from './layout';
import AdminMain from './modules/Admin/Main';
import Audit from './modules/Audit';
import Connectors from './modules/Connectors';
import Explorer from './modules/Explorer';
import RecycleBin from './modules/RecycleBin';
import ReportDesigner from './modules/ReportDesigner';
import Reports from './modules/Reports';
import Symlayers from './modules/Symlayers';
import SymlayersDesigner from './modules/SymlayersDesigner';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';

const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: 'dashboard', element: <HomePage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'audit', element: <Audit /> },
      { path: 'explorer', element: <Explorer /> },
      { path: 'connectors', element: <Connectors /> },
      { path: 'symlayers', element: <Symlayers /> },
      { path: 'symlayers/create', element: <SymlayersDesigner /> },
      { path: 'trash', element: <RecycleBin /> },
      { path: 'report/:report_id', element: <ReportDesigner /> },
      { path: 'report', element: <ReportDesigner /> },
      { path: 'reports', element: <Reports /> },
      { path: 'administrator', element: <AdminMain /> },
    ],
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: 'login', element: <LoginPage /> },
      { path: '/', element: <Navigate to="/login" /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
];

export default routes;
