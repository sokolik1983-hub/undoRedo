import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Select from '../../../../common/components/Select/index';
import Modal from '../../../../common/components/Modal/index';
import DatePicker from '../../../../common/components/DatePicker/index'
import Button from '../../../../common/components/Button/index';
import styles from './AuditFilters.module.scss'

const AuditFilters = ({ audit, actions, handleSetFilters }) => {
  const [isModal, setIsModal] = useState(false);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleChangeFilters = name => value => {
    if (value === 'selectDate') {
      setIsModal(true);
    } else handleSetFilters({ ...audit.filters, [name]: value });
  };

  const handleCloseModal = () => {
    setIsModal(false);
    handleSetFilters({
      ...audit.filters,
      'time_start': startDate?.split("-").reverse().join("."),
      'time_finish': endDate?.split("-").reverse().join(".")
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
    value: null
  });

  const content = (
    <div>
      <DatePicker onDateSelect={setStartDate} name="startDate" />
      <DatePicker onDateSelect={setEndDate} name="endDate" />
    </div>
  );

  const footer = (
    <Button onClick={handleCloseModal} type="button">
      Показать даты
    </Button>
  );

  return (
    <>
      <Modal
        visible={isModal}
        onClose={() => setIsModal(false)}
        title="Выберите дату"
        content={content}
        footer={footer}
      />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span className={styles.title}>Событие</span>
        <Select
          name="action_name"
          options={actionOptions}
          onSelectItem={handleChangeFilters('action_name')}
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span className={styles.title}>Дата</span>
        <Select
          name="time_start"
          options={timeOptions}
          onSelectItem={handleChangeFilters('time_start')}
        />
      </div>
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
