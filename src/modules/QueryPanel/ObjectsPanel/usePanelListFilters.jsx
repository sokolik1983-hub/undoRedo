import { useEffect, useState } from 'react';

import { EMPTY_STRING } from '../../../common/constants/common';
import { useDebounce } from '../../../common/hooks/useDebounce';

const usePanelListFilters = (rootFolder) => {
  const [searchValue, setSearchValue] = useState(EMPTY_STRING);
  const [filterType, setFilterType] = useState([]);
  const [filteredData, setFilteredData] = useState();

  const debouncedSearchValue = useDebounce(searchValue, 500);

  const handleFiltersSwitch = (type) => {
    if (!filterType.includes(type)) {
      setFilterType([...filterType, type]);
    } else {
      setFilterType((prevState) =>
        prevState.filter((objectTypeId) => objectTypeId !== type),
      );
    }
  };

  const filterByType = (result, item) => {
    if (item.objectType === 'Folder') {
      const folder = {
        ...item,
        children: item?.children?.reduce(filterByType, []),
      };
      if (folder?.children?.length) result.push(folder);
    } else if (filterType.includes(item.objectType)) {
      result.push(item);
    }
    return result;
  };

  const filterBySearchValue = (result, item) => {
    if (item.objectType === 'Folder') {
      const folder = {
        ...item,
        children: item.children.reduce(filterBySearchValue, []),
      };
      if (folder.children.length) result.push(folder);
    } else {
      const itemName = item.name.toLowerCase();
      const value = debouncedSearchValue.toLowerCase().trim();
      if (itemName.includes(value)) {
        result.push(item);
      }
    }
    return result;
  };

  useEffect(() => {
    let filteredChildren = rootFolder?.children;

    if (filterType.length) {
      filteredChildren = filteredChildren?.reduce(filterByType, []);
    }

    if (debouncedSearchValue && debouncedSearchValue.length >= 2) {
      filteredChildren = filteredChildren?.reduce(filterBySearchValue, []);
    }

    setFilteredData({
      ...rootFolder,
      children: filteredChildren,
    });
  }, [rootFolder, filterType, debouncedSearchValue]);

  return {
    rootFolder: rootFolder ? filteredData : null,
    filterType,
    handleFiltersSwitch,
    searchValue,
    setSearchValue,
  };
};

export default usePanelListFilters;
