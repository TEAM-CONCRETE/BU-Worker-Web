export function formatResidentNum(value: string): string {
  const numbers = value.replace(/[^\d]/g, "");

  if (numbers.length <= 6) {
    return numbers;
  } else {
    return `${numbers.slice(0, 6)}-${numbers.slice(6, 13)}`;
  }
}
