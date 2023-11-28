export function formaNumber(number: number): string {
  if (number === 0) {
    return "0";
  } else if (number < 1000) {
    return number.toFixed(2);
  } else if (number < 1000000) {
    return (number / 1000).toFixed(2) + " K";
  } else {
    return (number / 1000000).toFixed(2) + " M";
  }
}
