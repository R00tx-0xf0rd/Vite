import { Card } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { monthStr } from "../../helpers/lib";
import MyModal from "../MyModal/MyModal";
import styles from "./styles.module.css";

const PeriodCard = ({ ...period }) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (isOpen && !event.target.closest('.modal')) {
        closeModal();
      }
    };

    window.addEventListener('mousedown', handleOutsideClick);

    return () => {
      window.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

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
        {isOpen && <MyModal month = {period.month} onClose={closeModal} />}
      </Card>
    </>
  );
};

export default PeriodCard;
