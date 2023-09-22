export const formatPrice = (price) => {
  return price >= 0
    ? price.toLocaleString("vi", {
        style: "currency",
        currency: "VND",
      })
    : price;
};
