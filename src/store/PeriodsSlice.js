import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getPeriods = createAsyncThunk(
  "periods/getPeriods",
  async (url) => {
    try {
      // Выполняем запрос к серверу
      const response = await axios.get(url, { timeout: 2000 });

      // Проверяем статус ответа
      if (response.status >= 400) {
        throw new Error(`Request failed with status code ${response.status}`);
      }

      // Возвращаем данные в JSON формате
      return response.data;
    } catch (error) {
      // Обрабатываем ошибки
      if (error.response && error.response.status === 404) {
        throw new Error(`${error.response.status} Страница не найдена`);
      } else if (error.request && !error.response) {
        throw new Error("Нет соединения с сервером");
      } else {
        throw new Error("Неизвестная ошибка", error.message);
      }
    }
  }
);

const initialState = {
  loading: true,
  error: null,
  currentYear: new Date().getFullYear(),
  prevYear: new Date().getFullYear() - 1,
  previousData: [],
  data: [],
  previousFilteredData: [],
  filteredData: [],
};

const PeriodsSlice = createSlice({
  name: "periods",
  initialState,
  reducers: {
    setCurrentYear: (state, action) => {
      state.currentYear = +action.payload;
      state.prevYear = +action.payload - 1;
    },
    getPeriodsFromBegining: (state, action) => {
      state.filteredData = state.data.filter(
        (item) => item.month <= action.payload
      );
      state.previousFilteredData = state.previousData.filter(
        (item) => item.month <= action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPeriods.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPeriods.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.filter(
          (item) => item.year === +state.currentYear
        );
        state.previousData = action.payload.filter(
          (item) => item.year !== +state.currentYear
        );
        state.error = null;
      })
      .addCase(getPeriods.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.data = [];
      });
  },
});

export default PeriodsSlice.reducer;
export const { setCurrentYear, getPeriodsFromBegining } = PeriodsSlice.actions;
