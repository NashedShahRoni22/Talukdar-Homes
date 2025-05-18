const getPriceRange = (attributes) => {
  if (!attributes?.length) return { minPrice: 0, maxPrice: 0 };

  const { min, max } = attributes.reduce(
    (acc, attr) => {
      const price = parseFloat(attr.price);
      if (isNaN(price)) return acc;

      return {
        min: Math.min(acc.min, price),
        max: Math.max(acc.max, price),
      };
    },
    { min: Infinity, max: -Infinity },
  );

  return {
    minPrice: min === Infinity ? 0 : min,
    maxPrice: max === -Infinity ? 0 : max,
  };
};

export default getPriceRange;
