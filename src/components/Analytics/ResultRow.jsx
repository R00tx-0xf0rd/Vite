import styles from "./styles.module.css";

const ResultRow = ({ label, value, hours, total_hours }) => {
  const percent = ((value / hours) * 100).toFixed(1);
  const relatedHours = ((value / hours) * total_hours).toFixed(1);

  return (
    <div className={styles.rowItem}>
      <p>{label}: </p>
      <p>
        {value}
        <span>/ {percent}%</span>
        <span>/ {relatedHours}</span>
      </p>
    </div>
  );
};

export default ResultRow;
