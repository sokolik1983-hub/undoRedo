import lodash from 'lodash';
import React, { ChangeEvent, FC } from 'react';

interface IColumn {
  id: string;
  name?: string;
  order: string;
  show: boolean;
}

interface IColumnsListProps {
  arr: Array<IColumn>;
  handleSetColumns: (arr: Array<IColumn>) => Array<IColumn>;
}

const ColumnsList: FC<IColumnsListProps> = ({ arr, handleSetColumns }) => {
  const isVisibleColumn = (columnId: string) =>
    lodash.find(arr, (item) => item.id === columnId)?.show;

  const handleToggleColumn =
    (columnId: string) => (event: ChangeEvent<HTMLInputElement>) => {
      event.stopPropagation();
      const newColumns = lodash.cloneDeep(arr).map((item) => {
        if (item.id === columnId) {
          item.show = event.target.checked;
        }
        return item;
      });
      handleSetColumns(newColumns);
    };

  return (
    <table>
      <tbody>
        {lodash.sortBy(arr, 'order').map((item) => (
          <tr key={item.id}>
            <td key={item.id} id={item.id}>
              {' '}
              {/* order={item.order} */}
              {item.name}
            </td>
            <td>
              <input
                type="checkbox"
                name={item.id}
                value={item.id}
                checked={isVisibleColumn(item.id)}
                onChange={handleToggleColumn(item.id)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ColumnsList;
