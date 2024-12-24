import axios from "axios";
import { useActionState } from "react";
import styles from "./styles.module.css";
import MyModal from "../MyModal/MyModal";

const TimesForm = () => {
  const [state, submitAction] = useActionState(setPeriod, {
    data: null,
    error: null,
  });
  // const date = new Date().getFullYear().toString() + "-01";

  async function setPeriod(prevState, formData) {
    // formData.preventDefault
    const keys = [...formData.keys()];
    const data = {};
    keys.forEach((key) => {
      data[key] = formData.get(key);
    });
    const [year, month] = data["dt"].split("-");
    data["year"] = year;
    data["month"] = month;
    delete data.dt;
    // console.log(data);
    try {
      const response = await axios.post(
        "http://localhost:8000/times/period/",
        data,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      console.log(typeof response.data, state);
      return { data: response.data, error: null };
    } catch (e) {
      console.log(e.message);
      return { ...prevState, error: e.message };
    }
  }

  return (
    <div>
      {!state.data && (
        <div className={styles.wrapper}>
          <h3>Добавление данных в БД</h3>
          <MyModal/>
          <form action={submitAction}>
            <fieldset className={styles.group}>
              <legend> Общие данные</legend>
              <div className={styles.formItem}>
                <label htmlFor="dt">Месяц/год</label>
                <input type="month" name="dt" id="dt" />
              </div>
              <div className={styles.formItem}>
                <label htmlFor="norm">Норма часов</label>
                <input type="text" name="norm" id="norm" />
              </div>
              <div className={styles.formItem}>
                <label htmlFor="total_hours">Всего часов</label>
                <input type="text" name="total_hours" id="total_hours" />
              </div>
              <div className={styles.formItem}>
                <label htmlFor="human_hours">Недостаток человек</label>
                <input type="text" name="human_hours" id="human_hours" />
              </div>
            </fieldset>
            <fieldset className={styles.group}>
              <legend>Следование различными видами движения</legend>
              <div className={styles.formItem}>
                <label htmlFor="pass_follow">Следование пассажиром</label>
                <input type="text" name="pass_follow" id="pass_follow" />
              </div>
              <div className={styles.formItem}>
                <label htmlFor="rez_follow">Следование резервом</label>
                <input type="text" name="rez_follow" id="rez_follow" />
              </div>
              <div className={styles.formItem}>
                <label htmlFor="wait_follow">Ожидание простоя</label>
                <input type="text" name="wait_follow" id="wait_follow" />
              </div>
            </fieldset>
            <fieldset className={styles.group}>
              <legend>Разное</legend>
              <div className={styles.formItem}>
                <label htmlFor="vacations">Очередной отпуск</label>
                <input type="text" name="vacations" id="vacations" />
              </div>
              <div className={styles.formItem}>
                <label htmlFor="diseases">По болезни</label>
                <input type="text" name="diseases" id="diseases" />
              </div>
              <div className={styles.formItem}>
                <label htmlFor="distractions">Депо, отвлечения</label>
                <input type="text" name="distractions" id="distractions" />
              </div>
              <div className={styles.formItem}>
                <label htmlFor="business_trips">Командировки</label>
                <input type="text" name="business_trips" id="business_trips" />
              </div>
              <div className={styles.formItem}>
                <label htmlFor="outside_depots">Вне депо</label>
                <input type="text" name="outside_depots" id="outside_depots" />
              </div>
              <div className={styles.formItem}>
                <label htmlFor="doublers">Дублеры</label>
                <input type="text" name="doublers" id="doublers" />
              </div>
              <div className={styles.formItem}>
                <label htmlFor="training_vacations">Учебный отпуск</label>
                <input
                  type="text"
                  name="training_vacations"
                  id="training_vacations"
                />
              </div>
            </fieldset>
            <fieldset className={styles.group}>
              <legend>Сверхурочные до 7 часов</legend>
              <div className={styles.formItem}>
                <label htmlFor="pass_">Пассажирское</label>
                <input type="text" name="pass_" id="pass_" />
              </div>
              <div className={styles.formItem}>
                <label htmlFor="gruz">Грузовое</label>
                <input type="text" name="gruz" id="gruz" />
              </div>
              <div className={styles.formItem}>
                <label htmlFor="manevr">Маневровое</label>
                <input type="text" name="manevr" id="manevr" />
              </div>
              <div className={styles.formItem}>
                <label htmlFor="household ">Хозяйственное</label>
                <input type="text" name="household " id="household " />
              </div>
              <div className={styles.formItem}>
                <label htmlFor="heaters">Прогрев</label>
                <input type="text" name="heaters" id="heaters" />
              </div>
            </fieldset>
            {state.error && (
              <div className={styles.error}>Ошибка: {state.error}</div>
            )}
            <div>
              <button>Создать</button>
            </div>
          </form>
        </div>
      )}
      {state.data && (
        <p>
          Данные на {state.data.year}_g {state.data.month}_m успешно добавлены
        </p>
      )}
    </div>
  );
};

export default TimesForm;
