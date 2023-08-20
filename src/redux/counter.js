import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    open: false
};

export const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        handleOpen: (state) => {
            const varOpen = state;
            varOpen.open = true;
        },
        handleClose: (state) => {
            const varClose = state;
            varClose.open = false;
        }
    }
});

// Action creators are generated for each case reducer function
export const { handleClose, handleOpen } = counterSlice.actions;

export default counterSlice.reducer;
