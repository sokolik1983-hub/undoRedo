import React from 'react';
import { Navigate } from 'react-router-dom';
import Layout from './layout';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import Audit from './modules/Audit';
import Users from './modules/Users';
import Roles from './modules/Roles';
import RecycleBin from './modules/RecycleBin';
import ReportDesigner from './modules/ReportDesigner';

const routes = [
  {
    path: '/Reporting/',
    element: <Layout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: 'dashboard', element: <HomePage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'audit', element: <Audit /> },
      { path: 'users', element: <Users /> },
      { path: 'roles', element: <Roles /> },
      { path: 'trash', element: <RecycleBin /> },
      { path: 'report/create/:folder_id', element: <ReportDesigner /> },
      { path: 'report/:report_id/show', element: <ReportDesigner /> },
      { path: 'report/:report_id', element: <ReportDesigner /> }
    ]
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: 'login', element: <LoginPage /> },
      { path: '/', element: <Navigate to="/Reporting/login" /> },
      { path: '*', element: <Navigate to="/Reporting/404" /> }
    ]
  }
];

export default routes;
