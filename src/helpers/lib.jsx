import axios from "axios";
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
  if (indx <13 && indx >0)
  return month[indx - 1];

}

export function getParams(setFn, month = 2, year = new Date().getFullYear()) {
  let res = {}
  const url = `http://localhost:8000/times/from-begin/${month}/${year}`
  async function getFromBegin ()  {
    try {const resp = await axios.get(url);
      res = resp.data;
      // console.log(url)
      // console.log(resp.data);
      setFn(resp.data)
    }
    catch (error) {
      console.log(error.message);
      setFn(null)
    }
    
    
  }
  getFromBegin()
  return res
}


export async function myFetch(url) {
  try {
    const resp = await axios.get(url);
    return resp.data;
  } catch (error) {
    console.log(error.message);
    return null;
  }
}