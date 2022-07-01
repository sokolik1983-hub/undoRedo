/* eslint-disable react/jsx-wrap-multilines */
import PropTypes from 'prop-types';
import ListTableView from './ListTableView/ListTableView';
import ListColumnsView from './ListColumnsView/ListColumnsView';

/**
 * @param listItems - папки и файлы для отрисовки
 * @param multiColumnView - тип отображения (колонки/таблица)
 * @param tableRows - табличные строки
 * @param tableHeader - заголовки таблицы
 *
 */

const List = ({ listItems, multiColumnView, tableHeader, tableRows }) => {
  console.log('listItems', listItems)
  return multiColumnView ? (
    <ListColumnsView listItems={listItems} />
  ) : (
    <ListTableView tableHeader={tableHeader} tableRows={tableRows} />
  );
};

export default List;

List.propTypes = {
  listItems: PropTypes.array,
  multiColumnView: PropTypes.bool,
  tableRows: PropTypes.array,
  tableHeader: PropTypes.array
};
