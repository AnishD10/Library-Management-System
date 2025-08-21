import { IEmployeeForm } from "@/src/interfaces";
import { createSlice } from "@reduxjs/toolkit";
const initialState: IEmployeeForm = {
  profilePhoto: null,
  joiningDate: 1738051730000,
  employeeId: "",
  fullName: "",
  mobileNumber: "",
  designation: "",
  workingDays: [],
  basicPay: "",
  perDay: false,
  gender: "",
  department: "",
};

const employeeSlice = createSlice({
  name: "employeeForm",
  initialState,
  reducers: {
    updatedForm: (state, action) => {
      console.log("action: ", action);
      console.log("UpdatedState", state);
      const { field, value } = action.payload;
      //   if (Object.prototype.hasOwnProperty.call(state, field)) {

      //! when I implement this logic, it already is too late, the non-serializable message will have popped already.
      // if (field === "joiningDate") {
      //   (state as any)[field] = Date.parse(value);
      // } else {
      (state as any)[field] = value;
      // }
      //   }
    },
  },
});

export const { updatedForm } = employeeSlice.actions;
export default employeeSlice.reducer;
