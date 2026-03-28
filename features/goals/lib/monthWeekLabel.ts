const SEOUL_TZ = 'Asia/Seoul';

/** 서울 달력 기준 연·월·일 (API가 UTC로 줄 때도 주차가 흔들리지 않도록) */
function getCalendarPartsInSeoul(date: Date): {
  year: number;
  month: number;
  day: number;
} {
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: SEOUL_TZ,
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
  const parts = formatter.formatToParts(date);
  const year = Number(parts.find((p) => p.type === 'year')?.value);
  const month = Number(parts.find((p) => p.type === 'month')?.value);
  const day = Number(parts.find((p) => p.type === 'day')?.value);
  return { year, month, day };
}

/** 해당 날짜가 속한 '월의 주차'(1~5) — 예: 2월 1주차 */
export function getMonthWeekKey(date: Date): string {
  const { year, month, day } = getCalendarPartsInSeoul(date);
  const weekInMonth = Math.ceil(day / 7);
  return `${year}-${month}-${weekInMonth}`;
}

/** 표시용: "2월 1주차" */
export function formatMonthWeekLabel(date: Date): string {
  const { month, day } = getCalendarPartsInSeoul(date);
  const weekInMonth = Math.ceil(day / 7);
  return `${month}월 ${weekInMonth}주차`;
}

/** 최근 주차가 위로 오도록 내림차순 */
export function compareMonthWeekKeysDesc(a: string, b: string): number {
  const [ay, am, aw] = a.split('-').map(Number);
  const [by, bm, bw] = b.split('-').map(Number);
  const va = ay * 10000 + am * 100 + aw;
  const vb = by * 10000 + bm * 100 + bw;
  return vb - va;
}

/** 해당 연·월의 일 수 (1~12) */
function daysInMonth(year: number, month1Based: number): number {
  return new Date(year, month1Based, 0).getDate();
}

/** 해당 연·월을 몇 주차로 나누는지 (말일 기준 ceil) */
export function getWeeksInMonth(year: number, month: number): number {
  return Math.ceil(daysInMonth(year, month) / 7);
}

/**
 * 같은 달이면 직전 주차, 1주차면 이전 달의 마지막 주차
 * 예: 3월 4주차 → 3월 3주차, 3월 1주차 → 2월 마지막 주차
 */
export function getPreviousMonthWeekKey(key: string): string {
  const [y, m, w] = key.split('-').map(Number);
  if (w > 1) {
    return `${y}-${m}-${w - 1}`;
  }
  let prevM = m - 1;
  let prevY = y;
  if (prevM < 1) {
    prevM = 12;
    prevY -= 1;
  }
  const lastWeek = getWeeksInMonth(prevY, prevM);
  return `${prevY}-${prevM}-${lastWeek}`;
}

/** 할 일이 없어도 주차 라벨만 표시할 때 */
export function formatMonthWeekLabelFromKey(key: string): string {
  const [, m, w] = key.split('-').map(Number);
  return `${m}월 ${w}주차`;
}
