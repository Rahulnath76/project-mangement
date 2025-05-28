import { apiConnector } from "../apiConnector";
import { auth } from "../api";
import {
  setAuthError,
  setLoading,
  setSuccess,
  setLoggedin,
} from "../../../store/slices/authSlice";
import { Dispatch } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { AppDispatch } from "../../../store/store";
import { setUserData } from "../../../store/slices/profileSlice";

const { SIGNUP_API, LOGIN_API, LOGOUT_API } = auth;

interface IUser {
  name?: string;
  email: string;
  password: string;
  confirmpassword?: string;
}

export const signup = (
  { name, email, password, confirmpassword }: IUser,
  navigate
) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        name,
        email,
        password,
        confirmpassword,
      });
      console.log(response);
      if (!response.data.success) throw new Error("Signup failed");
      dispatch(setSuccess(true));
      navigate("/signin");
    } catch (error) {
      console.log(error);
      dispatch(
        setAuthError(error.response.data.message || "Something went wrong")
      );
      dispatch(setSuccess(false));
      console.log(error.response);
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const login = ({ email, password }: IUser, navigate) => {
  return async (dispatch: Dispatch) => {
    dispatch(setLoading(true));
    try {
      const response: AxiosResponse<unknown, any> = await apiConnector(
        "POST",
        LOGIN_API,
        {
          email,
          password,
        }
      );
      console.log(response);
      if (!response.data.success) throw new Error(response.data.message);

      dispatch(setLoggedin(true));
      dispatch(setSuccess(true));
      dispatch(setUserData({ user: { ...response.data.user } }));

      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("isLoggedin", "true");
      navigate("/");
    } catch (error) {
      console.log("LOGIN API ERROR............", error);
      dispatch(setAuthError(error.response.data.message));
    }
    dispatch(setLoading(false));
  };
};

export const logout = () => {
  return async (dispatch: Dispatch) => {
    try {
      const response: AxiosResponse<unknown, any> = await apiConnector(
        "POST",
        LOGOUT_API
      );
      console.log(response);
      if (!response.data.success) throw new Error(response.data.message);

      dispatch(setLoggedin(false));

      localStorage.removeItem("user");
      localStorage.removeItem("isLoggedin");
    } catch (error) {
      console.log(error);
    }
  };
};
