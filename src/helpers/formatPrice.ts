export const formatPrice = (price: number | string, noRub: boolean = false) => {
  const formattedPrice = new Intl.NumberFormat('ru-RU').format(Number(price));

  if (noRub) {
    return formattedPrice;
  }
  return `${formattedPrice} ₽`;
};
