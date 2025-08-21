import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  date: 1672531200000,
  date2: 1672531200000,
  reason: "",
  duration: "",
  type: "",
};

const LeaveRequestSlice = createSlice({
  name: "leaveRequestForm",
  initialState,
  reducers: {
    updatedLeaveForm: (state, action) => {
      const { field, value } = action.payload;
      (state as any)[field] = value;
    },
  },
});

export const { updatedLeaveForm } = LeaveRequestSlice.actions;
export default LeaveRequestSlice.reducer;
