import { configureStore } from "@reduxjs/toolkit";
import signinReducer from "../features/authSlice/signinSlice";
import signupReducer from "../features/authSlice/signupSlice";
import employeeReducer from "../features/employeeSlice/employeeSlice";
import attendanceReducer from "../features/requestSlice/attendanceRequestSlice";
import leaveReducer from "../features/requestSlice/leaveRequestSlice";
import userReducer from "../features/userSlice";

const store = configureStore({
  reducer: {
    userData: userReducer,
    employeeForm: employeeReducer,
    signInForm: signinReducer,
    signUpForm: signupReducer,
    attendanceForm: attendanceReducer,
    leaveForm: leaveReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
