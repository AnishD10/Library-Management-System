import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setUserData } from "../helpers/storage";
import { ISignInForm, ISignUpForm, IUserData } from "../interfaces";
import { signInService, signUpService } from "../services/authService";

const initialState: IUserData = {
  currentUser: {
    profilePicture: "https://randomuser.me/api/portraits/women/1.jpg",
    employeeId: "Emp100",
    name: "Sora",
    role: "",
    token: "",
  },
  status: "Idle" as "Idle" | "Pending" | "Success" | "Failed",
};

export const signInUserThunk = createAsyncThunk(
  "userSlice/signInUserThunk",
  async (userData: ISignInForm, { rejectWithValue }) => {
    try {
      const response = await signInService(userData);

      await setUserData(JSON.stringify(response));

      // console.log("response in slice: ", response);
      return response;
    } catch (error: any) {
      // Handle Axios-specific errors
      if (error.isAxiosError) {
        console.log("sign in user slice axios error called with: ", userData);

        return rejectWithValue({
          error,
        });
      }

      console.log("sign in user slice other error called with: ", userData);

      // Handle other errors
      return rejectWithValue({
        message: error.message || "Unknown error",
      });
    }
  }
);

export const signUpUserThunk = createAsyncThunk(
  "userSlice/signUpUserThunk",
  async (userData: ISignUpForm) => {
    try {
      const response = await signUpService(userData);
      return response;
    } catch (err) {
      throw err;
    }
  }
);

const UserSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    updatedData: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetData: (state) => {
      return { ...state, ...initialState };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInUserThunk.pending, (state) => {
        state.status = "Pending";
      })
      .addCase(signInUserThunk.rejected, (state, action) => {
        state.status = "Failed";
        console.error("Sign in error extra reducer:", action.payload);
        // Now action.payload is serializable
      })
      .addCase(signInUserThunk.fulfilled, (state, action) => {
        state.currentUser = { ...state.currentUser, ...action.payload };
        state.status = "Success";
        console.log("Payload after logging in: ", action.payload);

        console.log("User State after logging in: ", state);
      });
  },
});

export const { updatedData, resetData } = UserSlice.actions;
export default UserSlice.reducer;
