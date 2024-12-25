import { Card, Spin } from "antd";
import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { monthStr } from "../../helpers/lib";
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
  const {
    norm,
    human_hours,
    pass_follow,
    rez_follow,
    wait_follow,
    less7,
    vacations,
    diseases,
    distractions,
    outside_depots,
    business_trips,
    doublers,
    training_vacations
  } = period;

  const totalHours =
    human_hours * norm +
    pass_follow +
    rez_follow +
    wait_follow +
    less7 +
    vacations * norm +
    diseases * norm +
    distractions * norm +
    business_trips * norm +
    outside_depots * norm +
    doublers * norm +
    training_vacations * norm;

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
                <p>{monthStr(period.month)}</p>
              </div>
              {/* <div className={styles.rowItem}>
                <p>Норма часов: </p>
                <p>{period.norm}</p>
              </div> */}
              <div className={styles.rowItem}>
                <p>Недостаток человек: </p>
                <p>{human_hours}<span> / {(human_hours * norm*100/totalHours).toFixed(1)}%</span></p>
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
          <div className={styles.zone3}>
            <h3>Различные виды следования</h3>
            <div className={styles.innerBlock}>
              <div className={styles.rowItem}>
                <p>Следование пассажиром: </p>
                <p>{period.pass_follow}<span> / {(pass_follow/totalHours*100).toFixed(1)}%</span></p>
              </div>
              <div className={styles.rowItem}>
                <p>Следование резервом: </p>
                <p>{period.rez_follow}<span> / {(rez_follow/totalHours*100).toFixed(1)}%</span></p>
              </div>
              <div className={styles.rowItem}>
                <p>Простой в ожидании: </p>
                <p>{period.wait_follow}<span> / {(wait_follow/totalHours*100).toFixed(1)}%</span></p>
              </div>
            </div>
          </div>
          <div className={styles.zone4}>
            <h3>Разное</h3>
            <div className={styles.innerBlock}>
              <div className={styles.rowItem}>
                <p>Графиковые (до 7 часов)</p>
                <p>{period.less7?.toFixed(2)}<span> / {(less7 * 100/totalHours).toFixed(1)}%</span></p>
              </div>
              <div className={styles.rowItem}>
                <p>Очередной отпуск</p>
                <p>{period.vacations}<span> / {(vacations * norm*100/totalHours).toFixed(1)}%</span></p>
              </div>
              <div className={styles.rowItem}>
                <p>Болезнь свыше нормы: </p>
                <p>{period.diseases}<span> / {(diseases * norm*100/totalHours).toFixed(1)}%</span></p>
              </div>
              <div className={styles.rowItem}>
                <p>Отвлечение в депо: </p>
                <p>{period.distractions}<span> / {(distractions * norm*100/totalHours).toFixed(1)}%</span></p>
              </div>
              <div className={styles.rowItem}>
                <p>Командировки: </p>
                <p>{period.business_trips}<span> / {(business_trips * norm*100/totalHours).toFixed(1)}%</span></p>
              </div>
              <div className={styles.rowItem}>
                <p>Вне депо: </p>
                <p>{period.outside_depots}<span> / {(outside_depots * norm*100/totalHours).toFixed(1)}%</span></p>
              </div>
              <div className={styles.rowItem}>
                <p>Дублеры:</p>
                <p>{period.doublers}<span> / {(doublers * norm*100/totalHours).toFixed(1)}%</span></p>
              </div>
              <div className={styles.rowItem}>
                <p>Учебный отпуск: </p>
                <p>{period.training_vacations}<span> / {(training_vacations * norm*100/totalHours).toFixed(1)}%</span></p>
              </div>
              <div className={styles.rowItem}>
                <p>Total: </p>
                <p>{totalHours}</p>
              </div>
            </div>
          </div>
          <button onClick={() => console.log(period.overtime.pass_)}>
            PressMe
          </button>
        </div>
      )}
    </Card>
  );
};

export default PeriodDetail;
