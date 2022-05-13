import PropTypes from 'prop-types';

import styles from './DescriptionBlock.module.scss';

const DescriptionBlock = ({ name, onChange, value }) => {
  const inputProps = {
    name,
    onChange,
    value
  };

  return (
    <div className={styles.objectDescriptionBlock}>
      <p className={styles.title}>Описание</p>
      <textarea
        {...inputProps}
        className={styles.descriptionInput}
        type="text"
      />
    </div>
  );
};

export default DescriptionBlock;

DescriptionBlock.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  name: PropTypes.string
};

DescriptionBlock.defaultProps = {
  onChange: Function.prototype,
  value: '',
  name: ''
};
