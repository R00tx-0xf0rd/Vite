import axios from "axios";
import { backend_addr } from "./constant";

export const month = [
  "январь",
  "февраль",
  "март",
  "апрель",
  "май",
  "июнь",
  "июль",
  "август",
  "сентябрь",
  "октябрь",
  "ноябрь",
  "декабрь",
];
export function monthStr(indx) {
  if (indx < 13 && indx > 0) return month[indx - 1];
  return month[0];
}

export async function fetchData(url) {
  try {
      const response = await axios.get(url);
      
      if (response.status >= 400) {
          throw new Error(`Request failed with status code ${response.status}`);
      }

      return { data: response.data };
  } catch (error) {
      return { error: error.message || 'An unknown error occurred.' };
  }
}

export function getParams(setFn, month = 2, year = new Date().getFullYear()) {
  let res = {};
  const url = `http://${backend_addr}/times/from-begin/${month}/${year}`;
  async function getFromBegin() {
    try {
      const resp = await axios.get(url);
      res = await resp.data;
      // console.log(url)
      // console.log(resp.data);
      setFn(resp.data);
    } catch (error) {
      console.log(error.message);
      setFn(null);
    }
  }
  getFromBegin();
  return res;
}

export function getPercentage(left, right, total) {
  const percent = ((left / right) * 100).toFixed(1);
  const hours = ((left / right) * total).toFixed(1);
  return [percent, hours];
}
