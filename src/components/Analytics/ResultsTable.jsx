import { useSelector } from "react-redux";
import { analyze } from "../../helpers/lib";
import ResultRow from "./ResultRow";
import styles from "./styles.module.css";

const ResultsTable = ({ periods }) => {
  const {currentYear} = useSelector(state => state.periodsState);
  if (!periods) return null;
  const summary = analyze(periods);
  const { hours, total_hours, ...otherData } = summary;


  return (
    <div>
      <h3>Текущий год:{currentYear}</h3>
      <div className={styles.innerBlock}>
        <div className={styles.rowItem}>
          <div className={styles.cell}>Норма часов: </div>
          <div className={styles.cell}>{summary.norm}</div>
        </div>
        <ResultRow
          label={"Нехватка человек:"}
          value={otherData.human_hours}
          hours={hours}
          total_hours={total_hours}
        />
        <ResultRow
          label="Следование пассажиром"
          value={otherData.pass_follow}
          hours={hours}
          total_hours={total_hours}
        />
        <ResultRow
          label="Следование резервом"
          value={otherData.rez_follow}
          hours={hours}
          total_hours={total_hours}
        />
        <ResultRow
          label="Ожидание следования"
          value={otherData.wait_follow}
          hours={hours}
          total_hours={total_hours}
        />
        <ResultRow
          label="Графиковые (до 7 часов)"
          value={otherData.less7}
          hours={hours}
          total_hours={total_hours}
        />
        <ResultRow
          label="Очередной отпуск"
          value={otherData.vacations}
          hours={hours}
          total_hours={total_hours}
        />
        <ResultRow
          label="Болезнь свыше нормы"
          value={otherData.diseases}
          hours={hours}
          total_hours={total_hours}
        />
        <ResultRow
          label="Отвлечение в депо"
          value={otherData.distractions}
          hours={hours}
          total_hours={total_hours}
        />
        <ResultRow
          label="Командировки"
          value={otherData.business_trips}
          hours={hours}
          total_hours={total_hours}
        />
      </div>
    </div>
  );
};

export default ResultsTable;
