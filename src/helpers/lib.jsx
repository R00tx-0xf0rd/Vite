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

export function analyze(periods) {
  if (!periods) return null;
  const ignoreKeys = ["month", "year"];
  const importantKeys = ["norm", "pass_follow", "rez_follow", "wait_follow"];
  const outObj = {};
  periods.forEach((monObj) => {
    const { total_hours, overtime, ...rest } = monObj;

    let sum = 0;
    for (let key in rest) {
      if (ignoreKeys.includes(key)) continue;
      let val = 0;
      if (importantKeys.includes(key)) {
        val = rest[key];
      } else {
        val = rest[key] * rest["norm"];
      }
      outObj[key] = (outObj[key] || 0) + val;
      console.log(key, "=", val, outObj[key]);
      

      sum += val;
    }
    const less7 = Object.values(overtime).reduce((a, b) => a + b, 0);
    sum += less7;
    outObj["less7"] =(outObj["less7"] || 0) + less7;
    outObj["hours"] = (outObj["hours"] || 0) + sum - rest["norm"];
    outObj["total_hours"] = (outObj["total_hours"] || 0) + total_hours;
  });
  return outObj;
}
