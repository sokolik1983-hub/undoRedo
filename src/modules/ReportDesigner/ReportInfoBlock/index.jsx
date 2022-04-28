import React from 'react';
import { Formik } from 'formik';
// import styles from './ReportInfoBlock.module.scss';
import Navigation from './ReportInfoItem/Navigation';
import Properties from './ReportInfoItem/Properties';
import Comments from './ReportInfoItem/Comments';

const semLayerValues = {
  name: '',
  description: '',
  SQLRequest: [],
  SQLMultipleRoads: [],
  CartesianWork: '',
  control: []
};

const ReportInfoBlock = () => {

  return (
    <Formik
      initialValues={semLayerValues}
      onSubmit={data => {
        window.location.pathname = '/Universe/symlayers/create';
        console.log(data);
      }}
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Navigation title="Навигация" />
          {/* <Control title="Управление" onChange={handleChange} /> */}
          <Properties title="Свойства" />
          <Comments title="Комментарии" />
        </form>
      )}
    </Formik>
  );
};

export default ReportInfoBlock;
