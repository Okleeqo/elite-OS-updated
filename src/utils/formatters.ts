export const formatCurrency = (value: number | undefined): string => {
  if (value === undefined) return '$0';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

export const formatPercentage = (value: number | undefined): string => {
  if (value === undefined) return '0%';
  return `${value.toFixed(1)}%`;
};

export const formatNumber = (value: number | undefined): string => {
  if (value === undefined) return '0';
  return new Intl.NumberFormat('en-US').format(value);
};