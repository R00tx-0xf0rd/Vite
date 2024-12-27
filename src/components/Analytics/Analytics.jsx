import { Card } from "antd";
import React, { useEffect } from "react";
import { month as extMonth, getParams } from "../../helpers/lib";

import styles from "./styles.module.css";

const Analytics = () => {
  const [month, setMonth] = React.useState(1);
  const [periods, setPeriods] = React.useState({});
  const [summary, setSummary] = React.useState(null);

  function myFetch(url) {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setPeriods(data);
      })
      .catch((err) => console.log(err.message));
  }

  useEffect(() => {
    // getParams(setPeriods, month, 2024);
    const year = 2024;
    const url = `http://localhost:8000/times/from-begin/${month}/${year}`;
    myFetch(url);
  }, []);

  // useEffect(() => {
  //   console.log(periods);
  // }, [month]);

  const handleClick = () => {
    console.log(periods);
    const year = 2024;
    const url = `http://localhost:8000/times/from-begin/${month}/${year}`;
    myFetch(url);

    // getParams(setPeriods, month, 2024);

    // setSummary((prev) => analyze(prev));
    console.log(month);
  };

  const onChangeSelect = (e) => {
    setMonth(() =>e.target.value);
    console.log(month);
  };

  function analyze() {
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
      sumObj.vacations += vacations;
      sumObj.diseases += diseases * norm;
      sumObj.distractions += distractions * norm;
      sumObj.outside_depots += outside_depots * norm;
      sumObj.business_trips += business_trips * norm;
      sumObj.doublers += doublers * norm;
      sumObj.training_vacations += training_vacations * norm;
      sumObj.total_hours += total_hours;
    });
    console.log(sumObj);
    setSummary((prev) => {
      {
        prev, sumObj;
      }
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
          <h3>Предыдущий год:</h3>
          <div className={styles.innerBlock}>
            <div className={styles.rowItem}>
              <p>Год: </p>
              <p></p>
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
