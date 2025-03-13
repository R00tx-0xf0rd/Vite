import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import PeriodCard from "../components/PeriodCard/PeriodCard";
import { getPeriods, setCurrentYear } from "../store/PeriodsSlice";

import Select from "../components/UI/Select/Select";
import { backend_addr } from "../helpers/constant";

const Home = () => {
  const dispatch = useDispatch();
  const { currentYear, data, error } = useSelector(
    (store) => store.periodsState
  );

  const handleSelectYearChange = (event) => {
    dispatch(setCurrentYear(event.target.value));
  };

  const year = new Date().getFullYear();
  const options = useMemo(() => {
    const options = [];
    for (let i = year - 5; i <= year; i++) {
      options.push({ value: `${i}`, label: `${i}` });
    }
    return options;
  }, [year]);

  useEffect(() => {
    const url = `http://${backend_addr}/times/year/pair/${currentYear}`;
    dispatch(getPeriods(url));
  }, [dispatch, currentYear]);

  return (
    <div className="totalCards">
      <h2 style={{ textAlign: "center", fontWeight: 600 }}>
        Доступные периоды
      </h2>
      <Select
        defaultValue={currentYear}
        options={options}
        onChange={handleSelectYearChange}
        label="Выберите год:"
      />
      {data.length > 0 ? (
        <div
          className="all-cards"
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 20,
          }}
        >
          {error && <h2>{error}</h2>}
          {data.map((period, index) => (
            <PeriodCard key={index} {...period}></PeriodCard>
          ))}
        </div>
      ) : (
        <div>
          <h3 style={{ textAlign: "center", fontWeight: 600, color: "red" }}>
            Нет доступных периодов
          </h3>
        </div>
      )}
    </div>
  );
};

export default Home;
