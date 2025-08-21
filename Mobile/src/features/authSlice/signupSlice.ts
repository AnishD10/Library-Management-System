import { ISignUpForm } from "@/src/interfaces";
import { createSlice } from "@reduxjs/toolkit";

const initialState: ISignUpForm = {
  username: "",
  mobileNo: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const signupSlice = createSlice({
  name: "signupForm",
  initialState,
  reducers: {
    updatedSignUpForm: (state, action) => {
      const { field, value } = action.payload;
      (state as any)[field] = value;
      console.log("currentState: ", state); // for testing
    },
  },
});

export const { updatedSignUpForm } = signupSlice.actions;
export default signupSlice.reducer;
