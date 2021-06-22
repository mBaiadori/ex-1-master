export const objectSorts = (property: string, type: 'desc' | 'asc') => {
  let sortOrder = 1;
  if (property[0] === '-') {
    sortOrder = -1;
    property = property.substr(1);
  }
  if (type === 'asc') {
    return function (a, b) {
      let result = a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
      return result * sortOrder;
    };
  }
  if (type === 'desc') {
    return function (a, b) {
      let result = a[property] > b[property] ? -1 : a[property] < b[property] ? 1 : 0;
      return result * sortOrder;
    };
  }
};

export const paginateArray = (array: any[], per_page: number, page: number): any[] => {
  return array.slice((page - 1) * per_page, page * per_page);
};
