/* eslint-disable react/prop-types */
import ReportBody from './ReportBody';
import styles from './ReportContent.module.scss';
import ReportFooter from './ReportFooter';
import ReportHeader from './ReportHeader';

const ReportContent = ({ structure, ...props }) => {
  const { pgHeader, pgBody, pgFooter } = structure;
  console.log(props);
  return (
    <div className={styles.root}>
      <ReportHeader data={pgHeader} />
      <ReportBody data={pgBody} />
      <ReportFooter data={pgFooter} />
    </div>
  );
};

export default ReportContent;
