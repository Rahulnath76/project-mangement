import { useState } from "react";
import { useDispatch } from "react-redux";
import { signupData } from "../data/data";
import { signup } from "../lib/services/operations/auth.api";
import { AppDispatch } from "../store/store";
import AuthForm from "../components/auth/AuthForm.";

const Signup = () => {
  const [passwordError, setPasswordError] = useState("");

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
      setPasswordError("Passwords do not match");
      return;
    }
    console.log(data);
    dispatch(signup(data));
    

    setData({
      name: "",
      email: "",
      password: "",
      confirmpassword: "",
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full">
      <div className="w-full max-w-md p-4 bg-white rounded shadow-md">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold">Create an Account</h2>
          <p className="text-sm text-gray-600">
            Please fill in the details below to create an account.
          </p>
        </div>

        <AuthForm
          handleSubmit={handleSubmit}
          data={data}
          fields={signupData}
          handleOnChange={handleOnChange}
          formType={"Sign up"}
          passwordError={passwordError}
        />
      </div>

      <div className="flex flex-col items-center justify-center mt-4">
        <img src="" alt="" />
      </div>
    </div>
  );
};

export default Signup;
