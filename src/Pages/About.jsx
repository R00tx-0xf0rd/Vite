import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const About = () => {

  // const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.periodsState);
  console.log(loading, data);

  return (
    <div>
      <h2>About</h2>
      <Link to="/">Home</Link>
      <ul>
        {!loading && data.map((item, index) => {
          return <li key={index}>human_hours: {item.human_hours}</li>;
        })}
      </ul>
    </div>
  );
};

export default About;
