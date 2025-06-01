import { useState } from "react";
import AuthForm from "../components/auth/AuthForm.";
import { loginData } from "../data/data";
import { login } from "../lib/services/operations/auth.api";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { success } = useSelector((state: RootState) => state.auth);

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
  };

  const handleOnChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-primary to-secondary px-4">
        <div className="w-full max-w-md p-10 py-12 bg-[#FDFAF6] rounded-2xl shadow-2xl sm:max-w-lg">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-extrabold text-gray-800">
              Welcome Back
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Sign in to your account to continue
            </p>
          </div>
        

          <AuthForm
            data={data}
            fields={loginData}
            handleSubmit={handleSubmit}
            handleOnChange={handleOnChange}
            formType={"Sign in"}
          />
        </div>

        <div className="flex flex-col items-center justify-center mt-4">
          <img src="" alt="" />
        </div>
      </div>
  );
};

export default Login;
