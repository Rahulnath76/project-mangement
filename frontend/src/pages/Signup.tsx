import { useState } from "react";
import Button from "../components/common/Button";
import { signup } from "../lib/services/operations/auth.api";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";

const Signup = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const dispatch: AppDispatch = useDispatch();

  const { name, email, password } = data;

  const handleOnChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signup(data));
    console.log(data);
  };
  return (
    <form className="" onSubmit={handleSubmit}>
      <div>
        <label>Full name: </label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleOnChange}
          className="border"
          required
        />
      </div>

      <div>
        <label>Email: </label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleOnChange}
          className="border"
          required
        />
      </div>

      <div>
        <label>Password: </label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleOnChange}
          className="border"
          required
        />
      </div>

      <Button text="Signin" bg="bg-tertiary" textColor="text-[#fff]" />
    </form>
  );
};

export default Signup;
