import { ReactComponent as GaugeIcon } from '../../layout/assets/queryPanel/gaugeIcon.svg';
import { ReactComponent as MeasurementIcon } from '../../layout/assets/queryPanel/measurementIcon.svg';
import { ReactComponent as AttributeIcon } from '../../layout/assets/queryPanel/attributeIcon.svg';

export const flat = arr => {
  let result = [];

  if (!arr.length) return result;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].isFolder) {
      result = [...result, ...flat(arr[i].children)];
    } else result = [...result, arr[i]];
  }

  return result;
};

export const getIconByItemType = objectTypeId => {
  switch (objectTypeId) {
    case 1:
      return <GaugeIcon />;
    case 2:
      return <MeasurementIcon />;
    case 3:
      return <AttributeIcon />;
    default:
      return null;
  }
};
