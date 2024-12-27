import { Card } from "antd";
import React, { useEffect } from "react";
import { month as extMonth } from "../../helpers/lib";

import styles from "./styles.module.css";

const Analytics = () => {
  const [loading, setLoading] = React.useState(true);
  const [month, setMonth] = React.useState(1);
  const [year, setYear] = React.useState(2024);
  const [periods, setPeriods] = React.useState(null);
  const [summary, setSummary] = React.useState(null);

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
    console.log("init");
    analyze();
  }, [periods]);

  useEffect(() => {
    const year = 2024;
    console.log("month changed!!!");
    const url = `http://localhost:8000/times/from-begin/${month}/${year}`;
    myFetch(url);

    // console.log(periods);
  }, [month]);

  const handleClick = () => {
    console.log(periods);
    // console.log(periods);
    // const url = `http://localhost:8000/times/from-begin/${month}/${year}`;
    // myFetch(url);
    analyze();

    // getParams(setPeriods, month, 2024);

    // setSummary((prev) => analyze(prev));
    console.log(month);
  };

  const onChangeSelect = (e) => {
    setLoading(true);
    setMonth(() => e.target.value);
    console.log(month);
  };

  function analyze() {
    if (!periods) return null;
    const sumObj = {
      norm: 0,
      human_hours: 0,
      pass_follow: 0,
      rez_follow: 0,
      wait_follow: 0,
      less7: 0,
      vacations: 0,
      diseases: 0,
      distractions: 0,
      outside_depots: 0,
      business_trips: 0,
      doublers: 0,
      training_vacations: 0,
      total_hours: 0,
    };
    periods.forEach((element) => {
      const {
        norm,
        human_hours,
        pass_follow,
        rez_follow,
        wait_follow,
        // less7,
        vacations,
        diseases,
        distractions,
        outside_depots,
        business_trips,
        doublers,
        training_vacations,
        total_hours,
      } = element;
      sumObj.norm += norm;
      sumObj.human_hours += human_hours * norm;
      sumObj.pass_follow += pass_follow;
      sumObj.rez_follow += rez_follow;
      sumObj.wait_follow += wait_follow;
      for (const item in element.overtime) {
        // console.log(element.overtime[item]);
        sumObj["less7"] += element.overtime[item];
        // console.log("sum:", sumObj.less7);
      }

      // sumObj.less7 += less7;
      sumObj.vacations += vacations * norm;
      sumObj.diseases += diseases * norm;
      sumObj.distractions += distractions * norm;
      sumObj.outside_depots += outside_depots * norm;
      sumObj.business_trips += business_trips * norm;
      sumObj.doublers += doublers * norm;
      sumObj.training_vacations += training_vacations * norm;
      sumObj.total_hours += total_hours;
      sumObj.hours =
        sumObj.human_hours +
        sumObj.pass_follow +
        sumObj.rez_follow +
        sumObj.wait_follow +
        sumObj.less7 +
        sumObj.vacations +
        sumObj.diseases +
        sumObj.outside_depots +
        sumObj.business_trips +
        sumObj.doublers +
        sumObj.training_vacations;
    });
    // console.log(sumObj);
    setSummary((prev) => {
      console.log(prev);
      return { ...prev, ...sumObj };
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
      <div className={styles.grid}>
        <div className={styles.zone1}>
          <h3>Текущий год:</h3>
          <div className={styles.innerBlock}>
            <div className={styles.rowItem}>
              <p>Норма часов: </p>
              <p>{summary.norm}</p>
            </div>
            <div className={styles.rowItem}>
              <p>Нехватка человек: </p>
              <p>
                {summary.human_hours}
                <span>
                  {" "}
                  /{" "}
                  {((summary.human_hours * 100) / summary.total_hours).toFixed(
                    1
                  )}
                  %
                </span>
              </p>
            </div>
            <div className={styles.rowItem}>
              <p>Следование пассажиром: </p>
              <p>{summary.pass_follow}</p>
            </div>
            <div className={styles.rowItem}>
              <p>Следование резервом: </p>
              <p>{summary.rez_follow}</p>
            </div>
            <div className={styles.rowItem}>
              <p>Ожидаение следования: </p>
              <p>{summary.wait_follow}</p>
            </div>
            <div className={styles.rowItem}>
              <p>Графиковые (до 7 часов): </p>
              <p>{summary.less7}</p>
            </div>
            <div className={styles.rowItem}>
              <p>Очередной отпуск: </p>
              <p>{summary.vacations}</p>
            </div>
            <div className={styles.rowItem}>
              <p>Болезнь свыше нормы: </p>
              <p>{summary.diseases}</p>
            </div>
            <div className={styles.rowItem}>
              <p>Отвлечение в депо: </p>
              <p>{summary.distractions}</p>
            </div>
            <div className={styles.rowItem}>
              <p>Командировки: </p>
              <p>{summary.business_trips}</p>
            </div>
            <div className={styles.rowItem}>
              <p>Вне депо: </p>
              <p>{summary.outside_depots}</p>
            </div>
            <div className={styles.rowItem}>
              <p>Дублеры: </p>
              <p>{summary.doublers}</p>
            </div>
            <div className={styles.rowItem}>
              <p>Учебный отпуск: </p>
              <p>{summary.training_vacations}</p>
            </div>
            <div className={styles.rowItem}>
              <p>Всего часов: </p>
              <p>{summary.total_hours}</p>
            </div>
          </div>
        </div>
        <button onClick={() => handleClick()}>get dates</button>
      </div>
      {/* <ul>
        {periods?.map((element, indx) => (
          <li key={indx}>{element.norm}</li>
        ))}
      </ul> */}
    </Card>
  );
};

export default Analytics;
