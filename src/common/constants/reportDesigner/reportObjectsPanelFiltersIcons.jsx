import Comments from '../../../layout/assets/reportObjectsPanelFiltersIcons/comments.svg';
import DisableComments from '../../../layout/assets/reportObjectsPanelFiltersIcons/disComments.svg';
import DisableMagnifier from '../../../layout/assets/reportObjectsPanelFiltersIcons/disMagnifier.svg';
import DisableMap from '../../../layout/assets/reportObjectsPanelFiltersIcons/disMap.svg';
import DisableObjects from '../../../layout/assets/reportObjectsPanelFiltersIcons/disObjects.svg';
import DisableProperties from '../../../layout/assets/reportObjectsPanelFiltersIcons/disProperties.svg';
import DisableStructure from '../../../layout/assets/reportObjectsPanelFiltersIcons/disStructure.svg';
import Map from '../../../layout/assets/reportObjectsPanelFiltersIcons/map.svg';
import Objects from '../../../layout/assets/reportObjectsPanelFiltersIcons/objects.svg';
import Properties from '../../../layout/assets/reportObjectsPanelFiltersIcons/properties.svg';
import Structure from '../../../layout/assets/reportObjectsPanelFiltersIcons/structure.svg';

export const REPORT_OBJECTS_PANEL_FILTERS_ICONS = [
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
