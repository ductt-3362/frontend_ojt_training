export const formatPrice = (price) => {
  return price >= 0
    ? price.toLocaleString("vi", {
        style: "currency",
        currency: "VND",
      })
    : price;
};

export const formatDate = (date) => {
  const dateobject = new Date(date);
  return (
    dateobject.getFullYear() +
    "-" +
    (dateobject.getMonth() + 1) +
    "-" +
    dateobject.getDate() +
    " " +
    dateobject.getHours() +
    ":" +
    dateobject.getMinutes()
  );
};
