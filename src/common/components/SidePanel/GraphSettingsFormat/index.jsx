/* eslint-disable react/prop-types */
/* eslint-disable import/prefer-default-export */
import React, { useState } from 'react';
import { NAV_MENU_GRAPH } from '../../../constants/reportDesigner/reportDesignerMenu';
import NavigationMenu from '../NavigationMenu';
import { View } from './View';
import { Facade } from './Facade';
import { Styles } from './Styles';
import { Format } from './Format';

export const GraphSettingsFormat = () => {
  const [activeSubMenu, setActiveSubMenu] = useState(1);

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
        <Facade />
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