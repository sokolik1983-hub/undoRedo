export const conditionSwitcher = (cond) => {
  switch (cond) {
    case 'ИЛИ' :
      return 'OR';
    case 'И' :
      return 'AND';
    case 'равно' :
      return 'EQUAL';
    case 'меньше чем':
      return 'LESS_THAN';
    case 'меньше чем или равно':
      return 'LESS_THAN_EQUAL';
    case 'более чем':
      return 'MORE_THAN';
    case 'более чем или равно':
      return 'MORE_THAN_EQUAL';
    case 'в списке':
      return 'IN';
    case 'не в списке':
      return 'NOT_IN';
    case 'между':
      return 'BETWEEN';
    case 'соответсвие образцу':
      return 'LIKE';
    default :
      return null;
  }
}

export const getCondition = (condition) => {
    let isEmptyValue = false;
    
    function getChildren(item) {
      return {
        children: {
          prefix: conditionSwitcher(item.condition),
          data: item.children.map(child => {
            if (child.inputValue.trim() === '') {
              isEmptyValue = true;
            } 
            if (child && child.fieldItem) {
              return {
                field:
                  `${child.fieldItem.parent_folder}.${child.fieldItem.field}`,
                value: child.inputValue,
                cond_type: conditionSwitcher(child.itemCondition)
              };
            }

            if (child && child.children) {
              return getChildren(child);
            }

            return null;
          })
        }
      };
    }

    let resultString = {};

    condition.forEach(item => {
      if (item?.type === 'filter-node') {
        resultString.prefix = conditionSwitcher(item.condition);
        resultString.data = item.children.map(child => {
          if (child && child.fieldItem) {
            if (child.inputValue.trim() === '') {
              isEmptyValue = true;
            } 
            return {
              field:
                `${child.fieldItem.parent_folder}.${child.fieldItem.field}`,
              value: child.inputValue,
              cond_type: conditionSwitcher(child.itemCondition)
            };
          }

          if (child && child.children) {
            return getChildren(child);
          }

          return null;
        });
      }
      else if (item.type === 'filter-item') {
        resultString.prefix = 'AND';
        if (item.inputValue.trim() === '') {
          isEmptyValue = true;
        }
        resultString.data = [{
          field:  `${item.fieldItem.parent_folder}.${item.fieldItem.field}`,
          value: item.inputValue,
          cond_type: conditionSwitcher(item.itemCondition)
        }]
      }
    });
    
    resultString = isEmptyValue ? 'Empty Value' : resultString;
    return resultString;
  };

  export const isAnyEmptyFilter = (filters) => {
    let error = ''
    console.log(filters)
    if (Object.keys(filters).length !== 0) {
      filters.data.forEach(item => {
        if (item.value?.trim() === '') {
          error = 'Пустые фильтры';
        }
      })
    }
    return error;
  }

