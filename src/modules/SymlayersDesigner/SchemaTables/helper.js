export const handleCheckMatch = (el) => {
  const numberReg = /[0-9]+/g;
  const specReg = /[!"@#';:/?$%^*()]+/g;

  if (el && el.length > 3 && !el[0].match(numberReg) && !el.match(specReg)) {
    return true;
  }
  return false;
};
