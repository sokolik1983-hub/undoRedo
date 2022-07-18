// import Preloader from '../../../../common/components/Preloader/Preloader';
import styles from './DataTable.module.scss';

export const LoadingRow = (
  <tr>
    <td className={styles['loading-row']}>
      <span />
    </td>
  </tr>
);

export const renderRow = ({
  zoneData,
  getStyle,
  orderList,
  zoneLoadingStatus = {},
}) => {
  //   if (!zoneData) return null;

  const presorted = Object.keys(zoneData);

  const dataKeys = presorted.reduce((acc, key) => {
    const keyIndex = orderList.reduce((indexAcc, fragment, index) => {
      if (key.indexOf(fragment) > -1) indexAcc = index;
      return indexAcc;
    }, -1);
    acc[keyIndex] = key;
    return acc;
  }, []);

  const getRow = (index) => {
    return dataKeys.reduce((acc, key) => {
      if (zoneLoadingStatus[key]) {
        acc.push(LoadingRow);
        return acc;
      }
      const currentRow = zoneData?.[key];
      if (!currentRow) return acc;
      const rowData = currentRow[index] || [];

      const rowReducerFn = (rowAccum, item, columnIndex) => {
        if (Array.isArray(item)) {
          rowAccum.push(...item.reduce(rowReducerFn, []));
        } else {
          rowAccum.push(
            key.indexOf('HB') > -1 ? (
              <th style={{ ...getStyle(columnIndex, key) }}>{item}</th>
            ) : (
              <td style={{ ...getStyle(columnIndex, key) }}>{item}</td>
            ),
          );
        }

        return rowAccum;
      };

      acc.push(rowData.reduce(rowReducerFn, []));
      return acc;
    }, []);
  };

  const anchorArray = zoneData?.[dataKeys[0]];

  if (!anchorArray || anchorArray.length === 0) return LoadingRow;
  return anchorArray.map((item, index) => <tr>{getRow(index)}</tr>);
};

export const getStyleFn = (data) => (index, key) => {
  const targetZone = data.find((zone) => zone.id === key);

  return targetZone?.cells?.[index] ? targetZone?.cells?.[index].style : {};
};
