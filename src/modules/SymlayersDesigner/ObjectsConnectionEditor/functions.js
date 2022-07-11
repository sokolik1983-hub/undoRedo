// eslint-disable-next-line import/prefer-default-export
export const createExpression = (leftSelected, rightSelected, expression, leftTable, rightTable) => {
  let expressionSet = '';

  if (leftSelected && !Array.isArray(leftSelected)) {
    leftSelected = leftSelected.map(field => field.field);
  }

  if (rightSelected && !Array.isArray(rightSelected)) {
    rightSelected = rightSelected.map(field => field.field);
  }

  if (leftSelected && leftSelected.length > 0) {
    if (leftSelected.length === 1) {
      expressionSet = `${leftTable}.${leftSelected[0]}`;
    }
  }
  if (rightSelected && rightSelected.length > 0) {
    if (rightSelected.length === 1) {
      expressionSet += `${expression} ${rightTable}.${rightSelected[0]}`;
    }
  }

  if (
    leftSelected &&
    leftSelected.length > 0 &&
    rightSelected &&
    rightSelected.length > 0
  ) {
    if (leftSelected.length === 1 && rightSelected.length === 1) {
      expressionSet = `${leftTable}.${leftSelected[0] &&
      leftSelected[0]} ${expression} ${rightTable}.${rightSelected[0]}`;
    }
    if (leftSelected.length === 1 && rightSelected.length > 1) {
      const rightFields = rightSelected
        .map(item => ` ${rightTable}.${item}`)
        .join(' and ');
      expressionSet = `${leftTable}.${
        leftSelected[0]
      } between ${rightFields}`;
    }
    if (rightSelected.length === 1 && leftSelected.length > 1) {
      const leftFields = leftSelected
        .map(item => ` ${leftTable}.${item}`)
        .join(' and ');
      expressionSet = `${rightTable}.${
        rightSelected[0]
      } between ${leftFields}`;
    }
    if (
      rightSelected.length > 1 &&
      leftSelected.length > 1 &&
      rightSelected.length === leftSelected.length
    ) {
      const resultLink = leftSelected
        .map(
          (item, idx) =>
            ` ${leftTable}.${item} = ${
              rightTable}.${rightSelected[idx]}
              `
        )
        .join(' and ');

      expressionSet = `${resultLink}`;
    }
  }
  return expressionSet;
}
