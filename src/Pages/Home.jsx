import { useEffect, useState } from "react";
import PeriodCard from "../components/PeriodCard/PeriodCard";

const Home = () => {
  const [periods, setPeriods] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8000/times/all-times")
      .then((response) => response.json())
      .then((data) => setPeriods(data));
  }, []);
  return (
    <div className="totalCards" style={{ overflowY: "scroll" }}>
      <h3>Доступные периоды</h3>

      <div
        className="all-cards"
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
          gap: 20,
        }}
      >
        {periods.map((period, index) => (
          <PeriodCard key={index} {...period}></PeriodCard>
        ))}
      </div>
    </div>
  );
};

export default Home;
