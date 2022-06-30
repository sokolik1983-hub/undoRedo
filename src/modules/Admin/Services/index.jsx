import TextInput from '../../../common/components/TextInput';
import Select from '../../../common/components/Select';
import Button from '../../../common/components/Button';
import { JSON_EXAMPLE, EDIT_TYPE } from '../Main/constants';
import { BUTTON } from '../../../common/constants/common';
import styles from './Services.module.scss';

const Services = () => {
  const { settings } = JSON_EXAMPLE;

  const getOptions = list => {
    return list.map(item => {
      return {
        value: item,
        text: item
      };
    });
  };

  const getInputByType = item => {
    const { editType, value, min, max, name, key } = item;

    if (editType === EDIT_TYPE.string) {
      return (
        <TextInput id={key} label={name} type="text" value={value} required />
      );
    }
    if (editType === EDIT_TYPE.range) {
      return (
        <TextInput
          id={key}
          label={name}
          type="number"
          min={min}
          max={max}
          value={value}
          required
        />
      );
    }
    if (editType === EDIT_TYPE.list) {
      return (
        <Select
          value={value}
          options={getOptions(item.list)}
          className={styles.listInput}
        />
      );
    }
    return null;
  };

  const getSettingsGroupElements = group => {
    return (
      <div>
        {group.map(item => {
          return (
            <div className={styles.groupItem}>
              {item.isEditable ? (
                getInputByType(item)
              ) : (
                <span>{item.value}</span>
              )}
              <span className={styles.itemDescription}>{item.description}</span>
            </div>
          );
        })}
      </div>
    );
  };

  const getSettingsGroups = () => {
    return (
      <div className={styles.groupsContainer}>
        {settings.map(item => {
          return (
            <div>
              <span className={styles.groupName}>{item.groupName}</span>
              {getSettingsGroupElements(item.groupElements)}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div>
      {getSettingsGroups()}
      <Button buttonStyle={BUTTON.BIG_BLUE} type="submit">
        Сохранить
      </Button>
    </div>
  );
};

export default Services;
