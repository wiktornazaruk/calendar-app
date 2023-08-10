import dayjs from "dayjs";

export function getMonth(month = dayjs().month()) {
  month = Math.floor(month);
  const year = dayjs().year();
  const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).day();
  let currMonthCount = 0 - firstDayOfTheMonth;
  let numOfRows = 5;
  let numOfColumns = 7;
  const daysMatrix = new Array(numOfRows).fill([]).map(() => {
    return new Array(numOfColumns).fill(null).map(() => {
      currMonthCount++;
      return dayjs(new Date(year, month, currMonthCount));
    });
  });
  return daysMatrix;
}
