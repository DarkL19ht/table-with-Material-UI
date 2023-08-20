import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter";
import populateReducer from "./populate";

const store = configureStore({
    reducer: {
        counter: counterReducer,
        populate: populateReducer
    }
});

export default store;
