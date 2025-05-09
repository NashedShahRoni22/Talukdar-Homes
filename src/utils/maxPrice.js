export const getMaxPrice = (products) => {
  return products.reduce((acc, product) => {
    const price = Math.ceil(parseFloat(product.price));
    return price > acc ? price : acc;
  }, 0);
};
