import React, { useEffect } from "react";
import { month as extMonth, getParams } from "../../helpers/lib";

const Analytics = () => {
  const [month, setMonth] = React.useState(1);
  const [periods, setPeriods] = React.useState(null);
  // useEffect(() => {
  //   setMonth(extMonth);
  // }, []);
  useEffect(() => {
    getParams(setPeriods, month, 2024);
  }, [periods, month]);
  const handleClick = () => {
    getParams(setPeriods, month, 2024);
    const norm = analyze();
    console.log(norm);
  };

  const onChangeSelect = (e) => {
    setMonth(e.target.value);
  };

  const analyze = () => {
    const sumObj = {
      norm: 0,
      human_hours: 0,
      pass_follow: 0,
      rez_follow: 0,
      wait_follow: 0,
      less7:0,
      vacations:0,
      diseases:0,
      distractions:0,
      outside_depots:0,
      business_trips:0,
      doublers:0,
      training_vacations:0
    };
    periods.forEach((element) => {
      const {
        norm,
        human_hours,
        pass_follow,
        rez_follow,
        wait_follow,
        less7,
        vacations,
        diseases,
        distractions,
        outside_depots,
        business_trips,
        doublers,
        training_vacations,
      } = element;
      console.log(element);
      sumObj.norm += norm;
      sumObj.human_hours += human_hours * norm;
      sumObj.pass_follow += pass_follow;
      sumObj.rez_follow += rez_follow;
      sumObj.wait_follow += wait_follow;
    });
    return sumObj;
  };

  return (
    <div>
      <h3>Period</h3>
      <select onChange={onChangeSelect} name="month" id="">
        {extMonth.map((item, index) => (
          <option key={index + 1} value={index + 1}>
            {item}
          </option>
        ))}
      </select>
      <ul>
        {periods?.map((element, indx) => (
          <li key={indx}>{element.norm}</li>
        ))}
      </ul>
      <button onClick={() => handleClick()}>get dates</button>
    </div>
  );
};

export default Analytics;
