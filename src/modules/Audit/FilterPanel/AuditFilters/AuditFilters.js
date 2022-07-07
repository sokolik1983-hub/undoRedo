import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Select from '../../../../common/components/Select/index';
import Modal from '../../../../common/components/Modal/index';
import DatePicker from '../../../../common/components/DatePicker/index';
import Button from '../../../../common/components/Button/index';
import styles from './AuditFilters.module.scss';
import CheckBox from '../../../../common/components/CheckBox';

const AuditFilters = ({ audit, actions, handleSetFilters }) => {
  const [isModal, setIsModal] = useState(false);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [actionFilter, setActionFilter] = useState([]);

  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    const a = actionFilter.map(action => {
      return { action_name: action };
    });
  }, [actionFilter]);

  const handleChangeFilters = name => value => {
    if (value === 'selectDate') {
      setIsModal(true);
    } else handleSetFilters({ ...audit.filters, [name]: value });
  };

  const handleCloseModal = () => {
    setIsModal(false);
    handleSetFilters({
      ...audit.filters,
      time_start: startDate
        ?.split('-')
        .reverse()
        .join('.'),
      time_finish: endDate
        ?.split('-')
        .reverse()
        .join('.')
    });
  };

  const today = new Date().toLocaleDateString();
  const week = moment(Date.now() - 7 * 24 * 3600 * 1000).format('DD.MM.YYYY');
  const month = moment(Date.now() - 30 * 24 * 3600 * 1000).format('DD.MM.YYYY');

  const timeOptions = [
    {
      value: today,
      text: 'Сегодня'
    },
    { value: week, text: 'Последние 7 дней' },
    {
      value: month,
      text: 'Последние 30 дней'
    },
    {
      value: 'selectDate',
      text: 'Выбрать дату'
    }
  ];

  const actionOptions = actions?.map(action => {
    return {
      text: action.name,
      value: action.name
    };
  });

  actionOptions.unshift({
    text: 'Все',
    value: 'all'
  });

  const content = (
    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
      <DatePicker onDateSelect={setStartDate} name="startDate" />
      <DatePicker onDateSelect={setEndDate} name="endDate" />
    </div>
  );

  const footer = (
    <Button onClick={handleCloseModal} type="button">
      Показать даты
    </Button>
  );

  const onChangeHandler = (name, value) => {
    if (audit.filters) {
      handleSetFilters({ ...audit.filters, [name]: value });
    }

    if (!actionFilter.includes(value)) {
      setActionFilter([...actionFilter, value]);
    } else {
      setActionFilter(prevState =>
        prevState.filter(action => action !== value)
      );
    }
  };

  return (
    <>
      <div
        style={{ display: 'flex', flexDirection: 'column', marginTop: '10px' }}
      >
        <span className={styles.title}>Дата</span>
        <Select
          className={styles.dateSelect}
          name="time_start"
          options={timeOptions}
          onSelectItem={handleChangeFilters('time_start')}
        />
      </div>
      <Modal
        visible={isModal}
        onClose={() => setIsModal(false)}
        title="Выберите дату"
        content={content}
        footer={footer}
      />
      {/*     <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span className={styles.title}>Событие</span>
        <Select
          name="action_name"
          options={actionOptions}
          onSelectItem={handleChangeFilters('action_name')}
        />
      </div> */}
      <div className={styles.actionTitle}>Событие</div>
      {actionOptions &&
        actionOptions.map(item => {
          return (
            <CheckBox
              labelClass={styles.checkBoxTitle}
              label={item.text}
              onChange={() => onChangeHandler('action_name', item.value)}
              fakeChecked
            />
          );
        })}
    </>
  );
};

export default AuditFilters;

AuditFilters.propTypes = {
  audit: PropTypes.object.isRequired,
  actions: PropTypes.array,
  handleSetFilters: PropTypes.func
};

AuditFilters.defaultProps = {
  actions: [],
  handleSetFilters: () => {}
};
