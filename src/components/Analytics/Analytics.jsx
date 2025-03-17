import { Card } from "antd";
import React, { useEffect, useMemo } from "react";
import { analyze, month as extMonth, month } from "../../helpers/lib";
import styles from "./styles.module.css";

import { useDispatch, useSelector } from "react-redux";
import { filterPeriods } from "../../store/PeriodsSlice";
import Select from "../UI/Select/Select";
import ResultsTable from "./ResultsTable";

const Analytics = () => {
  const loading = false;
  const [lastMonth, setLastMonth] = React.useState(1);
  const [filterType, setFilterType] = React.useState(0);

  const dispatch = useDispatch();
  const { prevYear, currentYear, filteredData, previousFilteredData } =
    useSelector((state) => state.periodsState);

  useEffect(() => {
    dispatch(filterPeriods({lastMonth, filterType}));
  }, [dispatch, lastMonth, filterType]);

  const onChangeSelect = (e) => {
    setLastMonth(e.target.value);
  };

  const changeFilter = (e) => {
    setFilterType(e.target.value);
  };

  const comparePeriods = useMemo(() => {
    if (filteredData.length === 0) return;
    const prevPeriod = analyze(previousFilteredData);
    const currentPeriod = analyze(filteredData);
    for (let key in currentPeriod) {
      if (["norm", "hours", "total_hours"].includes(key)) {
        continue;
      }
      const currentPercent =
        currentPeriod["total_hours"] *
        (currentPeriod[key] / currentPeriod["hours"]);
      const prevPercent =
        prevPeriod["total_hours"] * (prevPeriod[key] / prevPeriod["hours"]);
      // console.log(key, prevPercent.toFixed(1), currentPercent.toFixed(1));
    }

    // console.log(prevPeriod, currentPeriod);
  }, [filteredData, previousFilteredData]);

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
        Сравнительный анализ {prevYear}, {currentYear} годов ( с начала года по{" "}
        {extMonth[lastMonth - 1]} включительно)
      </h3>
      <Select
        defaultValue={1}
        onChange={onChangeSelect}
        options={monthArr}
        label="Месяц года:"
      />
      <input type="radio" value={0} defaultChecked name="filter" onClick={changeFilter} />
      {"From beginning of year"}
      <input type="radio" value={1} name="filter" onClick={changeFilter} />
      {"From same month of previous year"}
      {loading ? (
        <p>loading...</p>
      ) : (
        <div className={styles.grid}>
          <div className={styles.zone2}>
            {filteredData.length > 0 && (
              <ResultsTable periods={filteredData} year={currentYear} />
            )}
          </div>
          <div className={styles.zone1}>
            {previousFilteredData.length > 0 && (
              <ResultsTable periods={previousFilteredData} year={prevYear} />
            )}
          </div>

          <div className={styles.zone3}></div>
        </div>
      )}
    </Card>
  );
};

export default Analytics;
