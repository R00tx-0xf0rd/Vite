import { Route, Routes } from "react-router-dom";
import "./App.css";
import Analytics from "./components/Analytics/Analytics";
import Layer from "./components/Layout";
import PeriodDetail from "./components/PeriodDetail/PeriodDetail";
import TimesForm from "./components/TimesForm/TimesForm";
import About from "./Pages/About";
import Home from "./Pages/Home";
import NotFound from "./Pages/NotFound";
import Tables from "./Pages/Tables";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setCurrentYear } from "./store/PeriodsSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setCurrentYear(new Date().getFullYear()));
    // dispatch(getPeriods(new Date().getFullYear()))
  }, [dispatch]);

  return (
    <>
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
            // element={<Tables isLoading={loading} periods={periods} />}
            element={<Tables />}
          />
          <Route path="analytics" element={<Analytics />} />
          <Route path="detail/period/:month/:year" element={<PeriodDetail />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
