import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Select from '../../../common/components/Select/index';

const AuditFilters = ({ audit, dispatch, setFilters, actions }) => {

  const handleChangeFilters = (name) => (value) => {
    dispatch(setFilters({ ...audit.filters, [name]: value }));
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
    { value: 'all', text: 'Все' }
  ];

  const actionNames = actions?.map(action => {
    return {
      text: action.name,
      value: action.name
    };
  });

  return (
    <>
      <Select
        name="action_name"
        options={actionNames}
        onSelectItem={handleChangeFilters('action_name')}
      />
      <Select
        name="time_start"
        options={timeOptions}
        onSelectItem={handleChangeFilters('time_start')}
      />
    </>
  );
};

export default AuditFilters;

AuditFilters.propTypes = {
  audit: PropTypes.object.isRequired,
  dispatch: PropTypes.func,
  setFilters: PropTypes.func,
  actions: PropTypes.array
};

AuditFilters.defaultProps = {};