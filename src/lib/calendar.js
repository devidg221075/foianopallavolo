export function seasonLabel(date = new Date()) {
  const startYear = date.getFullYear() - (date.getMonth() < 7 ? 1 : 0);
  return startYear + " / " + (startYear + 1);
}

export function buildMonthGrid(year, month) {
  const offset = (new Date(year, month, 1).getDay() + 6) % 7;
  return [
    ...Array(offset).fill(null),
    ...Array.from(
      {
        length: new Date(year, month + 1, 0).getDate(),
      },
      (h, C) => C + 1,
    ),
  ];
}

export const MONTH_NAMES = [
  "Gennaio",
  "Febbraio",
  "Marzo",
  "Aprile",
  "Maggio",
  "Giugno",
  "Luglio",
  "Agosto",
  "Settembre",
  "Ottobre",
  "Novembre",
  "Dicembre",
];

export const WEEKDAYS = ["L", "M", "M", "G", "V", "S", "D"];
