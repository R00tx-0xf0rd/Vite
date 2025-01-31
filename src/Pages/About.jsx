import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchData, monthStr } from "../helpers/lib";
import { backend_addr } from "../helpers/constant";

const About = () => {
  const [users, setUsers] = useState([]);

  const url = `http://${backend_addr}/times/year/2024`;
  // const url = "https://jsonplaceholder.typicode.com/users";

  async function getData(_url) {
    const result = await fetchData(_url);

    if (result.error) {
      console.error(result.error);
    } else {
      console.log(result.data); // Данные в формате JSON
      setUsers(result.data);
    }
  }

  useEffect(() => {
    getData(url);
  }, []);

  return (
    <div>
      <h2>About</h2>
      <ul>
        {users.map((item, index) => {
          return (
            <li key={index}>
              month: {monthStr(item.month)} norm: {item.norm}
            </li>
          );
        })}
      </ul>
      <Link to="/">Home</Link>
    </div>
  );
};

export default About;
