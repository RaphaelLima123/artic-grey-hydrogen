const numberToCurrency = (number: number) => {
  return number.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};

const formatCurrency = {
  numberToCurrency,
};

export default formatCurrency;
