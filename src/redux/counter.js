import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  open: false,
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    // increment: (state) => {
    //   state.count += 1
    // },
    handleOpen: (state) => {
          state.open = true
    },
    handleClose: (state) => {
        state.open = false
  },

    // decrement: (state) => {
    //   state.count -= 1
    // },
    // incrementByAmount: (state, action) => {
    //   state.count += action.payload
    // },
  },
})

// Action creators are generated for each case reducer function
export const { handleClose, handleOpen, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer