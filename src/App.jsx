import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Layer from "./components/Layout";
import About from "./Pages/About";
import Home from "./Pages/Home";
import NotFound from "./Pages/NotFound";
import Tables from "./Pages/Tables";
import TimesForm from "./components/TimesForm/TimesForm";
import PeriodDetail from "./components/PeriodDetail/PeriodDetail";

function App() {
  const [periods, setPeriods] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getPeriods = async () => {
      const year = new Date().getFullYear();
      // console.log(year)
      const url = `http://localhost:8000/times/year/${year}`;
      setLoading(true);
      try {
        const response = await axios.get(url);
        setPeriods(response.data);
        setLoading(false);
      } catch (e) {
        console.log(e.message);
      }
    };
    getPeriods();
  }, []);

  return (
    <>
      <Link to="http://localhost:8000/times/year/2024">Home</Link>

      <Routes>
        <Route
          path="/"
          element={
            <Layer
              year={new Date().getFullYear()}
              additional={{ k1: 10, k2: 20, k3: "hello" }}
            />
          }
        >
          <Route index element={<Home />} />
          <Route path="add" element={<TimesForm />} />
          <Route
            path="tables"
            element={<Tables isLoading={loading} periods={periods} />}
          />
          <Route path="detail/period/:month/:year" element={<PeriodDetail/>} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
