import { createSlice } from '@reduxjs/toolkit';


export const populateSlice = createSlice({
  name: 'populate',
  initialState: {value: []},
  reducers: {
    handlePopulate: (state, action) => {
      state.value.push(action.payload)
      // console.log(state.value)
    },

    deleteProduct: (state, action) => {
            console.log(state.value)
            state.value = state.value.filter((product) => product.id !== action.payload.id)
            console.log(state.value)
    },

    updateProduct: (state, action) => {
            state.value.map(user => {
                if (user.id == action.payload.id){
                    user.title = action.payload.title;
                    user.title = action.payload.price;
                    user.title = action.payload.description;
                    user.title = action.payload.category;
                    user.title = action.payload.image;
                    
                }
            })
        }

  },
});

// Action creators are generated for each case reducer function
export const { handlePopulate, deleteProduct, updateProduct } = populateSlice.actions;

export default populateSlice.reducer;
