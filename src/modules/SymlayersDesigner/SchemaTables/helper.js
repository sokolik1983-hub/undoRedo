export const handleCheckMatch = (el) => {
  const numberReg = /[0-9]+/g;
  const specReg = /[!"@#';:/?$%^*()]+/g;

  if (el && el.length > 3 && !el[0].match(numberReg) && !el.match(specReg)) {
    return true;
  }
  return false;
};

export const searchLink = (table1Id, table2Id, links) => {
  const findedLink = links.find((link) => {
    const linkTable1Id = link.object1.table_id;
    const linkTable2Id = link.object2.table_id;
    if (
      (table1Id === linkTable1Id && table2Id === linkTable2Id) ||
      (table1Id === linkTable2Id && table2Id === linkTable1Id)
    ) {
      return link;
    }
  });
  return findedLink;
};
