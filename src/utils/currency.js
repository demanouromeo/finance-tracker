const CURRENCY_FORMATTER = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatCurrency(value) {
  const normalizedValue = Number.isFinite(value) ? value : 0;
  return CURRENCY_FORMATTER.format(normalizedValue);
}
