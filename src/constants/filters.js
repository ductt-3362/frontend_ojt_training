export const ALL_PRICE = 0;
export const LESS_THAN_100K_PRICE = 1;
export const FROM_100K_TO_200K_PRICE = 2;
export const FROM_200K_TO_300K_PRICE = 3;
export const MORE_THAN_300K_PRICE = 4;

export const PRICE_FILTER = [
  {
    label: "Tất cả",
    value: ALL_PRICE,
  },
  {
    label: "Nhỏ hơn 100.000đ",
    value: LESS_THAN_100K_PRICE,
  },
  {
    label: "Từ 100.000đ - 200.000đ",
    value: FROM_100K_TO_200K_PRICE,
  },
  {
    label: "Từ 200.000đ - 300.000đ",
    value: FROM_200K_TO_300K_PRICE,
  },
  {
    label: "Lớn hơn 300.000đ",
    value: MORE_THAN_300K_PRICE,
  },
];
