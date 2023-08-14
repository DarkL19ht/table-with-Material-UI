import { createSlice } from '@reduxjs/toolkit';

export const populateSlice = createSlice({
  name: 'populate',
  initialState: { value: [] },
  reducers: {
    handlePopulate: (state, action) => {
      state.value.push(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { handlePopulate, } = populateSlice.actions;

export default populateSlice.reducer;
