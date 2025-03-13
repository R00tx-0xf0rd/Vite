import { Card } from "antd";
import React, { useEffect, useMemo } from "react";
import { month as extMonth, month } from "../../helpers/lib";
import styles from "./styles.module.css";

import { useDispatch, useSelector } from "react-redux";
import { getPeriodsFromBegining } from "../../store/PeriodsSlice";
import Select from "../UI/Select/Select";
import ResultsTable from "./ResultsTable";

const Analytics = () => {
  const loading = false;
  const [lastMonth, setLastMonth] = React.useState(1);

  const dispatch = useDispatch();
  const { currentYear, filteredData } = useSelector(
    (state) => state.periodsState
  );

  useEffect(() => {
    dispatch(getPeriodsFromBegining(lastMonth));
  }, [dispatch, lastMonth]);

  const onChangeSelect = (e) => {
    setLastMonth(e.target.value);
  };

  const monthArr = useMemo(() => {
    const monthData = [];
    month.forEach((item, index) => {
      monthData.push({ value: `${index + 1}`, label: `${item}` });
    });
    return monthData;
  }, []);

  return (
    <Card style={{ backgroundColor: "#d4d4d4" }}>
      <h3>
        Выбранный период: с начала {currentYear} года по{" "}
        {extMonth[lastMonth - 1]} включительно
      </h3>
      <Select defaultValue={1} onChange={onChangeSelect} options={monthArr} label="Месяц года:" />
      {loading ? (
        <p>loading...</p>
      ) : (
        <div className={styles.grid}>
          <div className={styles.zone1}>
            {filteredData.length > 0 && <ResultsTable periods={filteredData} />}
          </div>
          <div className={styles.zone2}></div>
          <div className={styles.zone3}></div>
        </div>
      )}
    </Card>
  );
};

export default Analytics;
