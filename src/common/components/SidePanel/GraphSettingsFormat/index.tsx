/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';

import { setTableStyle } from '../../../../data/reducers/new_reportDesigner';
import { NAV_MENU_GRAPH } from '../../../constants/reportDesigner/reportDesignerMenu';
import NavigationMenu from '../NavigationMenu';
import Facade from './Facade';
import Format from './Format';
import Styles from './Styles';
import View from './View';

interface IGraphSettingsFormatProps {
  formattingElement: any;
}

const GraphSettingsFormat: FC<IGraphSettingsFormatProps> = ({
  formattingElement,
}) => {
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
          onChange={(params: any) =>
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
