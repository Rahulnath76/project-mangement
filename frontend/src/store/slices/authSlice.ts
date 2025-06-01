import { createSlice } from "@reduxjs/toolkit";

export interface Auth {
  isLoggedIn: boolean;
  loading: boolean;
  success: boolean;
}

const initialState: Auth = {
  isLoggedIn: localStorage.getItem("isLoggedin") === "true" || false,
  loading: false,
  success: false
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoggedin: (state, action) => {
      console.log("setLoggedin reducer called with:", action.payload);
      state.isLoggedIn = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setSuccess: (state, action) => {
      state.success = action.payload;
    }
  },
});


export const { setLoggedin, setLoading, setSuccess } = authSlice.actions;
export default authSlice.reducer;
