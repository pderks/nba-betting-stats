export const decimalToAmericanOdds = (decimalOdds: number) => {
  if (decimalOdds >= 2) {
    return (decimalOdds - 1) * 100;
  } else {
    return (-100) / (decimalOdds - 1);
  }
};
