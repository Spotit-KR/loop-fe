/** "YYYY-MM-DD" → "M월 D일" */
export function formatMonthDay(date: string): string {
  const [, month, day] = date.split('-');
  return `${parseInt(month)}월 ${parseInt(day)}일`;
}
