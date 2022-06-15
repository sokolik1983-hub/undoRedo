/* eslint-disable no-cond-assign */
import PropTypes from 'prop-types';
import React from 'react';
import { ReactComponent as Magnifier } from '../../../../layout/assets/reportObjectsPanelIcons/magnifier.svg';
import styles from './ReportObjectsPanel.module.scss';
import TextInput from '../../../../common/components/TextInput';
 
const ReportObjectsPanel = ({
  searchValue,
  setSearchValue,
  actions,
  showInput,
  setInput,
  array
}) => {

  return (
    <div className={styles.root}>
      {!showInput && (
      <>
          {array.map(item => {
            return (
              <div
                key={item.title}
                className={styles.actionWrapper}
                title={item.title || ''}
                onClick={() => actions[item.action] ? actions[item.action](item) : null}
              >
                {item.enable ? item.icon : item.disIcon}
              </div>
            );
          })}
      </>
      )}
      {showInput && (
        <>
          <TextInput
            className={styles.filterNameInput}
            value={searchValue}
            onChange={event => {
              setSearchValue(event.target.value);
            }}
          />
          <Magnifier className={styles.magnifier} onClick={setInput} />
        </>
      )}
    </div>
  );
};

export default ReportObjectsPanel;

ReportObjectsPanel.propTypes = {
  array: PropTypes.array,
  actions: PropTypes.object,
  searchValue: PropTypes.string,
  showInput: PropTypes.bool,
  setInput:PropTypes.func,
  setSearchValue: PropTypes.func
};
