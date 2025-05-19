export const formatPrice = (price) => {
  const numericPrice = typeof price === "string" ? parseFloat(price) : price;

  const hasDecimals = numericPrice % 1 !== 0;

  return hasDecimals ? numericPrice.toFixed(2) : numericPrice.toString();
};
