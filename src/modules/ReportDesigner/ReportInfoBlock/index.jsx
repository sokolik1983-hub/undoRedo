import React from 'react';
import { Formik } from 'formik';
import styles from './ReportInfoBlock.module.scss';
import Navigation from './ReportInfoItem/Navigation';
import Properties from './ReportInfoItem/Properties';
import Comments from './ReportInfoItem/Comments';

const values = {
  properties: ''
};

const ReportInfoBlock = () => {

  return (
    <div className={styles.block}>
      <Navigation />
      <Formik
        initialValues={values}
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
      <div className={styles.comments}>
        <Comments title="Комментарии" />
      </div>
    </div>
  );
};

export default ReportInfoBlock;
