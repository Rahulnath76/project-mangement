import { createSlice } from "@reduxjs/toolkit";

export interface Auth {
  isLoggedIn: boolean;
  loading: boolean;
  error: string;
}

const initialState: Auth = {
  isLoggedIn: localStorage.getItem("isLoggedin") === "true" || false,
  loading: false,
  error: ""
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoggedin: (state, action) => {
      console.log("setLoggedin reducer called with:", action.payload);
      state.isLoggedIn = action.payload;
    },
    setAuthError: (state, action) => {
      state.error = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});


export const { setLoggedin, setLoading, setAuthError } = authSlice.actions;
export default authSlice.reducer;
