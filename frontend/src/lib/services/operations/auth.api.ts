import { apiConnector } from "../apiConnector";
import { auth } from "../api";
import { setLoading, setToken } from "../../../store/slices/authSlice";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { setUser } from "../../../store/slices/profileSlice";
import { AppDispatch } from "../../../store/store";

const { SIGNUP_API, LOGIN_API, LOGOUT_API } = auth;

interface IUser {
  name?: string;
  email: string;
  password: string;
}

export const signup = ({ name, email, password }: IUser) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        name,
        email,
        password,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const login = ({ email, password }: IUser) => {
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

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      dispatch(setToken(response.data.token));
      dispatch(setUser({ ...response.data.user }));
      localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem("user", JSON.stringify(response.data.user));
    } catch (error) {
      console.log("LOGIN API ERROR............", error);
    }
    dispatch(setLoading(false));
  };
};
