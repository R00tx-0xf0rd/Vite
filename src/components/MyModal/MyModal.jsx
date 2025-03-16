import { useSelector } from "react-redux";
import { analyze, monthStr } from "../../helpers/lib";
import { nameOfFields } from "./../../helpers/constant";
import styles from "./styles.module.css";

const MyModal = ({ month, onClose }) => {
  const period = useSelector((state) =>
    state.periodsState.data.find((item) => item.month === month)
  );

  const excludKeys = ["norm", "total_hours"];
  const obj = analyze([period]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.modal}>
        <div className={styles["modal-content"]}>
          <div className={styles.header}>
            <h3>
              Детализация периода за {monthStr(period.month)} {period.year} года
            </h3>
            <div className={styles.closeBtn} onClick={() => onClose()}>
              &#10006;
            </div>
          </div>
          <div className={styles["modal-body"]}>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyModal;
