import { dataReducer } from "./user-data";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {data:dataReducer}
});
export default store;