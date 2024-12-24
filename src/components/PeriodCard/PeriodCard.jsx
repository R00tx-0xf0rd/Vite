import { Card } from "antd";
// import React from 'react'
import { monthStr } from "../../helpers/lib";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";

const PeriodCard = ({ ...period }) => {
  // console.log({period});

  return (
    <>
      <Card
        className={styles["period-card"]}
        bordered={false}
        size="small"
        title={`Карточка за ${monthStr(period.month)} ${period.year} года `}
      >
        <ul>
          {/* <li>Год: {period.year}</li>
          <li>Месяц: {monthStr(period.month)}</li> */}
          <li>
            Норма часов: <span>{period.norm}</span>
          </li>
          <li>
            Всего часов: <span>{period.total_hours}</span>
          </li>
          <li>
            Недостаток человек: <span>{period.human_hours}</span>
          </li>
        </ul>
        
          <Link
            to={`detail/period/${period.month}/${period.year}`}
          >
            Подробнее...
          </Link>
        
      </Card>
    </>
  );
};

export default PeriodCard;
