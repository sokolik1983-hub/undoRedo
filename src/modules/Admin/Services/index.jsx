import { Field, Formik } from 'formik';
import TextInput from '../../../common/components/TextInput';
import Button from '../../../common/components/Button';
import { JSON_EXAMPLE, EDIT_TYPE } from '../Main/constants';
import { BUTTON } from '../../../common/constants/common';
import styles from './Services.module.scss';

const Services = () => {
  const { settings } = JSON_EXAMPLE;

  const getInputByType = (
    groupElement,
    idx,
    groupKey,
    handleChange,
    groupElements,
    groupNumber
  ) => {
    const { editType, value, min, max, name, key } = groupElement;
    const path = `[${groupNumber}].groupElements[${idx}].value`;
    if (editType === EDIT_TYPE.string) {
      return (
        <TextInput
          id={key}
          label={name}
          type="text"
          defaultValue={value}
          value={null}
          required
          name={path}
          onChange={handleChange}
        />
      );
    }
    if (editType === EDIT_TYPE.range) {
      return (
        <TextInput
          id={key}
          label={name}
          type="number"
          defaultValue={value}
          min={min}
          max={max}
          value={null}
          required
          name={path}
          onChange={handleChange}
        />
      );
    }
    if (editType === EDIT_TYPE.list) {
      return (
        <>
          <span>{name}</span>
          <Field component="select" id={key} name={path}>
            {groupElement.list.map(item => {
              return <option value={item}>{item}</option>;
            })}
          </Field>
        </>
      );
    }
    return null;
  };

  const getSettingsGroupElements = (
    groupElements,
    groupKey,
    handleChange,
    groupNumber,
    handleBlur
  ) => {
    return (
      <>
        {groupElements.map((groupElement, idx) => {
          return (
            <div className={styles.groupItem} key={groupElements.key}>
              {groupElement.isEditable ? (
                getInputByType(
                  groupElement,
                  idx,
                  groupKey,
                  handleChange,
                  groupElements,
                  groupNumber,
                  handleBlur
                )
              ) : (
                <>
                  <span>{groupElement.name}</span>
                  <span>{groupElement.value}</span>
                </>
              )}
              <span className={styles.itemDescription}>
                {groupElement.description}
              </span>
            </div>
          );
        })}
      </>
    );
  };

  const getSettingsGroups = (values, handleChange, handleBlur) => {
    return (
      <div className={styles.groupsContainer}>
        {settings.map((value, groupNumber) => {
          return (
            <div key={value.key}>
              <span className={styles.groupName}>{value.groupName}</span>
              {getSettingsGroupElements(
                value.groupElements,
                value.groupKey,
                handleChange,
                groupNumber,
                handleBlur
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <Formik
      initialValues={settings}
      onSubmit={values => {
        console.log(values);
      }}
    >
      {({ values, handleChange, handleSubmit, handleBlur }) => (
        <form onSubmit={handleSubmit} className={styles.form}>
          {getSettingsGroups(values, handleChange, handleBlur)}
          <Button
            buttonStyle={BUTTON.BIG_BLUE}
            type="submit"
            disabled={JSON.stringify(settings) === JSON.stringify(values)}
          >
            Сохранить
          </Button>
        </form>
      )}
    </Formik>
  );
};

export default Services;
