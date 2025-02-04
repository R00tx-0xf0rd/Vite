import { Card } from "antd";
import React, { useEffect } from "react";
import { month as extMonth, fetchData } from "../../helpers/lib";

import { backend_addr } from "../../helpers/constant";
import ResultsTable from "./ResultsTable";
import styles from "./styles.module.css";

const Analytics = () => {
  const [loading, setLoading] = React.useState(true);
  const [month, setMonth] = React.useState(1);
  const [year, setYear] = React.useState(2024);
  const [periods, setPeriods] = React.useState(null);

  useEffect(() => {
    // analyze();
  }, [periods]);

  useEffect(() => {
    setLoading(true);
    const url = `http://${backend_addr}/times/from-begin/${month}/${year}`;
    fetchData(url).then((result) => {
      setPeriods(result.data);
    });
    setLoading(false);
  }, [month, year]);

  const onChangeSelect = (e) => {
    setLoading(true);
    setMonth(() => e.target.value);
  };

  return (
    <Card style={{ backgroundColor: "#d4d4d4" }}>
      <h3>
        Выбранный период: с начала года по {extMonth[month - 1]} включительно
      </h3>
      <select onChange={onChangeSelect} name="month" id="">
        {extMonth.map((item, index) => (
          <option key={index + 1} value={index + 1}>
            {item}
          </option>
        ))}
      </select>
      {loading ? (
        <p>loading...</p>
      ) : (
        <div className={styles.grid}>
          <div className={styles.zone1}>
            <ResultsTable periods={periods} />
          </div>
          <div className={styles.zone2}></div>
          <div className={styles.zone3}></div>
        </div>
      )}
    </Card>
  );
};

export default Analytics;
