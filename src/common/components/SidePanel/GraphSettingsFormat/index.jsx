import { PropTypes } from 'prop-types';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NAV_MENU_GRAPH } from '../../../constants/reportDesigner/reportDesignerMenu';
import { setTableStyle } from '../../../../data/reducers/new_reportDesigner';
import NavigationMenu from '../NavigationMenu';
import View from './View';
import Facade from './Facade';
import Styles from './Styles';
import Format from './Format';

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
      {activeSubMenu === 1 && (
        <View />
        )}
      {activeSubMenu === 2 && (
        <Facade
          onChange={params =>
          dispatch(setTableStyle({ ...params, formattingElement }))}
        />
        )}
      {activeSubMenu === 3 && (
        <Styles />
        )}
      {activeSubMenu === 4 && (
        <Format />
        )}
    </div>
  )
}

export default GraphSettingsFormat;

GraphSettingsFormat.propTypes = {
  formattingElement: PropTypes.object
};