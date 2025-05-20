import { useState } from "react";
import AuthForm from "../components/auth/AuthForm.";
import { loginData } from "../data/data";
import { login } from "../lib/services/operations/auth.api";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/store";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { success, error } = useSelector((state) => state.project);
  const [errorMsg, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(data);
    dispatch(login(data, navigate));
    if (success) {
      setData({
        email: "",
        password: "",
      });
    }
    else{
      setError(error);
    }
  };

  const handleOnChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full">
      <div className="w-full max-w-md p-4 bg-white rounded shadow-md">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold">Sign in to access your account</h2>
          <p className="text-sm text-gray-600">
            Please fill in the details below.
          </p>
        </div>

        <AuthForm
          data={data}
          fields={loginData}
          handleSubmit={handleSubmit}
          handleOnChange={handleOnChange}
          formType={"Sign in"}
          passwordError={errorMsg}
        />
      </div>

      <div className="flex flex-col items-center justify-center mt-4">
        <img src="" alt="" />
      </div>
    </div>
  );
};

export default Login;
