import { apiConnector } from "../apiConnector";
import { auth } from "../api";
import {
  setAuthError,
  setLoading,
  setSuccess,
  setLoggedin,
} from "../../../store/slices/authSlice";
import { Dispatch } from "@reduxjs/toolkit";
import { AppDispatch } from "../../../store/store";
import { setUserData } from "../../../store/slices/profileSlice";
import { AuthResponse } from "../../types";
import { NavigateFunction } from "react-router-dom";
import toast from "react-hot-toast";

const { SIGNUP_API, LOGIN_API, LOGOUT_API } = auth;

interface IUser {
  name?: string;
  email: string;
  password: string;
  confirmpassword?: string;
}

export const signup = (
  { name, email, password, confirmpassword }: IUser,
  navigate: NavigateFunction
) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector<AuthResponse>("POST", SIGNUP_API, {
        name,
        email,
        password,
        confirmpassword,
      });
      console.log(response);
      if (!response.data.success) throw new Error("Signup failed");
      dispatch(setSuccess(true));
      toast.success("Signup successful!");
      navigate("/signin");
    } catch (error) {
      console.log(error);
      dispatch(setSuccess(false));
      toast.error(
        error.response?.data?.message || "Signup failed. Please try again."
      );
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const login = (
  { email, password }: IUser,
  navigate: NavigateFunction
) => {
  return async (dispatch: Dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector<AuthResponse>("POST", LOGIN_API, {
        email,
        password,
      });
      console.log(response);
      if (!response.data.success) throw new Error(response.data.message);

      dispatch(setLoggedin(true));
      dispatch(setSuccess(true));
      dispatch(setUserData({ user: { ...response.data.user } }));

      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("isLoggedin", "true");
      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      console.log("LOGIN API ERROR............", error);
      toast.error(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
    dispatch(setLoading(false));
  };
};

export const logout = (navigate: NavigateFunction) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await apiConnector<AuthResponse>("POST", LOGOUT_API);
      console.log(response);
      if (!response.data.success) throw new Error(response.data.message);

      dispatch(setLoggedin(false));

      localStorage.removeItem("user");
      localStorage.removeItem("isLoggedin");
      dispatch(setUserData({ user: null }));
      toast.success("Logout successful!");
      navigate("/signin");
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "Logout failed. Please try again."
      );
    }
  };
};
