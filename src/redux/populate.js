import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userData: {},
  firstName: '',
  lastName: '',
  age: '',
  occupation: '',
  stateOfOrigin: '',
};

export const populateSlice = createSlice({
  name: 'populate',
  initialState,
  reducers: {
    handlePopulate: (state, records) => {
      if (records[records.length - 1]) {
        // state.firstName = records[1].firstName;
        // state.lastName = records[1].lastName;
        // state.age = records[1].age;
        // state.occupation = records[1].occupation;
        // state.stateOfOrigin = records[1].stateOfOrigin;
        // console.log(state.firstName);
      }
    },

  },
});

// Action creators are generated for each case reducer function
export const { handlePopulate } = populateSlice.actions;

export default populateSlice.reducer;
