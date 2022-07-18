import Comments from '../../../layout/assets/reportObjectsPanelIcons/comments.svg';
import DisableComments from '../../../layout/assets/reportObjectsPanelIcons/disComments.svg';
import DisableMagnifier from '../../../layout/assets/reportObjectsPanelIcons/disMagnifier.svg';
import DisableMap from '../../../layout/assets/reportObjectsPanelIcons/disMap.svg';
import DisableObjects from '../../../layout/assets/reportObjectsPanelIcons/disObjects.svg';
import DisableProperties from '../../../layout/assets/reportObjectsPanelIcons/disProperties.svg';
import DisableStructure from '../../../layout/assets/reportObjectsPanelIcons/disStructure.svg';
import Map from '../../../layout/assets/reportObjectsPanelIcons/map.svg';
import Objects from '../../../layout/assets/reportObjectsPanelIcons/objects.svg';
import Properties from '../../../layout/assets/reportObjectsPanelIcons/properties.svg';
import Structure from '../../../layout/assets/reportObjectsPanelIcons/structure.svg';

export const REPORT_OBJECTS_PANEL_ICONS = [
  {
    action: 'objects',
    title: 'Объекты',
    icon: <Objects />,
    enable: false,
    disIcon: <DisableObjects />,
  },
  {
    action: 'structure',
    title: 'Структура',
    icon: <Structure />,
    enable: false,
    disIcon: <DisableStructure />,
  },
  {
    action: 'map',
    title: 'Карта',
    icon: <Map />,
    enable: false,
    disIcon: <DisableMap />,
  },
  {
    action: 'comments',
    title: 'Комментарии',
    icon: <Comments />,
    enable: false,
    disIcon: <DisableComments />,
  },
  {
    action: 'properties',
    title: 'Свойства',
    icon: <Properties />,
    enable: false,
    disIcon: <DisableProperties />,
  },
  {
    action: 'magnifier',
    title: 'Поиск',
    icon: '',
    enable: false,
    disIcon: <DisableMagnifier />,
  },
];
