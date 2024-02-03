import { createSlice } from "@reduxjs/toolkit";

const LangueSice = createSlice({
  name: "Langue",
  initialState: {
    choice:"eng"
  },
  reducers:{
    change_lang : (state,action)=>{
        state.choice = action.payload
    }
  }
});
export const {change_lang}=LangueSice.actions
export default LangueSice.reducer
