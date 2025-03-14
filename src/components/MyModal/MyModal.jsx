import { useSelector } from "react-redux";
import { month as monthName } from "../../helpers/lib";
import styles from "./styles.module.css";

const MyModal = ({ month, onClose }) => {
  const period = useSelector((state) =>
    state.periodsState.data.find((item) => item.month === month)
  );
  console.log(period);

  const tableData = {
    // Месяц: monthName[period.month - 1],
    Норма: period.norm,
    "Недостаток человек": period.human_hours,
    "Следование пассажиром": period.pass_follow,
    "Следование резервом": period.rez_follow,
    "Простой в ожидании": period.wait_follow,
    "Очередной отпуск": period.vacations,
    "Болезнь свыше нормы": period.diseases,
    "Отвлечение в депо": period.distractions,
    Командировки: period.business_trips,
    "Вне депо": period.outside_depots,
    Дублеры: period.doublers,
    "Учебный отпуск": period.training_vacations,
    "Сверхурочные до 7 часов:": "",
    "": "",
    Пассажирское: period.overtime.pass_,
    Грузовое: period.overtime.gruz,
    Маневровое: period.overtime.manevr,
    Хозяйственное: period.overtime.household,
    Прогрев: period.overtime.heaters,
    "Всего, (до 7 часов)": Object.values(period.overtime)
      .reduce((acc, item) => acc + item, 0)
      .toFixed(2),
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.modal}>
        <div className={styles["modal-content"]}>
          <div className={styles.header}>
            <h3>
              Детализация периода за {monthName[period.month - 1]} {period.year}{" "}
              года
            </h3>
            <div className={styles.closeBtn} onClick={() => onClose()}>
              &#10006;
            </div>
          </div>
          <div className={styles["modal-body"]}>
            {Object.keys(tableData).map((key, index) => {
              return (
                <div key={index} className={styles.cell}>
                  <span>{key} </span>
                  <span>{tableData[key]}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyModal;
