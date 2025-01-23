import { useEffect, useState } from "react";
import PeriodCard from "../components/PeriodCard/PeriodCard";
import { backend_addr } from "../helpers/constant";

const Home = () => {
  // const year = new Date().getFullYear();
  const [year, setYear] = useState(2024);
  const [periods, setPeriods] = useState(null);
  useEffect(() => {
    fetch(`http://${backend_addr}/times/year/${year}`)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        if (data.detail) {
          setPeriods(null);
          console.log(periods);

          throw "Указанный год не существует";
        }
        setPeriods(data);
      })
      .catch((error) => console.log(error));
  }, [year]);
  const changeYear = (e) => {
    // console.log(e);
    setYear(e.target.value);
  };
  return (
    <div className="totalCards">
      <h2 style={{ textAlign: "center", fontWeight: 600 }}>
        Доступные периоды
      </h2>
      <label htmlFor="year" style={{ color: "#555", fontWeight: 700 }}>
        Год
      </label>
      <select
        name="year"
        id="year"
        onChange={changeYear}
        value={year}
        style={{
          width: 80,
          height: 30,
          margin: 10,
          textAlign: "center",
          border: "None",
          borderRadius: 8,
          backgroundColor: "#7a7a7a",
          color: "#ccc",
          fontWeight: "bold",
        }}
      >
        <option value="2025">2025</option>
        <option value="2024">2024</option>
        <option value="2023">2023</option>
        <option value="2022">2022</option>
      </select>
      {periods ? (
        <div
          className="all-cards"
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 20,
          }}
        >
          {periods.map((period, index) => (
            <PeriodCard key={index} {...period}></PeriodCard>
          ))}
        </div>
      ) : (
        <div>
          <h2 style={{ textAlign: "center", fontWeight: 600 }}>
            Нет доступных периодов
          </h2>
        </div>
      )}
    </div>
  );
};

export default Home;
