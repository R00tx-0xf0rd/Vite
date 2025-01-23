import React from "react";
import { ROW_NAMES } from "../../../helpers/constant";
import { getPercentage } from "../../../helpers/lib";
import styles from "../../Analytics/styles.module.css";
import { RowItem } from "../RowItem/RowItem";

const TableItems = ({ year, summary, children, ...props }) => {
  const arr = Array.from(Object.keys(summary));
  console.log(props);
  return (
    <>
      <h3>Год: {year}</h3>
      <div className={styles.innerBlock}>
        {arr.map((item, index) => {
          console.log(item);
          return (
            <RowItem key={index} ks={item} val={summary[item]}>
              <div className={styles.rowItem}>
                <div className={styles.cell}>{ROW_NAMES[index]}</div>
                <div className={styles.cell}>{summary[item]}</div>
                <div className={styles.cell}>
                  {
                    getPercentage(
                      summary[item],
                      summary.hours,
                      summary.total_hours
                    )[0]
                  }
                  %
                </div>
                <div className={styles.cell}>
                  {
                    getPercentage(
                      summary[item],
                      summary.hours,
                      summary.total_hours
                    )[1]
                  }
                </div>
              </div>
            </RowItem>
          );
          // Object.entries(summary).forEach((item, index) => {
          //   console.log(JSON.stringify(item))
          //   return <RowItem key={index} param = {item}><p>kjdkj</p></RowItem>;
        })}
      </div>
    </>
  );
};

export default TableItems;
