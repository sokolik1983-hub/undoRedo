/* eslint-disable import/extensions */
import React from 'react';
import { Navigate } from 'react-router-dom';
import Layout from './layout';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import Connectors from './modules/Connectors';
import Audit from './modules/Audit';
import AdminMain from './modules/Admin/Main';
import RecycleBin from './modules/RecycleBin';
import ReportDesigner from './modules/ReportDesigner';
import SymlayersDesigner from './modules/SymlayersDesigner';
import Symlayers from './modules/Symlayers';
import Explorer from './modules/Explorer';
import Reports from './modules/Reports';
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
      { path: 'report/show/:report_id', element: <ReportDesigner /> },
      { path: 'report/create', element: <ReportDesigner /> },
      { path: 'reports', element: <Reports /> },
      { path: 'administrator', element: <AdminMain /> }
    ]
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: 'login', element: <LoginPage /> },
      { path: '/', element: <Navigate to="/login" /> },
      { path: '*', element: <NotFoundPage /> }
    ]
  }
];

export default routes;
