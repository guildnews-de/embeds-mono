export default function isDst(date: Date): boolean {
  const stdOffset = () => {
    const fullYear = date.getFullYear();
    const jan = new Date(fullYear, 0, 1);
    const jul = new Date(fullYear, 6, 1);
    return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
  };

  return date.getTimezoneOffset() < stdOffset();
}
