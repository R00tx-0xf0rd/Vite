import { ConfigProvider, Table } from "antd";
import { monthStr } from "../helpers/lib";
// import React from "react";

const Tables = ({ isLoading, periods }) => {
  const columns = [
    {
      title: "Месяц",
      dataIndex: "month",
      key: "month",
    },
    {
      title: "Норма",
      dataIndex: "norm",
      key: "norm",
      align: "center",
    },
    {
      title: "Недостаток",
      dataIndex: "hh",
      key: "hh",
    },
    {
      title: "Пассажиром",
      dataIndex: "pass_follow",
      key: "pass_follow",
    },
    {
      title: "Резервом",
      dataIndex: "rez_follow",
      key: "rez_follow",
    },
    {
      title: "Ожидание",
      dataIndex: "wait_follow",
      key: "wait_follow",
    },
    {
      title: "Графиковые",
      children: [
        {
          title: "Пассажирское",
          dataIndex: "pass_",
          key: "pass_",
        },
        {
          title: "Грузовое",
          dataIndex: "gruz",
          key: "gruz",
        },
        {
          title: "Маневровое",
          dataIndex: "manevr",
          key: "manevr",
        },
        {
          title: "Хозяйственное",
          dataIndex: "household",
          key: "household",
        },
        {
          title: "Прогрев",
          dataIndex: "heaters",
          key: "heaters",
        },
      ],
    },
    {
      title: "Отпуск",
      dataIndex: "vacations",
      key: "vacations",
    },
    {
      title: "Болезнь",
      dataIndex: "diseases",
      key: "diseases",
    },
    {
      title: "Отвлечение",
      dataIndex: "distractions",
      key: "distractions",
    },
    {
      title: "Командировки",
      dataIndex: "business_trips",
      key: "business_trips",
    },
    {
      title: "Вне депо",
      dataIndex: "outside_depots",
      key: "outside_depots",
    },
    {
      title: "Дублеры",
      dataIndex: "doublers",
      key: "doublers",
    },
    {
      title: "Учебный отпуск",
      dataIndex: "training_vacations",
      key: "training_vacations",
    },
  ];
  const dataSource = [];
  isLoading ? (
    <h4>loading...Please wait</h4>
  ) : (
    periods.map((period) => {
      dataSource.push({
        key: period.month,
        ...period,
        month: monthStr(period.month),
        hh: period.norm * period.human_hours,
        ...period.overtime,
      });
    })
  );

  return (
    <div>
      <h2>Основные временные показатели работы локомотивных бригад за год</h2>
      <ConfigProvider
        theme={{
          token: {
            // Seed Token
            colorPrimary: "#00b96b",
            borderRadius: 20,

            // Alias Token
            rowSelectedHoverBg: "#ccc",
          },
        }}
      >
        <Table size="middle" dataSource={dataSource} columns={columns} />
      </ConfigProvider>
    </div>
  );
};

export default Tables;
