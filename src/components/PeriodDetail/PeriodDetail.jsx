import { Card, Spin } from "antd";
import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import styles from "./styles.module.css";

const PeriodDetail = () => {
  const { month, year } = useParams();
  const [period, setPeriod] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8000/times/period?month=${month}&year=${year}`)
      .then((resp) => {
        setPeriod(resp.data);
        console.log(period);
      })
      .catch((err) => {
        // console.error("Error response:");
        console.log(err.response.data.detail); // ***
        // console.error(err.response.status);  // ***
        // console.error(err.response.headers); // ***
        setPeriod(err.response.data);
      })
      .finally(() => setLoading(false));

    // getPeriod(month, year);
  }, []);

  return (
    <Card>
      {loading ? (
        <Spin size="large">
          <div>Loading...</div>
        </Spin>
      ) : (
        <div className={styles.grid}>
          <div className={styles.zone1}>
            <h3>Основные данные</h3>
            <div className={styles.innerBlock}>
              <div className={styles.rowItem}>
                <p>Год: </p>
                <p>{period.year}</p>
              </div>
              <div className={styles.rowItem}>
                <p>Месяц: </p>
                <p>{period.month}</p>
              </div>
              <div className={styles.rowItem}>
                <p>Норма часов: </p>
                <p>{period.norm}</p>
              </div>
            </div>
          </div>

          <div className={styles.zone2}>
            <h3>Сверхурочные до 7 часов</h3>
            <div className={styles.innerBlock}>
              <div className={styles.rowItem}>
                <p>Пассажирское: </p>
                <p>{period.overtime?.pass_}</p>
              </div>
              <div className={styles.rowItem}>
                <p>Грузовое: </p>
                <p>{period.overtime?.gruz}</p>
              </div>
              <div className={styles.rowItem}>
                <p>Маневровое </p>
                <p>{period.overtime?.manevr}</p>
              </div>
              <div className={styles.rowItem}>
                <p>Хозяйственное: </p>
                <p>{period.overtime?.household}</p>
              </div>
              <div className={styles.rowItem}>
                <p>Прогрев: </p>
                <p>{period.overtime?.heaters}</p>
              </div>
              <div className={styles.rowItem}>
                <p>Итого: </p>
                <p>
                  {period.overtime
                    ? Object.values(period.overtime)
                        .reduce((a, b) => a + b, 0)
                        .toFixed(2)
                    : 0}
                </p>
              </div>
            </div>
          </div>
          {period.norm}
          <button onClick={() => console.log(period.overtime.pass_)}>
            PressMe
          </button>
        </div>
      )}
    </Card>
  );
};

export default PeriodDetail;
