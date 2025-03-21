import { Link, Outlet } from "react-router-dom";

const Layer = () => {
  // console.log('layer rendered');
  
  return (
    <div className="wrap">
      <header className = "header">
          {/* <div className="card">{additional.k1}</div> */}
          {/* <h2>Year:{year}</h2> */}
        <ul style={{ display: "flex", listStyle: "none", gap: "10px", alignItems:'center', fontWeight:900  }}>
          <li>
            <Link to="/">Главная</Link>
          </li>
          <li>
            <Link to="tables">Таблицы</Link>
          </li>
          <li>
            <Link to="add">Добавить период</Link>
          </li>
          <li>
            <Link to="analytics">Анализ работы</Link>
          </li>
          <li>
            <Link to="about">О программе</Link>
          </li>
        </ul>
      <aside className="left-menu"></aside>
      </header>
      <Outlet />
      <footer>@ all right reserved 2025</footer>
    </div>
  );
};

export default Layer;
