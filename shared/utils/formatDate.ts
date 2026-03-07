/** "YYYY-MM-DD" → "M월 D일" */
export function formatMonthDay(date: string): string {
  const [, month, day] = date.split('-');
  return `${parseInt(month)}월 ${parseInt(day)}일`;
}

/** "YYYY-MM-DD" → "YYYY년 M월 D일" */
export function formatFullDate(date: string): string {
  const [year, month, day] = date.split('-');
  return `${year}년 ${parseInt(month)}월 ${parseInt(day)}일`;
}
