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
    <>
      <Navigation />
      <Formik
        initialValues={semLayerValues}
        onSubmit={data => {
        console.log(data);
      }}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Properties title="Свойства" />
            
          </form>
      )}
      </Formik>
      <Comments title="Комментарии" />
    </>
  );
};

export default ReportInfoBlock;
