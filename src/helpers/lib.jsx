export const month = [
  "январь",
  "февраль",
  "март",
  "апрель",
  "май",
  "июнь",
  "июль",
  "август",
  "сентябрь",
  "октябрь",
  "ноябрь",
  "декабрь",
];
export function monthStr(indx) {
  if (indx < 13 && indx > 0) return month[indx - 1];
  return month[0];
}

export function parsePeriod(periods) {
  if (!Array.isArray(periods) || !periods.length) return null;

  const ignoreKeys = ["month", "year"];
  const importantKeys = ["norm", "pass_follow", "rez_follow", "wait_follow"];

  const outObj = {};

  periods.forEach((monObj) => {
    const { total_hours, overtime, ...rest } = monObj;

    let accumulatedSum = 0;

    for (let key in rest) {
      if (ignoreKeys.includes(key)) continue;

      let value = 0;
      if (importantKeys.includes(key)) {
        value = rest[key]; // Берём исходное значение
      } else {
        value = rest[key] * rest["norm"]; // Умножаем на норму
      }

      // Окончательное округление до двух знаков после запятой
      value = parseFloat(value.toFixed(2));

      outObj[key] = (outObj[key] ?? 0) + value;
      accumulatedSum += value;
    }

    const less7 = Object.values(overtime).reduce((acc, curr) => acc + curr, 0);
    outObj["less7"] = (outObj["less7"] ?? 0) + less7;
    outObj["hours"] = (outObj["hours"] ?? 0) + accumulatedSum - rest["norm"];
    outObj["total_hours"] = (outObj["total_hours"] ?? 0) + total_hours;
  });
  outObj.less7 = parseFloat(outObj.less7.toFixed(1));

  return outObj;
}
