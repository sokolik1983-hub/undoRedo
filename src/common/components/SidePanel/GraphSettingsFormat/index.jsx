import { PropTypes } from 'prop-types';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { setTableStyle } from '../../../../data/reducers/new_reportDesigner';
import { NAV_MENU_GRAPH } from '../../../constants/reportDesigner/reportDesignerMenu';
import NavigationMenu from '../NavigationMenu';
import Facade from './Facade';
import Format from './Format';
import Styles from './Styles';
import View from './View';

const GraphSettingsFormat = ({ formattingElement }) => {
  const [activeSubMenu, setActiveSubMenu] = useState(1);
  const dispatch = useDispatch();

  return (
    <div>
      <NavigationMenu
        menu={NAV_MENU_GRAPH}
        onClick={setActiveSubMenu}
        activePage={activeSubMenu}
      />
      {activeSubMenu === 1 && <View />}
      {activeSubMenu === 2 && (
        <Facade
          onChange={(params) =>
            dispatch(setTableStyle({ ...params, formattingElement }))
          }
        />
      )}
      {activeSubMenu === 3 && <Styles />}
      {activeSubMenu === 4 && <Format />}
    </div>
  );
};

export default GraphSettingsFormat;

GraphSettingsFormat.propTypes = {
  formattingElement: PropTypes.object,
};
