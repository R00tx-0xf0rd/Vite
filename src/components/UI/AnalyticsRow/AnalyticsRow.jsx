import { getPercentage } from "../../../helpers/lib";
import styles from "./styles.module.css";

const AnalyticsRow = ({...props} ) => {
  console.log(props.values);
  
  return (
    <div className={styles.rowItem}>
      <div className={styles.cell}>{props.header}</div>
      {/* <div className={styles.cell}>{props.values.human_hours}</div> */}
      {props.values.map((item, index) => <div key={index} className={styles.cell}>{item}</div>)}
      {/* <div className={styles.cell}>
        {
          getPercentage(
            props.human_hours,
            props.hours,
            props.total_hours
          )[0]
        }
        %
      </div>
      <div className={styles.cell}>
        {
          getPercentage(
            props.human_hours,
            props.hours,
            props.total_hours
          )[1]
        }
      </div> */}
    </div>
  );
};

export default AnalyticsRow;
