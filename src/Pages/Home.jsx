// import { useEffect } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PeriodCard from "../components/PeriodCard/PeriodCard";
import { getPeriods } from "../store/PeriodsSlice";
import MySelect from "./../components/UI/MySelect/MySelect";

const Home = () => {
  const dispatch = useDispatch();
  const { currentYear, data, error } = useSelector(
    (store) => store.periodsState
  );

  useEffect(() => {
    // console.log("effect is called");
    // console.log(currentYear);
    dispatch(getPeriods(currentYear));
  }, [ dispatch, currentYear]);

  return (
    <div className="totalCards">
      <h2 style={{ textAlign: "center", fontWeight: 600 }}>
        Доступные периоды
      </h2>
      <MySelect label={"Текущий период"} />
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
