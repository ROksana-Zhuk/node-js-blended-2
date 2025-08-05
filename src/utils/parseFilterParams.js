const parseCategory = (category) => {
    const isString = typeof category === 'string';
    if (!isString) return;
    const isCategory = (category) => ['books', 'electronics', 'clothing', 'other'].includes(category);
    if (isCategory(category)) return category;
  };

  const parseNumber = (number) => {
    const isString = typeof number === 'string';
    if (!isString) return;

    const parsedNumber = Number(number);
    if (Number.isNaN(parsedNumber)) {
      return;
    }
    return parsedNumber;
  };


export const parseFilterParams = (query) => {
    console.log('qqqqq:', query);

    const { category, maxPrice, minPrice } = query;



    const parsedCategory = parseCategory(category);
    const parsedMaxPrice = parseNumber(maxPrice);
    const parsedMinPrice = parseNumber(minPrice);

    return {
      category: parsedCategory,
      maxPrice: parsedMaxPrice,
      minPrice: parsedMinPrice,
    };
  };
