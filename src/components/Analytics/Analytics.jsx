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
    const sumObj = { norm: 0,  human_hours:0};
    periods.forEach((element) => {
      console.log(element);
      sumObj.norm += element.norm;
      sumObj.human_hours += element.human_hours*element.norm;
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
