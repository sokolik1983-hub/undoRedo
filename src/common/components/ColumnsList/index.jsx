import lodash from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

const ColumnsList = ({arr, handleSetColumns}) => {
    const isVisibleColumn = (columnId) =>
        lodash.find(arr, (item) => item.id === columnId)?.show;

    const handleToggleColumn = (columnId) => (event) => {
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
                        <td key={item.id} id={item.id} order={item.order}>
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

ColumnsList.propTypes = {
    arr: PropTypes.array.isRequired,
    handleSetColumns: PropTypes.func,
};

ColumnsList.defaultProps = {
    handleSetColumns: () => {
        // something
    },
};
