import { getEmployeeId } from "@/src/helpers/storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchEmployeeId = createAsyncThunk(
  "attendanceForm/fetchEmployeeId",
  async () => {
    const id = await getEmployeeId();
    return id;
  }
);

const initialState = {
  date: 1672531200000,
  inTime: 1672531200000,
  outTime: 1672531200000,
  reason: "",
  employeeId: null as string | null | number,
  status: "idle" as "idle" | "loading" | "fulfilled" | "failed",
};

const AttendanceRequestSlice = createSlice({
  name: "attendanceForm",
  initialState,
  reducers: {
    updatedAttendanceForm: (state, action) => {
      // console.log("action: ", action);
      // console.log("state: ", state);

      const { field, value } = action.payload;
      (state as any)[field] = value;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployeeId.fulfilled, (state, action) => {
        state.employeeId = action.payload;
        state.status = "fulfilled";
      })
      .addCase(fetchEmployeeId.pending, (state) => {
        // () => () returns a value
        state.status = "loading";
      })
      .addCase(fetchEmployeeId.rejected, (state) => {
        // () => {} does not return it, you can do anything with it
        state.status = "failed";
      });
  },
});

export const { updatedAttendanceForm } = AttendanceRequestSlice.actions;
export default AttendanceRequestSlice.reducer;
