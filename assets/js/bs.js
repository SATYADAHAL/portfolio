// Gregorian -> Bikram Sambat, a direct port of toBsDate() in
// plasmacalendarplugins/alternatecalendar/provider/nepalicalendar.cpp.
import { FIRST_BS_YEAR, DAYS_PER_MONTH, YEAR_START_DAYS } from './bs-table.js';

const YEAR_COUNT = DAYS_PER_MONTH.length;
const TOTAL_DAYS =
  YEAR_START_DAYS[YEAR_COUNT - 1] + DAYS_PER_MONTH[YEAR_COUNT - 1].reduce((a, b) => a + b, 0);
const MEAN_MONTH_DAYS = TOTAL_DAYS / (YEAR_COUNT * 12);
const EPOCH_UTC = Date.UTC(1943, 3, 14);
const MS_PER_DAY = 86400000;

export const MONTHS_DEVANAGARI = [
  'बैशाख', 'जेठ', 'असार', 'साउन', 'भदौ', 'आश्विन',
  'कार्तिक', 'मंसिर', 'पुष', 'माघ', 'फाल्गुण', 'चैत्र',
];
export const MONTHS_LATIN = [
  'Baishakh', 'Jestha', 'Asar', 'Shrawan', 'Bhadra', 'Ashwin',
  'Kartik', 'Mangsir', 'Poush', 'Magh', 'Falgun', 'Chaitra',
];

export function toNepaliNumber(n) {
  return String(n).replace(/\d/g, (d) => '०१२३४५६७८९'[d]);
}

// year, month (1-12), day of a calendar date, independent of the viewer's time zone.
export function toBsDate(year, month, day) {
  const days = Math.round((Date.UTC(year, month - 1, day) - EPOCH_UTC) / MS_PER_DAY);

  if (days >= 0 && days < TOTAL_DAYS) {
    let i = 0;
    while (i + 1 < YEAR_COUNT && days >= YEAR_START_DAYS[i + 1]) i++;

    let offset = days - YEAR_START_DAYS[i];
    let m = 0;
    while (m < 12 && offset >= DAYS_PER_MONTH[i][m]) {
      offset -= DAYS_PER_MONTH[i][m];
      m++;
    }
    if (m < 12) return { year: FIRST_BS_YEAR + i, month: m + 1, day: offset + 1, approx: false };
  }

  // Outside the published table: approximate with the mean month length.
  const monthsTotal = Math.floor(days / MEAN_MONTH_DAYS);
  const yearOffset = Math.floor(monthsTotal / 12);
  return {
    year: FIRST_BS_YEAR + yearOffset,
    month: monthsTotal - yearOffset * 12 + 1,
    day: Math.floor(days - monthsTotal * MEAN_MONTH_DAYS) + 1,
    approx: true,
  };
}

// Same shape as the Plasma sub-label: "७ पुष, २०८२".
export function formatDevanagari(bs) {
  return `${toNepaliNumber(bs.day)} ${MONTHS_DEVANAGARI[bs.month - 1]}, ${toNepaliNumber(bs.year)}`;
}

export function formatLatin(bs) {
  return `${bs.day} ${MONTHS_LATIN[bs.month - 1]} ${bs.year}`;
}

// Today's date in Nepal (UTC+5:45), not in the viewer's zone.
export function todayInNepal() {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Kathmandu', year: 'numeric', month: '2-digit', day: '2-digit',
  }).formatToParts(new Date());
  const get = (t) => Number(parts.find((p) => p.type === t).value);
  return { year: get('year'), month: get('month'), day: get('day') };
}
