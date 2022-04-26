import styles from './DescriptionBlock.module.scss';

const DescriptionBlock = () => {

  return (
    <div className={styles.objectDescriptionBlock}>
      <p className={styles.title}>Описание</p>
      <textarea
        className={styles.descriptionInput}
        type="text"
      />
    </div>
  );
};

export default DescriptionBlock;
