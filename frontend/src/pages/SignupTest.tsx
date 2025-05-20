import React, { useState } from "react";
import { Eye, EyeOff, Apple, BotMessageSquare, Chrome } from "lucide-react";
import Button from "../components/common/Button";

export default function SignupTest() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { name, email, password, confirmPassword } = data;

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPasswordError("");
    if (password !== confirmPassword) {
      setPasswordError("Passwords don't match!");
      return;
    }
    console.log("Form Submitted:", { name, email, password });
  };

  const handleOnChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-lg flex flex-col md:flex-row w-full max-w-5xl overflow-hidden">
        <div className="w-full md:w-1/2 p-8 md:p-12 space-y-6">
          <div className="flex items-center space-x-2 mb-8">
            <BotMessageSquare size={32} className="text-indigo-600" />
            <span className="text-2xl font-bold text-gray-800">Sellora</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            Create an Account
          </h1>
          <p className="text-gray-600">
            Join now to streamline your experience from day one.
          </p>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={handleOnChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleOnChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                onChange={handleOnChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 top-6 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <div className="relative">
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirm Password
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirm-password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleOnChange}
                required
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent pr-10 ${
                  passwordError
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-indigo-500"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 top-6 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                aria-label={
                  showConfirmPassword
                    ? "Hide confirm password"
                    : "Show confirm password"
                }
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {passwordError && (
                <p className="text-red-600 text-xs mt-1">{passwordError}</p>
              )}
            </div>
            <Button
              text="Submit"
              bg="bg-secondary"
              bgShadow="bg-primary"
              textColor="text-white"
            />
          </form>
          <div className="relative my-6">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-2 text-sm text-gray-500">
                Or Register With
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              className="w-full inline-flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Chrome size={20} className="mr-2 text-red-500" />
              Google
            </button>
            <button
              type="button"
              className="w-full inline-flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Apple size={20} className="mr-2 text-black" />
              Apple
            </button>
          </div>
          <p className="text-center text-sm text-gray-600 mt-6">
            Already Have An Account?{" "}
            <a
              href="#"
              className="font-medium text-secondary hover:text-primary transition-all duration-200"
            >
              Sign In.
            </a>
          </p>
        </div>
        <div className="hidden md:flex w-full md:w-1/2 bg-secondary text-white p-12 flex-col justify-center items-center space-y-6 rounded-r-lg">
          <h2 className="text-3xl font-bold text-center">
            Effortlessly manage your team and operations.
          </h2>
          <p className="text-indigo-100 text-center">
            Log in to access your CRM dashboard and manage your team.
          </p>
          <div className="mt-6 w-full max-w-md aspect-video bg-primary/50 rounded-lg flex items-center justify-center border border-primary shadow-lg">
            <span className="text-secondary text-sm">
              Dashboard Preview Image
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
