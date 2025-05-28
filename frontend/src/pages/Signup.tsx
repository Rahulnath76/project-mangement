import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupData } from "../data/data";
import { signup } from "../lib/services/operations/auth.api";
import { AppDispatch, RootState } from "../store/store";
import AuthForm from "../components/auth/AuthForm.";
import { useNavigate } from "react-router-dom";
import { setAuthError } from "../store/slices/authSlice";

const Signup = () => {
  const navigate = useNavigate();
  const { success, error } = useSelector((state: RootState) => state.auth);

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const dispatch: AppDispatch = useDispatch();
  const handleOnChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (data.password !== data.confirmpassword) {
      dispatch(setAuthError("Passwords do not match"));
      return;
    }
    console.log(data);
    dispatch(signup(data, navigate));

    if (!success) {
      setData({
        name: "",
        email: "",
        password: "",
        confirmpassword: "",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-primary to-secondary px-4">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl sm:max-w-lg">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-primary">Create an Account</h2>
          <p className="text-sm text-gray-500 mt-1">
            Join us by filling the information below
          </p>
        </div>
        <AuthForm
          handleSubmit={handleSubmit}
          data={data}
          fields={signupData}
          handleOnChange={handleOnChange}
          formType={"Sign up"}
          error={error}
        />
      </div>
    </div>
  );
};

export default Signup;
