import PropTypes from 'prop-types';
import styles from './DescriptionBlock.module.scss';

const DescriptionBlock = ({ id, onChange, name, value }) => {
  const inputProps = {
    id,
    onChange,
    value,
    name
  };

  return (
    <div className={styles.objectDescriptionBlock}>
      <p className={styles.title}>Описание</p>
      <textarea
        className={styles.descriptionInput}
        {...inputProps}
        type="text"
      />
    </div>
  );
};

export default DescriptionBlock;

DescriptionBlock.propTypes = {
  objectDescription: PropTypes.string,
  onChange: PropTypes.func,
  id: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string
};
