/* eslint-disable import/prefer-default-export */
import { ReactComponent as Objects } from '../../../layout/assets/reportObjectsPanelIcons/objects.svg';
import { ReactComponent as Structure } from '../../../layout/assets/reportObjectsPanelIcons/structure.svg';
import { ReactComponent as Map } from '../../../layout/assets/reportObjectsPanelIcons/map.svg';
import { ReactComponent as Comments } from '../../../layout/assets/reportObjectsPanelIcons/comments.svg';
import { ReactComponent as Properties } from '../../../layout/assets/reportObjectsPanelIcons/properties.svg';
import { ReactComponent as DisableObjects } from '../../../layout/assets/reportObjectsPanelIcons/disObjects.svg';
import { ReactComponent as DisableStructure } from '../../../layout/assets/reportObjectsPanelIcons/disStructure.svg';
import { ReactComponent as DisableMap } from '../../../layout/assets/reportObjectsPanelIcons/disMap.svg';
import { ReactComponent as DisableComments } from '../../../layout/assets/reportObjectsPanelIcons/disComments.svg';
import { ReactComponent as DisableProperties } from '../../../layout/assets/reportObjectsPanelIcons/disProperties.svg';
import { ReactComponent as DisableMagnifier } from '../../../layout/assets/reportObjectsPanelIcons/disMagnifier.svg';

export const REPORT_OBJECTS_PANEL_ICONS = [
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


