import { configureStore } from "@reduxjs/toolkit";
import periodsState from "./PeriodsSlice"

export const store = configureStore({
reducer: {
    periodsState:periodsState
}
})