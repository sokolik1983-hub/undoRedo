/* eslint-disable import/prefer-default-export */

import { useEffect, useState } from 'react';
import { EMPTY_STRING } from '../../../common/constants/common';
import { useDebounce } from '../../../common/hooks/useDebounce';

export const usePanelListFilters = rootFolder => {
  const [searchValue, setSearchValue] = useState(EMPTY_STRING);
  const [filterTypeId, setFilterTypeId] = useState([]);
  const [filteredData, setFilteredData] = useState();

  const debouncedSearchValue = useDebounce(searchValue, 500);

  const handleFiltersSwitch = id => {
    if (!filterTypeId.includes(id)) {
      setFilterTypeId([...filterTypeId, id]);
    } else {
      setFilterTypeId(prevState =>
        prevState.filter(objectTypeId => objectTypeId !== id)
      );
    }
  };

  const filterByType = (result, item) => {
    if (item.isFolder) {
      const folder = {
        ...item,
        children: item.children.reduce(filterByType, [])
      };
      if (folder.children.length) result.push(folder);
    } else if (filterTypeId.includes(item.objectType_id)) {
      result.push(item);
    }
    return result;
  };

  const filterBySearchValue = (result, item) => {
    if (item.isFolder) {
      const folder = {
        ...item,
        children: item.children.reduce(filterBySearchValue, [])
      };
      if (folder.children.length) result.push(folder);
    } else {
      const itemField = item.field.toLowerCase();
      const value = debouncedSearchValue.toLowerCase().trim();
      if (itemField.includes(value)) {
        result.push(item);
      }
    }
    return result;
  };

  useEffect(() => {
    let filteredChildren = rootFolder?.children;

    if (filterTypeId.length) {
      filteredChildren = filteredChildren?.reduce(filterByType, []);
    }

    if (debouncedSearchValue && debouncedSearchValue.length >= 2) {
      filteredChildren = filteredChildren?.reduce(filterBySearchValue, []);
    }

    setFilteredData({
      ...rootFolder,
      children: filteredChildren
    });
  }, [rootFolder, filterTypeId, debouncedSearchValue]);

  return {
    rootFolder: rootFolder ? filteredData : null,
    filterTypeId,
    handleFiltersSwitch,
    searchValue,
    setSearchValue
  };
};
