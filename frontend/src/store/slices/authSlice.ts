import { createSlice } from "@reduxjs/toolkit";

export interface Auth {
  isAuthenticated: boolean;
  user: null | string;
  token: null | string;
  loading: boolean;
}

const initialState: Auth = {
  isAuthenticated: false,
  user: null,
  token: null,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.loading = false;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.loading = false;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});


export const { login, logout, setLoading, setToken } = authSlice.actions;
export default authSlice.reducer;
