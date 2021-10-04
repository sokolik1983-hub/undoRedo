import { Button } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PopupContainer from '../../../common/components/PopupContainer';
import { QUERY_PANEL_POPUP } from '../../../common/constants/popups';

import { hidePopup } from '../../../data/reducers/ui';

function PopupDispatcher() {
  // const popupData = useSelector(state => state.ui.popupData);
  const popupVisible = useSelector(state => state.ui.popupVisible);
  const dispatch = useDispatch();

  function renderContent() {
    switch (popupVisible) {
      case QUERY_PANEL_POPUP:
        return <h1>QueryPanel</h1>;
      default:
        return null;
    }
  }

  function renderActions() {
    switch (popupVisible) {
      case QUERY_PANEL_POPUP:
        return <Button>Сохранить</Button>;
      default:
        return null;
    }
  }

  function renderTitle() {
    switch (popupVisible) {
      case QUERY_PANEL_POPUP:
        return <div>Query panel</div>;
      default:
        return null;
    }
  }

  function handleClosePopup() {
    dispatch(hidePopup());
  }

  return (
    <div>
      <PopupContainer
        open={popupVisible}
        actions={renderActions()}
        onClose={handleClosePopup}
        title={renderTitle()}
      >
        {renderContent()}
      </PopupContainer>
    </div>
  );
}

export default PopupDispatcher;
