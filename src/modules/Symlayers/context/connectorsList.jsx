/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import { useContext, createContext, useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getConnectors } from '../../../data/actions/connectors';
import { getUniverses } from '../../../data/actions/universes';
import { sortFoldersAndItems } from '../helper';

const ConnectorsListContext = createContext();
export const useConnectorsListData = () => useContext(ConnectorsListContext);

const ConnectorsListProvider = ({ children }) => {
  const dispatch = useDispatch();
  const universes = useSelector(state => state.app.data.universes);

  // Получаем список коннекторов
  useEffect(() => {
    dispatch(getUniverses());
  }, []);

  const rootFolder = useMemo(() => {
    if (!universes.children) return universes;
    const sortedConnectorsChildren = sortFoldersAndItems(universes.children);

    return {
      ...universes,
      children: sortedConnectorsChildren
    };
  }, [universes]);

  const [foldersHistory, setFoldersHistory] = useState([rootFolder]);
  const [currentFolderIndex, setCurrentFolderIndex] = useState(0);
  const [actionButtonIsDisable, setActionButtonIsDisable] = useState({
    prev: true,
    next: true,
    up: true
  });
  const [multiColumnView, setMultiColumnView] = useState(true);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    setFoldersHistory([rootFolder]);
  }, [universes]);

  useEffect(() => {
    setActionButtonIsDisable({
      prev: !currentFolderIndex,
      next: currentFolderIndex === foldersHistory.length - 1,
      up: !currentFolderIndex
    });
  }, [currentFolderIndex]);

  const onFolderDoubleClick = folder => {
    if (!folder.children) return;

    const folderWithSortedChildren = {
      ...folder,
      children: sortFoldersAndItems(folder.children)
    };

    setFoldersHistory([
      ...foldersHistory.slice(0, currentFolderIndex + 1),
      folderWithSortedChildren
    ]);
    setCurrentFolderIndex(prev => prev + 1);
  };

  const getBreadcrumbs = () =>
    foldersHistory
      .map(i => i.folder_name)
      .slice(0, currentFolderIndex + 1)
      .join(` / `);

  const moveToRootFolder = () => {
    setCurrentFolderIndex(0);
    setFoldersHistory([rootFolder]);
  };

  const moveToPrevFolder = () => {
    setCurrentFolderIndex(prev => (prev === 0 ? 0 : prev - 1));
  };

  const moveToNextFolder = () => {
    setCurrentFolderIndex(prev =>
      prev === foldersHistory.length ? prev : prev + 1
    );
  };

  const onSearch = async () => {};

  return (
    <ConnectorsListContext.Provider
      value={{
        connectors: foldersHistory[currentFolderIndex]?.children,
        onFolderDoubleClick,
        moveToRootFolder,
        moveToPrevFolder,
        moveToNextFolder,
        actionButtonIsDisable,
        getBreadcrumbs,
        multiColumnView,
        setMultiColumnView,
        searchValue,
        setSearchValue,
        onSearch
      }}
    >
      {children}
    </ConnectorsListContext.Provider>
  );
};

export default ConnectorsListProvider;

ConnectorsListProvider.propTypes = {
  children: PropTypes.node
};
