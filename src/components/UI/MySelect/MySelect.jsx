import { useDispatch } from "react-redux";
import styles from "./styles.module.css";
import { setCurrentYear } from "../../../store/PeriodsSlice";

import { useMemo } from "react";

const MySelect = ({ label }) => {
  const dispatch = useDispatch();
  const currentYear = new Date().getFullYear();

  const selectItems = useMemo(() => {
    const startYear = currentYear - 5;
    const items = [];

    for (let i = startYear; i <= currentYear; i++) {
      items.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }

    return items;
  }, [currentYear]);

  console.log("select rendered");

  return (
    <div>
      <label htmlFor="select">{label}</label>
      <select
        className={styles.selectField}
        name="select"
        defaultValue={currentYear}
        onChange={(arg) => {
          dispatch(setCurrentYear(arg.target.value));
        }}
      >
        {selectItems}
      </select>
    </div>
  );
};

export default MySelect;
