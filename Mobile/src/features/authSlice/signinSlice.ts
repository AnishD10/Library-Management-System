import { ISignInForm } from "@/src/interfaces";
import { createSlice } from "@reduxjs/toolkit";

const initialState: ISignInForm = {
  username: "",
  password: "",
  saveMe: false,
};

const signinSlice = createSlice({
  name: "signinForm",
  initialState,
  reducers: {
    updatedSignInForm: (state, action) => {
      const { field, value } = action.payload;
      (state as any)[field] = value;
      console.log("currentState: ", state); // for testing
    },
  },
});

export const { updatedSignInForm } = signinSlice.actions;
export default signinSlice.reducer;
