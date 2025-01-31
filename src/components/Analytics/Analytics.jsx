import { Card } from "antd";
import React, { useEffect } from "react";
import { month as extMonth, getPercentage } from "../../helpers/lib";

import TableItems from "../UI/TableItems/TableItems";
import styles from "./styles.module.css";
import { backend_addr } from "../../helpers/constant";
import AnalyticsRow from "../UI/AnalyticsRow/AnalyticsRow";

const Analytics = () => {
  const [loading, setLoading] = React.useState(true);
  const [month, setMonth] = React.useState(1);
  const [year, setYear] = React.useState(2024);
  const [periods, setPeriods] = React.useState(null);
  const [summary, setSummary] = React.useState({});

  async function myFetch(url) {
    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setPeriods(data);
      })
      .catch((err) => console.log(err.message))
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    // console.log("init");
    analyze();
  }, [periods]);

  useEffect(() => {
    // console.log("month changed!!!");
    const url = `http://${backend_addr}/times/from-begin/${month}/${year}`;
    myFetch(url);

    // console.log(periods);
  }, [month, year]);

  const handleClick = () => {
    console.log(periods);
    analyze();
    console.log(month);
  };

  const onChangeSelect = (e) => {
    setLoading(true);
    setMonth(() => e.target.value);
    // console.log(month);
  };

  function analyze() {
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

        sum += val;
        // console.log(key, sum);
      }
      const less7 = Object.values(overtime).reduce((a, b) => a + b, 0);
      sum += less7;
      outObj["less7"] = (outObj["less7"] || 0) + less7;
      outObj["hours"] = (outObj["hours"] || 0) + sum - rest["norm"];
      outObj["total_hours"] = (outObj["total_hours"] || 0) + total_hours;
    });
    setSummary((prev) => {
      // console.log(prev);
      return { ...prev, ...outObj };
    });
  }

  return (
    <Card style={{ backgroundColor: "#d4d4d4" }}>
      <h3>
        Выбранный период: с начала года по {extMonth[month - 1]} включительно
      </h3>
      <select onChange={onChangeSelect} name="month" id="">
        {extMonth.map((item, index) => (
          <option key={index + 1} value={index + 1}>
            {item}
          </option>
        ))}
      </select>
      {loading ? (
        <p>loading...</p>
      ) : (
        <div className={styles.grid}>
          <div className={styles.zone1}>
            <h3>Текущий год:</h3>
            <div className={styles.innerBlock}>
              <div className={styles.rowItem}>
                <div className={styles.cell}>Норма часов: </div>
                <div className={styles.cell}>{summary.norm}</div>
              </div>
              <AnalyticsRow header = {'Нехватка человек:'} values = {[summary.hours, summary.human_hours, summary.total_hours]} />
              <div className={styles.rowItem}>
                <p>Следование пассажиром: </p>
                <p>
                  {summary.pass_follow}
                  <span>
                    /{" "}
                    {
                      getPercentage(
                        summary.pass_follow,
                        summary.hours,
                        summary.total_hours
                      )[0]
                    }
                    %
                  </span>
                  <span>
                    /{" "}
                    {
                      getPercentage(
                        summary.pass_follow,
                        summary.hours,
                        summary.total_hours
                      )[1]
                    }
                  </span>
                </p>
              </div>
              <div className={styles.rowItem}>
                <p>Следование резервом: </p>
                <p>
                  {summary.rez_follow}
                  <span>
                    /{" "}
                    {
                      getPercentage(
                        summary.rez_follow,
                        summary.hours,
                        summary.total_hours
                      )[0]
                    }
                    %
                  </span>
                  <span>
                    /{" "}
                    {
                      getPercentage(
                        summary.rez_follow,
                        summary.hours,
                        summary.total_hours
                      )[1]
                    }
                  </span>
                </p>
              </div>
              <div className={styles.rowItem}>
                <p>Ожидаение следования: </p>
                <p>
                  {summary.wait_follow}
                  <span>
                    /{" "}
                    {
                      getPercentage(
                        summary.wait_follow,
                        summary.hours,
                        summary.total_hours
                      )[0]
                    }
                    %
                  </span>
                  <span>
                    /{" "}
                    {
                      getPercentage(
                        summary.wait_follow,
                        summary.hours,
                        summary.total_hours
                      )[1]
                    }
                  </span>
                </p>
              </div>
              <div className={styles.rowItem}>
                <p>Графиковые (до 7 часов): </p>
                <p>
                  {summary.less7}
                  <span>
                    /{" "}
                    {
                      getPercentage(
                        summary.less7,
                        summary.hours,
                        summary.total_hours
                      )[0]
                    }
                    %
                  </span>
                  <span>
                    /{" "}
                    {
                      getPercentage(
                        summary.less7,
                        summary.hours,
                        summary.total_hours
                      )[1]
                    }
                  </span>
                </p>
              </div>
              <div className={styles.rowItem}>
                <p>Очередной отпуск: </p>
                <p>
                  {summary.vacations}
                  <span>
                    /{" "}
                    {
                      getPercentage(
                        summary.vacations,
                        summary.hours,
                        summary.total_hours
                      )[0]
                    }
                    %
                  </span>
                  <span>
                    /{" "}
                    {
                      getPercentage(
                        summary.vacations,
                        summary.hours,
                        summary.total_hours
                      )[1]
                    }
                  </span>
                </p>
              </div>
              <div className={styles.rowItem}>
                <p>Болезнь свыше нормы: </p>
                <p>
                  {summary.diseases}
                  <span>
                    /{" "}
                    {
                      getPercentage(
                        summary.diseases,
                        summary.hours,
                        summary.total_hours
                      )[0]
                    }
                    %
                  </span>
                  <span>
                    /{" "}
                    {
                      getPercentage(
                        summary.diseases,
                        summary.hours,
                        summary.total_hours
                      )[1]
                    }
                  </span>
                </p>
              </div>
              <div className={styles.rowItem}>
                <p>Отвлечение в депо: </p>
                <p>
                  {summary.distractions}
                  <span>
                    /{" "}
                    {
                      getPercentage(
                        summary.distractions,
                        summary.hours,
                        summary.total_hours
                      )[0]
                    }
                    %
                  </span>
                  <span>
                    /{" "}
                    {
                      getPercentage(
                        summary.distractions,
                        summary.hours,
                        summary.total_hours
                      )[1]
                    }
                  </span>
                </p>
              </div>
              <div className={styles.rowItem}>
                <p>Командировки: </p>
                <p>
                  {summary.business_trips}
                  <span>
                    /{" "}
                    {
                      getPercentage(
                        summary.business_trips,
                        summary.hours,
                        summary.total_hours
                      )[0]
                    }
                    %
                  </span>
                  <span>
                    /{" "}
                    {
                      getPercentage(
                        summary.business_trips,
                        summary.hours,
                        summary.total_hours
                      )[1]
                    }
                  </span>
                </p>
              </div>
              <div className={styles.rowItem}>
                <p>Вне депо: </p>
                <p>
                  {summary.outside_depots}
                  <span>
                    /{" "}
                    {
                      getPercentage(
                        summary.outside_depots,
                        summary.hours,
                        summary.total_hours
                      )[0]
                    }
                    %
                  </span>
                  <span>
                    /{" "}
                    {
                      getPercentage(
                        summary.outside_depots,
                        summary.hours,
                        summary.total_hours
                      )[1]
                    }
                  </span>
                </p>
              </div>
              <div className={styles.rowItem}>
                <p>Дублеры: </p>
                <p>
                  {summary.doublers}
                  <span>
                    /{" "}
                    {
                      getPercentage(
                        summary.doublers,
                        summary.hours,
                        summary.total_hours
                      )[0]
                    }
                    %
                  </span>
                  <span>
                    /{" "}
                    {
                      getPercentage(
                        summary.doublers,
                        summary.hours,
                        summary.total_hours
                      )[1]
                    }
                  </span>
                </p>
              </div>
              <div className={styles.rowItem}>
                <p>Учебный отпуск: </p>
                <p>
                  {summary.training_vacations}
                  <span>
                    /{" "}
                    {
                      getPercentage(
                        summary.training_vacations,
                        summary.hours,
                        summary.total_hours
                      )[0]
                    }
                    %
                  </span>
                  <span>
                    /{" "}
                    {
                      getPercentage(
                        summary.training_vacations,
                        summary.hours,
                        summary.total_hours
                      )[1]
                    }
                  </span>
                </p>
              </div>
              <div className={styles.rowItem}>
                <p>Всего часов: </p>
                <p>
                  {summary.hours}
                  <span>
                    /{" "}
                    {
                      getPercentage(
                        summary.hours,
                        summary.hours,
                        summary.total_hours
                      )[0]
                    }
                    %
                  </span>
                  <span>
                    /{" "}
                    {
                      getPercentage(
                        summary.hours,
                        summary.hours,
                        summary.total_hours
                      )[1]
                    }
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className={styles.zone2}>
            <TableItems year={year} h1={"hello"} summary={{ ...summary }} />
          </div>
          <div className={styles.zone3}>
            <TableItems year={year - 1} h1={"hello"} summary={{ ...summary }} />
          </div>
          <button onClick={() => handleClick()}>get dates</button>
        </div>
      )}

      {/* <ul>
        {periods?.map((element, indx) => (
          <li key={indx}>{element.norm}</li>
        ))}
      </ul> */}
    </Card>
  );
};

export default Analytics;
