/* eslint-disable import/prefer-default-export */
import { ReactComponent as Objects } from '../../../layout/assets/reportObjectsPanelFiltersIcons/objects.svg';
import { ReactComponent as Structure } from '../../../layout/assets/reportObjectsPanelFiltersIcons/structure.svg';
import { ReactComponent as Map } from '../../../layout/assets/reportObjectsPanelFiltersIcons/map.svg';
import { ReactComponent as Comments } from '../../../layout/assets/reportObjectsPanelFiltersIcons/comments.svg';
import { ReactComponent as Properties } from '../../../layout/assets/reportObjectsPanelFiltersIcons/properties.svg';

import { ReactComponent as DisableObjects } from '../../../layout/assets/reportObjectsPanelFiltersIcons/disObjects.svg';
import { ReactComponent as DisableStructure } from '../../../layout/assets/reportObjectsPanelFiltersIcons/disStructure.svg';
import { ReactComponent as DisableMap } from '../../../layout/assets/reportObjectsPanelFiltersIcons/disMap.svg';
import { ReactComponent as DisableComments } from '../../../layout/assets/reportObjectsPanelFiltersIcons/disComments.svg';
import { ReactComponent as DisableProperties } from '../../../layout/assets/reportObjectsPanelFiltersIcons/disProperties.svg';
import { ReactComponent as DisableMagnifier } from '../../../layout/assets/reportObjectsPanelFiltersIcons/disMagnifier.svg';

export const REPORT_OBJECTS_PANEL_FILTERS_ICONS = [
  {
    action: 'objects',
    title: 'Объекты',
    icon: <Objects />,
    enable: false,
    disIcon: <DisableObjects />
  },
  {
    action: 'structure',
    title: 'Структура',
    icon: <Structure />,
    enable: false,
    disIcon: <DisableStructure />
  },
  {
    action: 'map',
    title: 'Карта',
    icon: <Map />,
    enable: false,
    disIcon: <DisableMap />
  },
  {
    action: 'comments',
    title: 'Комментарии',
    icon: <Comments />,
    enable: false,
    disIcon: <DisableComments />
  },
  {
    action: 'properties',
    title: 'Свойства',
    icon: <Properties />,
    enable: false,
    disIcon: <DisableProperties />
  },
  {
    action: 'magnifier',
    title: 'Поиск',
    icon: '',
    enable: false,
    disIcon: <DisableMagnifier />
  }
];