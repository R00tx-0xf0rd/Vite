import { Card } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { monthStr, parsePeriod } from "../../helpers/lib";
import Modal from "../Modal/Modal";
import styles from "./styles.module.css";
import { nameOfFields } from "../../helpers/constant";

const PeriodCard = ({ ...period }) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const excludKeys = ["norm", "total_hours"];
  const obj = parsePeriod([period]);

  return (
    <>
      <Card
        className={styles["period-card"]}
        bordered={false}
        size="small"
        title={`Карточка за ${monthStr(period.month)} ${period.year} года `}
      >
        <ul>
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

        {/* <Link
            to={`detail/period/${period.month}/${period.year}`}
          >
            Подробнее...
          </Link> */}
        <Link onClick={() => setIsOpen(true)}>Подробнее</Link>
        {/* {isOpen && <MyModal month = {period.month} onClose={closeModal} />} */}
        {isOpen && (
          <Modal
            month={period.month}
            onClose={closeModal}
            header={` Детализация периода за ${monthStr(period.month)} ${
              period.year
            } года`}
          >
            {/* <h3>
              Информация о периоде {period.month}-{period.year}{" "}
            </h3> */}
            {Object.keys(obj).map((key, index) => {
              const percent = +((obj[key] / obj["hours"]) * 100);
              return (
                <div key={index} className={styles.cell}>
                  <span>{nameOfFields[key]} </span>
                  <div className={styles.dataset}>
                    <span>{obj[key]}</span>
                    {excludKeys.includes(key) ? (
                      <span></span>
                    ) : (
                      <span>
                        {((obj.total_hours * percent) / 100).toFixed(1)}
                      </span>
                    )}
                    {["norm", "hours", "total_hours"].includes(key) ? (
                      ""
                    ) : (
                      <span>{percent.toFixed(1)}%</span>
                    )}
                  </div>
                </div>
              );
            })}
          </Modal>
        )}
      </Card>
    </>
  );
};

export default PeriodCard;
