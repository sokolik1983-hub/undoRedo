import PropTypes from 'prop-types';
import ListNavBarActions from './ListNavBarActions/ListNavBarActions';
import ListNavBarViewToggler from './ListNavBarViewToggler/ListNavBarViewToggler';
import TextInput from '../TextInput';
import Search from '../Search';
import styles from './ListNavBar.module.scss';

/**
 * @param moveToRootFolder - функция - обработчик клика на кнопку "перейти в корневую папку"
 * @param moveToPrevFolder - функция - обработчик клика на кнопку "перейти в папку в предыдущую папку"
 * @param moveToNextFolder - функция - обработчик клика на кнопку "перейти в папку в следующую папку"
 * @param actionButtonIsDisable - объект, содержащий состояние disable для каждой кнопки ввиде булевого значения
 * @param getBreadcrumbs - функция, возвращающая строку с историей посещения папок
 * @param multiColumnViewAction - функция - переключатель отображения папок
 * @param searchValue - значение инпута поиска (управляемый компонент)
 * @param setSearchValue - сет значения инпута поиска
 * @param onSearch - функция субмита формы поиска
 *
 */

const ListNavBar = ({
  moveToRootFolder,
  moveToPrevFolder,
  moveToNextFolder,
  actionButtonIsDisable,
  getBreadcrumbs,
  multiColumnViewAction,
  searchValue,
  setSearchValue,
  onSearch
}) => {
  return (
    <div className={styles.navigation}>
      <div className={styles.navigationActions}>
        <ListNavBarActions
          onPrevClick={moveToPrevFolder}
          onNextClick={moveToNextFolder}
          onUpClick={moveToRootFolder}
          actionButtonIsDisable={actionButtonIsDisable}
        />
        <TextInput
          wrapperClassName={styles.breadcrumbsWrapper}
          className={styles.breadcrumbs}
          id="breadcrumbs"
          value={getBreadcrumbs()}
          disabled
        />
        <ListNavBarViewToggler showMultipleColumns={multiColumnViewAction} />
      </div>
      <Search
        className={styles.search}
        onSubmit={onSearch}
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
      />
    </div>
  );
};

export default ListNavBar;

ListNavBar.propTypes = {
  moveToRootFolder: PropTypes.func,
  moveToPrevFolder: PropTypes.func,
  moveToNextFolder: PropTypes.func,
  actionButtonIsDisable: PropTypes.object,
  getBreadcrumbs: PropTypes.func,
  multiColumnViewAction: PropTypes.func,
  searchValue: PropTypes.string,
  setSearchValue: PropTypes.func,
  onSearch: PropTypes.func
};
